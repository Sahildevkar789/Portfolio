import mongoose from 'mongoose';

const researchSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: 'AI-Powered QR Code Scam Detector for Phishing and Malicious Link Detection'
        },
        author: {
            type: String,
            required: true,
            default: 'Sahil Santosh Devkar'
        },
        abstract: {
            type: String,
            required: true,
            default: 'This research focuses on detecting malicious QR codes...'
        },
        keywords: {
            type: [String],
            default: ['Cybersecurity', 'AI', 'QR Security', 'Phishing Detection', 'URL Analysis']
        },
        paperLink: {
            type: String,
            default: '#'
        },
        pdfLink: {
            type: String,
            default: '#'
        },
        githubLink: {
            type: String,
            default: 'https://github.com/Sahil-Devkar'
        },
        citation: {
            type: String,
            default: 'Devkar, S. S. "AI-Powered QR Code Scam Detector for Phishing and Malicious Link Detection".'
        },
        year: {
            type: String,
            default: '2026'
        },
        domain: {
            type: String,
            default: 'Cybersecurity & AI'
        },
        impact: {
            views: { type: String, default: '0' },
            downloads: { type: String, default: '0' },
            citations: { type: String, default: '0' }
        }
    },
    {
        timestamps: true,
    }
);

const Research = mongoose.model('Research', researchSchema);

export default Research;
