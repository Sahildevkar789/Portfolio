import Skill from '../models/Skill.js';

// @desc    Fetch all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({});
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private/Admin
export const createSkill = async (req, res) => {
    try {
        const { category, name, level, icon } = req.body;
        const skill = new Skill({
            category: category || 'Concepts',
            name,
            level,
            icon,
        });
        const createdSkill = await skill.save();
        res.status(201).json(createdSkill);
    } catch (error) {
        res.status(400).json({ message: 'Invalid skill data', error: error.message });
    }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
export const updateSkill = async (req, res) => {
    try {
        const { category, name, level, icon } = req.body;
        const skill = await Skill.findById(req.params.id);

        if (skill) {
            skill.category = category || skill.category;
            skill.name = name || skill.name;
            skill.level = level !== undefined ? level : skill.level;
            skill.icon = icon || skill.icon;

            const updatedSkill = await skill.save();
            res.json(updatedSkill);
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (skill) {
            await Skill.deleteOne({ _id: skill._id });
            res.json({ message: 'Skill removed' });
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
