import Certification from '../models/Certification.js';

// @desc    Fetch all certifications
// @route   GET /api/certifications
// @access  Public
export const getCertifications = async (req, res) => {
    try {
        const certifications = await Certification.find({});
        res.json(certifications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a certification
// @route   POST /api/certifications
// @access  Private/Admin
export const createCertification = async (req, res) => {
    try {
        const { title, organization, date, certificateImage, certificateLink } = req.body;
        const certification = new Certification({
            title,
            organization,
            date,
            certificateImage,
            certificateLink
        });
        const createdCertification = await certification.save();
        res.status(201).json(createdCertification);
    } catch (error) {
        res.status(400).json({ message: 'Invalid certification data', error: error.message });
    }
};

// @desc    Update a certification
// @route   PUT /api/certifications/:id
// @access  Private/Admin
export const updateCertification = async (req, res) => {
    try {
        const { title, organization, date, certificateImage, certificateLink } = req.body;
        const certification = await Certification.findById(req.params.id);

        if (certification) {
            certification.title = title || certification.title;
            certification.organization = organization || certification.organization;
            certification.date = date || certification.date;
            certification.certificateImage = certificateImage || certification.certificateImage;
            certification.certificateLink = certificateLink || certification.certificateLink;

            const updatedCert = await certification.save();
            res.json(updatedCert);
        } else {
            res.status(404).json({ message: 'Certification not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const deleteCertification = async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);
        if (certification) {
            await Certification.deleteOne({ _id: certification._id });
            res.json({ message: 'Certification removed' });
        } else {
            res.status(404).json({ message: 'Certification not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
