const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');



/* Start Realm Question Types */
const DNASchema = new mongoose.Schema({
    dna: { type: String, value: [], required: true, unique: true },
    mutation: { type: Boolean, required: true }
});

DNASchema.plugin(timestamps);

const DNADocument = mongoose.model('DNADocument', DNASchema);
module.exports.DNAModel = DNADocument;
