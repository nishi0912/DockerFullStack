import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Row, Col, Typography } from "antd";
// import axios from "axios";
import Space from "../Components/Reused/Space";
import _ from "lodash";
import moment from "moment";
import { getSession } from "next-auth/react";
import { useAmp } from "next/amp";

const Home = ({ data }) => {
  const { imageData, blogData } = data;
  const amp = useAmp();

  return (
    <div className="home-screen">
      <Row gutter={[20, 0]} justify="center">
        <Space spacing={10} />
        {blogData.length > 0 ? (
          blogData.map((blog, index) => {
            return (
              <Col
                xs={24}
                sm={12}
                md={10}
                lg={10}
                xl={10}
                xxl={8}
                className="blog-card neumorphism"
                key={index}
              >
                {amp ? (
                  <amp-img
                    width={100}
                    height={200}
                    src={imageData[index].urls.full}
                  />
                ) : (
                  <Image
                    width={300}
                    height={200}
                    layout="responsive"
                    // placeholder="blur"
                    blurDataURL={imageData[index].urls.full}
                    src={imageData[index].urls.full}
                    objectFit="cover"
                    alt=""
                    quality="50"
                  />
                )}
                <div className="blog-card-content">
                  <Typography className="blog-name">{blog.name}</Typography>
                  <Typography className="blog-content">
                    {blog.content}
                  </Typography>
                  <Typography className="blog-creator">
                    {blog.creator}
                  </Typography>
                  <Typography className="blog-createdAt">
                    {moment(blog.createdAt).format("LL")}
                  </Typography>
                </div>
              </Col>
            );
          })
        ) : (
          <div>No Blogs Found.</div>
        )}
      </Row>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const res = await fetch("http://localhost:3050/v1/books", {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
    mode: "no-cors",
  });

  console.log({ res });

  const images = await fetch(
    `https://api.unsplash.com/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
  );

  const imageData = await images.json();
  const blogData = await res.json();

  return {
    props: {
      session,
      // data: {
      //   blogData,
      //   imageData,
      // },
    },
  };
};

// export const config = { amp: true };

export default Home;
