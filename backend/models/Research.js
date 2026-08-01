import mongoose from 'mongoose';

const researchSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: 'An Uncertainty-Aware Cascaded Framework for Real-Time QR-Embedded URL Phishing Detection Under Deployment Constraints'
        },
        author: {
            type: String,
            required: true,
            default: 'Sahil Santosh Devkar, Sanchit Devanand Gharat.'
        },
        abstract: {
            type: String,
            required: true,
            default: 'This paper presents an uncertainty-aware cascaded framework for real-time detection of phishing URLs embedded in QR codes. The system combines a calibrated XGBoost classifier, a self-curating blacklist, and weighted forensic scoring to improve phishing detection while maintaining low latency. It introduces a deployment-aware analysis of the soft-fail recall tradeoff and proposes the SUSPICIOUS_UNVERIFIED state as a future mitigation strategy.'
        },
        keywords: {
            type: [String],
            default: [
                'QR Code Security', 
                'QR Phishing', 
                'Quishing', 
                'URL Phishing Detection', 
                'Cybersecurity', 
                'XGBoost', 
                'Machine Learning', 
                'Uncertainty Quantification', 
                'Isotonic Regression', 
                'Threat Intelligence', 
                'Flask', 
                'AI Security'
            ]
        },
        paperLink: {
            type: String,
            default: 'https://drive.google.com/file/d/1W6-yuXFElxJT2tffWROM9Ed-FZeVxJsk/view'
        },
        pdfLink: {
            type: String,
            default: 'https://drive.google.com/file/d/1W6-yuXFElxJT2tffWROM9Ed-FZeVxJsk/view'
        },
        githubLink: {
            type: String,
            default: 'https://drive.google.com/file/d/1W6-yuXFElxJT2tffWROM9Ed-FZeVxJsk/view'
        },
        citation: {
            type: String,
            default: 'Devkar, S. S., Gharat, S. D., Gulve, M. S., Job, J., Bhatkar, M. U., & Praveena S. M. An Uncertainty-Aware Cascaded Framework for Real-Time QR-Embedded URL Phishing Detection Under Deployment Constraints'
        },
        year: {
            type: String,
            default: '2026'
        },
        domain: {
            type: String,
            default: 'Cybersecurity, Artificial Intelligence, Machine Learning, QR Code Security'
        },
        impact: {
            views: { type: String, default: '1256' },
            downloads: { type: String, default: '21' },
            citations: { type: String, default: '12' }
        }
    },
    {
        timestamps: true,
    }
);

const Research = mongoose.model('Research', researchSchema);

export default Research;
