import Blogs from "../../models/blogModel";

export default function handler(req, res) {
  const AllBlogs = Blogs.find();
  console.log({ AllBlogs });
  res.status(200).json({ data: AllBlogs });
}
