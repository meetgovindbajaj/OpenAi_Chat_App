import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../utils/useAuth";

interface Props {
  content: string;
  role: "user" | "assistant";
}

const ChatItem: React.FC<Props> = ({ content, role }) => {
  const auth = useAuth();
  return role === "assistant" ? (
    <Box
      display={"flex"}
      p={2}
      bgcolor={"#004d5612"}
      my={2}
      gap={2}
      mr={"auto"}
      borderRadius={6}
      alignItems={"center"}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Typography color={"white"} fontSize={16}>
        {content}
      </Typography>
    </Box>
  ) : (
    <Box
      display={"flex"}
      p={2}
      bgcolor={"#004d56"}
      my={2}
      gap={2}
      ml={"auto"}
      borderRadius={6}
      alignItems={"center"}
    >
      <Typography color={"white"} fontSize={16}>
        {content}
      </Typography>
      <Avatar
        sx={{ ml: "0", bgcolor: "white", color: "black", fontWeight: 700 }}
      >
        {auth?.user?.name[0]}
      </Avatar>
    </Box>
  );
};

export default ChatItem;
