import React, { useEffect, useState } from "react";
import { Row, Col, Avatar, Image } from "antd";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/images/Book.jpeg";

const Books = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm();

  const handleBook = (data) => {
    data.published = "true";
    const options = {
      method: "post",
      url: "/api/v1/books",
      data: JSON.stringify(data),
      headers: {
        // 'Authorization': `bearer ${token}`,
        "Content-Type": "application/json",
      },
      json: true,
    };
    axios(options)
      .then((res) => navigate("/"))
      .catch((res) => console.log({ res }));
  };

  return (
    <form onSubmit={handleSubmit(handleBook)}>
      <div className="book-container">
        <RiArrowLeftSLine
          className="view-navigate-icon pointer"
          color="#FFFFFF"
          size={25}
          onClick={() => navigate("/")}
        />
        <img className="book-background" src={BackgroundImage} alt="" />
        <Row className="book-screen flexbox">
          <Col span={24}>
            <Controller
              control={control}
              render={({ field }) => (
                <input
                  className="book-create-input"
                  {...field}
                  placeholder="Book Name"
                />
              )}
              name="name"
            />
          </Col>
          <Controller
            control={control}
            render={({ field }) => (
              <input
                className="book-create-input"
                {...field}
                placeholder="Content"
              />
            )}
            name="content"
          />

          <Controller
            control={control}
            render={({ field }) => (
              <input
                className="book-create-input"
                {...field}
                placeholder="Author"
              />
            )}
            name="author"
          />
          <Controller
            control={control}
            render={({ field }) => (
              <input
                className="book-create-input"
                {...field}
                placeholder="Price"
              />
            )}
            name="price"
          />
          <button className="book-publish-btn pointer" onClick={handleBook}>
            Save
          </button>
          <button className="book-publish-btn pointer" onClick={handleBook}>
            Publish
          </button>
        </Row>
      </div>
    </form>
  );
};

export default Books;
