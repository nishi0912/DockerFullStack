import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    editor: [],
    creator: String,
    name: { type: String, required: true },
    content: { type: String, required: true },
    length: Number
}, {
    timestamps: true
});

mongoose.models = {};
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
