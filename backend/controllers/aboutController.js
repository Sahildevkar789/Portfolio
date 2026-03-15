import About from '../models/About.js';

// @desc    Get about data
// @route   GET /api/about
// @access  Public
export const getAbout = async (req, res) => {
    try {
        const about = await About.findOne();
        if (about) {
            res.json(about);
        } else {
            res.json({});
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update about data
// @route   PUT /api/about
// @access  Private/Admin
export const updateAbout = async (req, res) => {
    try {
        let about = await About.findOne();

        if (about) {
            about.bio = req.body.bio !== undefined ? req.body.bio : about.bio;
            about.education = req.body.education !== undefined ? req.body.education : about.education;
            about.goals = req.body.goals !== undefined ? req.body.goals : about.goals;
            about.interests = req.body.interests !== undefined ? req.body.interests : about.interests;

            const updatedAbout = await about.save();
            res.json(updatedAbout);
        } else {
            about = new About({
                bio: req.body.bio,
                education: req.body.education,
                goals: req.body.goals,
                interests: req.body.interests
            });

            const createdAbout = await about.save();
            res.status(201).json(createdAbout);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
