import Hero from '../models/Hero.js';

// @desc    Get hero data
// @route   GET /api/hero
// @access  Public
export const getHero = async (req, res) => {
    try {
        const hero = await Hero.findOne();
        if (hero) {
            res.json(hero);
        } else {
            // Return empty object or defaults if not found
            res.json({});
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update hero data
// @route   PUT /api/hero
// @access  Private/Admin
export const updateHero = async (req, res) => {
    try {
        let hero = await Hero.findOne();

        if (hero) {
            hero.name = req.body.name || hero.name;
            hero.tagline = req.body.tagline || hero.tagline;
            hero.intro = req.body.intro || hero.intro;
            hero.profileImage = req.body.profileImage || hero.profileImage;
            hero.resumeLink = req.body.resumeLink || hero.resumeLink;
            hero.backgroundImage = req.body.backgroundImage || hero.backgroundImage;

            const updatedHero = await hero.save();
            res.json(updatedHero);
        } else {
            // Create if it doesn't exist
            hero = new Hero({
                name: req.body.name,
                tagline: req.body.tagline,
                intro: req.body.intro,
                profileImage: req.body.profileImage,
                resumeLink: req.body.resumeLink,
                backgroundImage: req.body.backgroundImage
            });

            const createdHero = await hero.save();
            res.status(201).json(createdHero);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
