/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { Row, Col, Typography, Button, Input } from "antd";
import Space from "../../Components/Reused/Space";
import { Controller, useForm } from "react-hook-form";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { getSession, signIn } from "next-auth/react";

const index = () => {
  const { control, handleSubmit, reset, watch } = useForm();
  const [QuoteData, setQuoteData] = useState([]);
  const watching = watch();

  let data = null;
  const fetchData = async () => {
    const res = await fetch("http://localhost:3005/api/quotes");
    data = await res.json();
    setQuoteData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [quotesLoading, setQuotesLoading] = useState(true);

  useEffect(() => {
    const authorizeCompose = async () => {
      const session = await getSession();

      if (session) {
        setQuotesLoading(false);
      } else {
        signIn();
      }
    };
    authorizeCompose();
  }, [quotesLoading]);

  const [currentQuote, setCurrentQuote] = useState(0);

  const AddQuotesHandler = async (data) => {
    const res = await fetch("/api/quotes", {
      method: "POST",
      body: JSON.stringify({
        data,
      }),
      headers: {
        "content-Type": "application/json",
      },
    });
    fetchData();
  };

  const LeftArrowHandler = (index) => {
    index > 0 && setCurrentQuote(index - 1);
  };

  const RightArrowHandler = (index) => {
    index < QuoteData.length - 1 && setCurrentQuote(index + 1);
  };

  return quotesLoading ? (
    <p style={{ height: "100vh", margin: 10, fontSize: 20 }}>Loading....</p>
  ) : (
    <div className="root-screen">
      <form onSubmit={handleSubmit(AddQuotesHandler)}>
        <Row>
          <Col span={24}>
            <Typography className="composeHeading">Quotes</Typography>
          </Col>
          <Space spacing={30} />
          <Col span={24}>
            <Row>
              <div className="quotes-display neumorphism">
                <Col span={24}>
                  <Typography className="quotes-content-text">
                    {QuoteData.length > 0 &&
                      QuoteData[currentQuote]?.quotecontent}
                  </Typography>
                  <Space spacing={5} />
                  <Typography className="quotes-author-text">
                    {QuoteData.length > 0 && QuoteData[currentQuote]?.author}
                  </Typography>
                </Col>
                <Space spacing={20} />
                <Row justify="space-between">
                  <Col>
                    <FaAngleLeft
                      className={
                        currentQuote === 0
                          ? "quotes-arrows quotes-left-arrow disabled"
                          : "quotes-arrows quotes-left-arrow"
                      }
                      onClick={() => LeftArrowHandler(currentQuote)}
                      size={25}
                      color="cornflowerblue"
                    />
                  </Col>
                  <Col>
                    <FaAngleRight
                      className={
                        currentQuote === QuoteData?.length - 1
                          ? "quotes-arrows quotes-right-arrow disabled"
                          : "quotes-arrows quotes-right-arrow"
                      }
                      onClick={() => RightArrowHandler(currentQuote)}
                      size={25}
                      color="cornflowerblue"
                    />
                  </Col>
                </Row>
              </div>
            </Row>
          </Col>
          <Space spacing={30} />
          <Col span={24}>
            <Typography className="composeTitle">Author Name</Typography>
          </Col>
          <Space spacing={5} />
          <Col span={24}>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  autoComplete="off"
                  {...field}
                  className="composeInput neumorphism"
                />
              )}
              name="author"
            />
          </Col>
          <Space spacing={10} />
          <Col span={24}>
            <Typography className="composeTitle">Your Quote</Typography>
          </Col>
          <Space spacing={5} />
          <Col span={24}>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  autoComplete="off"
                  {...field}
                  className="composeInput neumorphism"
                />
              )}
              name="quotecontent"
            />
          </Col>
          <Space spacing={20} />
          <Col span={24}>
            <Button
              htmlType="submit"
              disabled={
                watching?.author || watching?.quotecontent ? false : true
              }
              className={
                watching?.author || watching?.quotecontent
                  ? "composePublish neumorphism flexbox"
                  : "composePublish neumorphism composeDisabled flexbox"
              }
            >
              Add
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default index;
