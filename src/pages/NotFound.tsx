import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      display={"grid"}
      sx={{ placeItems: "center" }}
      fontSize={40}
      fontWeight={"bold"}
    >
      Page Not Found
    </Box>
  );
};

export default NotFound;
