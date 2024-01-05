import { TypeAnimation } from "react-type-animation";

const Typer = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat With You OWN AI",
        1000,
        "Built With OpenAI 🤖",
        2000,
        "Your Own Customized ChatGPT 💻",
        1500,
      ]}
      speed={60}
      repeat={Infinity}
      style={{
        fontSize: "4rem",
        color: "white",
        display: "inline-block",
        textAlign: "center",
        textShadow: "1px 1px 20px #000",
      }}
    />
  );
};

export default Typer;
