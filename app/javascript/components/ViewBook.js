import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { RiArrowLeftSLine } from "react-icons/ri";
import { Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Documents from "./Documents";
import { Controller, useForm } from "react-hook-form";

const ViewBook = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: currentBook,
  });

  const [currentBook, setCurrentBook] = useState([]);
  const [createDocs, setCreateDocs] = useState(false);
  const [bookTextArea, setBookTextArea] = useState(false);

  const createDocsHandler = () => {
    setCreateDocs(!createDocs);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`/api/v1/books/${params.slug}`)
      .then((res) => setCurrentBook(res.data))
      .catch((res) => console.log(res));
  };

  const deleteBookHandler = () => {
    axios
      .delete(`/api/v1/books/${currentBook?.slug}`)
      .then((res) => {
        getData();
        navigate("/");
      })
      .catch((res) => console.log({ res }));
  };

  const editBookHandler = (value) => {
    axios
      .patch(`/api/v1/books/${currentBook?.slug}`, value)
      .then((res) => {
        TextAreaHandler();
        getData();
      })
      .catch((res) => console.log({ res }));
  };

  const TextAreaHandler = () => {
    setBookTextArea(!bookTextArea);
  };

  const deleteDocsHandler = (slug) => {
    axios
      .delete(`/api/v1/documentaries/${slug}`)
      .then((res) => getData())
      .catch((res) => console.log({ res }));
  };

  const editDocsHandler = (slug) => {
    axios
      .patch(`/api/v1/documentaries/${slug}`)
      .then((res) => console.log({ res }))
      .catch((res) => console.log({ res }));
  };

  const DocsCost = _.sumBy(currentBook?.documentaries, (docs) => {
    return Math.trunc(docs.price);
  });

  const BookCost = Math.trunc(currentBook?.price);
  const DisplayBookPrice = BookCost.toFixed(2);

  return (
    <div className="view-book-screen relative">
      <RiArrowLeftSLine
        className="view-navigate-icon pointer"
        size={25}
        color="#FFFFFF"
        onClick={() => navigate("/")}
      />
      <Row justify="center" className="view-book-container">
        <Col span={24}>
          <Row>
            <Col span={24}>
              <Typography className="header-book-name">
                {currentBook?.name}
              </Typography>
            </Col>
            <Col span={24}>
              {bookTextArea ? (
                <form onSubmit={handleSubmit(editBookHandler)}>
                  <Row>
                    <Col span={24}>
                      <Controller
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            defaultValue={currentBook?.content}
                            className="view-book-edit-textarea"
                            placeholder="Edit Your book here"
                          />
                        )}
                        name="content"
                      />
                    </Col>
                    <Col span={24}>
                      <Controller
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            defaultValue={currentBook?.price}
                            className="view-book-edit-textarea"
                            placeholder="Price"
                          />
                        )}
                        name="price"
                      />
                    </Col>
                    <Col span={24}>
                      <button
                        type="submit"
                        className="button-default view-edit-book pointer"
                      >
                        Save
                      </button>
                    </Col>
                  </Row>
                </form>
              ) : (
                <Typography className="header-book-content">
                  {currentBook?.content}
                </Typography>
              )}
            </Col>
            <Col span={24}>
              <Typography className="header-book-author">
                ~{currentBook?.author}
              </Typography>
            </Col>
            <Col span={24}>
              <Typography className="header-book-price">
                Price: $ {DisplayBookPrice}
              </Typography>
            </Col>
            <Col span={24}>{currentBook?.sales}</Col>
            <Col span={24}>
              <Row gutter={[30, 10]}>
                <Col span={24} />
                <Col>
                  <button
                    className="button-default pointer"
                    onClick={deleteBookHandler}
                  >
                    <MdDelete color="red" />
                  </button>
                </Col>
                <Col>
                  <button
                    className="button-default pointer"
                    onClick={TextAreaHandler}
                  >
                    <MdEdit color="green" />
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[0, 20]}>
            <Col span={24} />
            <Col span={24}>
              <button
                className={`view-edit-book ${
                  DocsCost >= BookCost ? "disable" : "pointer"
                }`}
                disabled={DocsCost >= BookCost ? true : false}
                onClick={createDocsHandler}
              >
                Create a Document
              </button>
            </Col>
          </Row>
        </Col>
        {createDocs && (
          <Col span={24}>
            <Documents
              createDocsHandler={createDocsHandler}
              setCurrentBook={setCurrentBook}
              bookId={currentBook?.id}
              bookPrice={BookCost}
              totalDocPrice={DocsCost}
            />
          </Col>
        )}
        <Col span={24} className="documentary-container">
          <Row>
            <Col span={24}>
              <Typography className="header-texts documentary-title">
                Documentaries of {currentBook?.name}
              </Typography>
            </Col>
            <Col span={24}>
              <Row justify="center" gutter={[50, 0]}>
                {currentBook?.documentaries?.length > 0 ? (
                  currentBook?.documentaries?.map((document, index) => {
                    return (
                      <Col span={6} key={index} className="view-document-card">
                        <Row gutter={[0, 10]}>
                          <Col span={24}>
                            <Typography className="view-book-docs-name">
                              {document?.documentary_name}
                            </Typography>
                          </Col>
                          <Col span={24}>
                            <Typography className="view-book-docs-price">
                              ${document?.price}
                            </Typography>
                          </Col>
                          <Col span={24}>{document?.views}</Col>
                          <Col span={24}>
                            <Row gutter={[20, 0]} justify="end">
                              <Col>
                                <button
                                  className="button-default pointer"
                                  onClick={() =>
                                    deleteDocsHandler(document.slug)
                                  }
                                >
                                  <MdDelete color="red" />
                                </button>
                              </Col>
                              <Col>
                                <button
                                  className="button-default pointer"
                                  onClick={() => editDocsHandler(document.slug)}
                                >
                                  <MdEdit color="green" />
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    );
                  })
                ) : (
                  <Col span={24}>
                    <Typography className="view-book-no-docs">
                      No Documentaries Yet.
                    </Typography>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ViewBook;
