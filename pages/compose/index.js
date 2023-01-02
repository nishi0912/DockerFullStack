import { useEffect, useState } from "react";
import { Col, Input, Row, Typography, Button } from "antd";
import Space from "../../Components/Reused/Space";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";

const index = () => {
  const { control, handleSubmit, reset, watch } = useForm();
  const watching = watch();
  const router = useRouter();
  const [composeLoading, setComposeLoading] = useState(true);

  useEffect(() => {
    const authorizeCompose = async () => {
      const session = await getSession();

      if (session) {
        setComposeLoading(false);
      } else {
        signIn();
      }
    };
    authorizeCompose();
  }, [composeLoading]);

  const SubmitPostHandler = async (data) => {
    const res = await fetch("/api/compose", {
      method: "POST",
      body: JSON.stringify({
        data,
      }),
      headers: {
        "content-Type": "application/json",
      },
    });
    router.push("/");
  };

  return composeLoading ? (
    <p style={{ height: "100vh" }}>Loading....</p>
  ) : (
    <div className="root-screen">
      <form onSubmit={handleSubmit(SubmitPostHandler)}>
        <Row>
          <Col span={24}>
            <Typography className="composeHeading">Compose</Typography>
          </Col>
          <Space spacing={30} />
          <Row>
            <Col span={24}>
              <Typography className={"composeTitle"}>Creator</Typography>
            </Col>
            <Space spacing={1} />
            <Col span={24} className="composeInputContainer">
              <Controller
                control={control}
                render={({ field }) => (
                  <Input {...field} className="composeInput neumorphism" />
                )}
                name="creator"
              />
            </Col>
            <Space spacing={10} />
            <Col span={24}>
              <Typography className={"composeTitle"}>Title</Typography>
            </Col>
            <Space spacing={1} />
            <Col span={24} className="composeInputContainer">
              <Controller
                control={control}
                render={({ field }) => (
                  <Input {...field} className="composeInput neumorphism" />
                )}
                name="title"
              />
            </Col>
            <Space spacing={10} />
            <Col span={24}>
              <Typography className={"composeTitle"}>Post</Typography>
            </Col>
            <Space spacing={1} />
            <Col span={24} className="composeInputContainer">
              <Controller
                control={control}
                render={({ field }) => (
                  <Input {...field} className="composeInput neumorphism" />
                )}
                name="content"
              />
            </Col>
            <Space spacing={10} />
            <Col span={24}>
              <Typography className={"composeTitle"}>Length</Typography>
            </Col>
            <Space spacing={1} />
            <Col span={24} className="composeInputContainer">
              <Controller
                control={control}
                render={({ field }) => (
                  <Input {...field} className="composeInput neumorphism" />
                )}
                name="length"
              />
            </Col>
            <Space spacing={10} />
            <Col span={24}>
              <Button
                htmlType="submit"
                disabled={
                  watching.creator ||
                  watching.title ||
                  watching.content ||
                  watching.length
                    ? false
                    : true
                }
                className={
                  watching.creator ||
                  watching.title ||
                  watching.content ||
                  watching.length
                    ? "composePublish flexbox"
                    : "composePublish flexbox disabled"
                }
              >
                Publish
              </Button>
            </Col>
          </Row>
        </Row>
      </form>
    </div>
  );
};

export default index;
