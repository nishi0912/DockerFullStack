import React from "react";
import { Row, Col, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { RiCloseFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Documents = (props) => {
  const {
    bookId,
    setCurrentBook,
    createDocsHandler,
    bookPrice,
    totalDocPrice,
  } = props;

  const { control, handleSubmit, reset, watch } = useForm();
  const navigate = useNavigate();

  const watching = watch();
  const watchPrice = watching.price > bookPrice - totalDocPrice ? true : false;

  const handleDocument = (data) => {
    data.book_id = bookId;
    const options = {
      method: "post",
      url: "/api/v1/documentaries",
      data: JSON.stringify(data),
      headers: {
        // 'Authorization': `bearer ${token}`,
        "Content-Type": "application/json",
      },
      json: true,
    };
    axios(options)
      .then((res) => {
        reset();
        axios
          .get(`/api/v1/books/${res.data.book.slug}`)
          .then((res) => {
            setCurrentBook(res.data);
            createDocsHandler();
          })
          .catch((res) => console.log(res));
      })
      .catch((res) => console.log({ res }));
  };

  return (
    <form onSubmit={handleSubmit(handleDocument)}>
      <Row gutter={[0, 10]}>
        <Col span={24} onClick={() => navigate("/")}>
          <Row justify="end">
            <RiCloseFill
              color="#FFFFFF"
              onClick={createDocsHandler}
              size={25}
            />
          </Row>
        </Col>
        <Col span={24}>
          <Controller
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="document-inputs"
                placeholder="Documentary Name"
              />
            )}
            name="documentary_name"
          />
        </Col>
        <Col span={24}>
          <Controller
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="document-inputs document-textarea"
                placeholder="Add Documentary Content from Your Book"
              />
            )}
            name="documentary_content"
          />
        </Col>
        <Col span={24}>
          <Controller
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="document-inputs"
                placeholder="Price"
              />
            )}
            name="price"
          />
        </Col>

        {watching.price > bookPrice - totalDocPrice && (
          <Col span={24}>
            <Typography className="document-error">
              You can't add price more that books cost.
            </Typography>
          </Col>
        )}
        <button
          type="submit"
          disabled={watching.price <= bookPrice - totalDocPrice ? false : true}
          className={`document-create-btn ${
            watching.documentary_name &&
            watching.documentary_content &&
            !watchPrice &&
            watching.price <= bookPrice - totalDocPrice
              ? "document-create-btn-submit"
              : watching.documentary_name &&
                watching.documentary_content &&
                "document-create-watch"
          }`}
        >
          Create
        </button>
      </Row>
    </form>
  );
};

export default Documents;
