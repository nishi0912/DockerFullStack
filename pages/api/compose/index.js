import Blog from "../../../models/blogModel";
import dbConnect from "../../../Utils/mongoDB";
// import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req, res) => {
  const createBlog = () => {
    const BlogResponse = req.body.data;
    if (BlogResponse) {
      try {
        const newBlog = new Blog({
          creator: BlogResponse.creator,
          name: BlogResponse.title,
          content: BlogResponse.content,
          length: BlogResponse.length,
        });
        Blog.find({}, async (err, foundBlogs) => {
          await newBlog.save((error) => {
            if (!error) {
              res.status(200).json(foundBlogs);
            } else {
              console.log("Hurray");
              console.log({ error });
            }
          });
        });
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const getBlogs = () => {
    Blog.find({}, (err, foundBlogs) => {
      res.status(200).json(foundBlogs);
    });
  };

  switch (req.method) {
    case "POST":
      return createBlog();
    default:
      return getBlogs();
  }
};

export default dbConnect(handler);
