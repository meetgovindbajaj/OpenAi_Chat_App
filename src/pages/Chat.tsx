import React, { useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../utils/useAuth";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Chat = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const boxRef = useRef<null | HTMLDivElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const message = fd.get("message") as string;
    try {
      if (auth?.setChatMessages)
        auth?.setChatMessages((prevChatMessages) => [
          ...prevChatMessages,
          { _id: new Date().toDateString(), content: message, role: "user" },
        ]);
      toast.loading("Sending message...", { id: "sendChat" });
      if (boxRef) scrollToRef(boxRef, 100);
      await auth?.sendChat(message);
    } catch (error) {
      console.log(error);
    } finally {
      if (boxRef) scrollToRef(boxRef, 1000);
    }
  };
  const handleDelete = async () => {
    try {
      await auth?.deleteChats();
    } catch (error) {
      console.log(error);
    }
  };
  const scrollToRef = (
    ref: React.MutableRefObject<HTMLDivElement | null>,
    timeout: number
  ) => {
    if (ref?.current)
      setTimeout(() => {
        ref?.current?.scrollIntoView({ behavior: "smooth" });
      }, timeout);
  };
  useEffect(() => {
    if (!auth?.isLoading && auth?.isLoggedIn) scrollToRef(boxRef, 1000);
  }, [auth?.isLoading, auth?.isLoggedIn]);

  return auth?.isLoading ? (
    <Box display={"grid"} sx={{ placeItems: "center" }}>
      <Typography>Loading...</Typography>
    </Box>
  ) : auth?.isLoggedIn ? (
    <Box
      display={"flex"}
      flex={1}
      width={"100%"}
      height={"100%"}
      marginTop={3}
      gap={3}
    >
      <Box
        display={{ md: "flex", xs: "none", sm: "none" }}
        flex={0.2}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          width={"100%"}
          height={"100%"}
          bgcolor={"rgb(17,29,39)"}
          borderRadius={5}
          flexDirection={"column"}
          mx={3}
          py={2}
          textAlign={"justify"}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography mx={"auto"} p={3} fontFamily={"sans-serif"}>
            You are talking to a ChatBOT
          </Typography>
          <Typography mx={"auto"} my={4} p={3} fontFamily={"sans-serif"}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information.
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
            onClick={handleDelete}
          >
            Clear conversation
          </Button>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flex={{ md: 0.8, sm: 1, xs: 1 }}
        justifyContent={"center"}
        flexDirection={"column"}
        px={3}
        overflow={"hidden"}
      >
        <Typography
          textAlign={"center"}
          fontSize={"40px"}
          color={"white"}
          mb={2}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          width={"100%"}
          height={"60vh"}
          borderRadius={3}
          mx={"auto"}
          display={"flex"}
          flexDirection={"column"}
          px={1}
          position={"relative"}
          border={"2px solid rgba(255,255,255,.5)"}
          sx={{
            overflowY: "scroll",
            overflowX: "hidden",
            filter: "drop-shadow(0px 0px 15px black)",
          }}
        >
          {auth.chatMessages.map(({ content, role }, index) => {
            return (
              <ChatItem
                role={role as "assistant" | "user"}
                content={content}
                key={index}
              />
            );
          })}
          <div style={{ position: "relative" }} ref={boxRef} />
        </Box>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            e.currentTarget.reset();
          }}
        >
          <TextField
            name={"message"}
            type={"text"}
            placeholder={"Message ChatGPT..."}
            margin="normal"
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            InputProps={{
              style: {
                width: "100%",
                borderRadius: "10px",
                color: "white",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" sx={{ color: "white" }}>
                    <IoMdSend />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: "100%" }}
          />
        </form>
      </Box>
    </Box>
  ) : (
    <Box display={"grid"} sx={{ placeItems: "center" }}>
      <Button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login to continue
      </Button>
    </Box>
  );
};

export default Chat;
