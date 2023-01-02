import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import { useBreakpoints } from "react-responsive-hooks";
import { HiEye, HiDocumentDuplicate } from "react-icons/hi";
import Header from "./Header";

const HelloWorld = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { isXS, isSM } = useBreakpoints();

  useEffect(() => {
    axios
      .get("/api/v1/books")
      .then((res) => setBooks(res.data))
      .catch((res) => console.log({ res }));
  }, []);

  const viewBookHandler = (value) => {
    axios
      .get(`/api/v1/books/${value}`)
      .then((res) => navigate(`/book/${res.data.slug}`))
      .catch((res) => console.log({ res }));
  };

  return (
    <div className="main-container">
      {!(isXS || isSM) && (
        <>
          <div className="bubbles bubble-1" />
          <div className="bubbles bubble-2" />
          <div className="bubbles bubble-3" />
        </>
      )}
      <Header />
      <Row gutter={[40, 40]} className="homepage-container">
        <Col span={24} />
        {books.map((book, index) => {
          return (
            <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} key={index}>
              <Row align="middle" gutter={[50, 0]}>
                <Col span={24}>
                  <Typography className="header-book-name">
                    {book.name}
                  </Typography>
                  <Typography className="header-book-content">
                    {book.content}
                  </Typography>
                  <Typography className="header-book-author">
                    ~{book.author}
                  </Typography>
                </Col>
                <Col span={24}>
                  <Row align="middle" justify="end" gutter={[20, 20]}>
                    <Col span={24} />
                    <Col>
                      <Row align="middle">
                        <HiDocumentDuplicate color="#FFFFFF" />{" "}
                        <Typography
                          className="header-book-count"
                          component="span"
                        >
                          {book?.documentaries.length > 0
                            ? book?.documentaries.length
                            : 0}
                        </Typography>
                      </Row>
                    </Col>
                    <Col>
                      <Row align="middle">
                        <HiEye color="#FFFFFF" />
                        <Typography
                          className="header-book-views"
                          component="span"
                        >
                          {book?.views ? book?.views : 0}
                        </Typography>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={[0, 20]}>
                    <Col span={24} />
                    <div
                      className={`header-book-completion ${
                        book.published && "header-book-published"
                      }`}
                      style={{
                        width: book?.published === "true" ? "80%" : "10%",
                      }}
                    />
                  </Row>
                </Col>
                <Col span={24}>
                  <Row justify="end" gutter={[0, 20]}>
                    <Col span={24} />
                    <button
                      className="button-default pointer header-navigate"
                      onClick={() => viewBookHandler(book.slug)}
                    >
                      <MdChevronRight size={30} color="green" />
                    </button>
                  </Row>
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default HelloWorld;
