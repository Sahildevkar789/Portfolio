import ContactInfo from '../models/ContactInfo.js';

// @desc    Get contact info
// @route   GET /api/contact-info
// @access  Public
export const getContactInfo = async (req, res) => {
    try {
        const contactInfo = await ContactInfo.findOne();
        if (contactInfo) {
            res.json(contactInfo);
        } else {
            res.json({});
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update contact info
// @route   PUT /api/contact-info
// @access  Private/Admin
export const updateContactInfo = async (req, res) => {
    try {
        let contactInfo = await ContactInfo.findOne();

        if (contactInfo) {
            contactInfo.email = req.body.email || contactInfo.email;
            contactInfo.linkedin = req.body.linkedin !== undefined ? req.body.linkedin : contactInfo.linkedin;
            contactInfo.github = req.body.github !== undefined ? req.body.github : contactInfo.github;
            contactInfo.phone = req.body.phone !== undefined ? req.body.phone : contactInfo.phone;
            contactInfo.location = req.body.location !== undefined ? req.body.location : contactInfo.location;

            const updatedContactInfo = await contactInfo.save();
            res.json(updatedContactInfo);
        } else {
            contactInfo = new ContactInfo({
                email: req.body.email,
                linkedin: req.body.linkedin,
                github: req.body.github,
                phone: req.body.phone,
                location: req.body.location
            });

            const createdContactInfo = await contactInfo.save();
            res.status(201).json(createdContactInfo);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
