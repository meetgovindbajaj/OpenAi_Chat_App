import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo">
      <Link
        to={"/"}
        style={{
          textDecoration: "none",
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          src="openai.png"
          alt="openai"
          width={"30px"}
          height={"30px"}
          className="image__inverted"
        />
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "1.2rem" }}>MERN</span>-GPT
      </Typography>
    </div>
  );
};

export default Logo;
