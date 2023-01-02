import { Typography } from "antd";

const index = ({ data }) => {
  console.log({ data });
  return (
    <div className="root-screen">
      <Typography className="composeHeading">Contact-Us</Typography>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3001/api/v1/books");
  const Books = await res.json();

  return {
    props: {
      data: Books,
    },
  };
};

export default index;
