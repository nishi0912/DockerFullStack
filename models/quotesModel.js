import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
    author: String,
    quotecontent: String,
}, { timestamps: true });

mongoose.models = {};
const Quotes = mongoose.model('Quotes', QuoteSchema);

export default Quotes;
