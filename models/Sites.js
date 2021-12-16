const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    access: [{
        date: { type: Date },
        deviceType: { type: String },
        navigator: { type: String },
        url: { type: String },
    }]
});

module.exports = new mongoose.model('Site', SiteSchema);
