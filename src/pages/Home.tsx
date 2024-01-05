import { Box } from "@mui/material";
import Typer from "../components/shared/Typer";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        display={"flex"}
        width={"100%"}
        flexDirection={"column"}
        alignItems={"center"}
        mx={"auto"}
        mt={3}
      >
        <Box p={3} height={{ md: "20dvh", xs: "40dvh" }}>
          <Typer />
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={{ md: "row", xs: "column", sm: "column" }}
          gap={5}
          my={10}
        >
          <img
            src="robot.png"
            alt="robot"
            width={"200px"}
            style={{ margin: "auto" }}
          />
          <img
            className="image__inverted image__rotate"
            src="openai.png"
            alt="openai"
            width={"200px"}
            style={{ margin: "auto" }}
          />
        </Box>
        <Box display={"flex"} width={"100%"} mx={"auto"}>
          <img src="chat.png" alt="chat" className="image" />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
