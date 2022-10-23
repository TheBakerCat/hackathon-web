import { Box, BoxProps, styled } from "@mui/material";
import background from "../../../assets/background.jpg";

export const LoginBox = styled(Box)<BoxProps>(({  }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));
