import { Paper, PaperProps, styled } from "@mui/material";

export const LoginCard = styled(Paper)<PaperProps>(({ theme }) => ({
  display: "flex",
  padding: "20px",
  minWidth: "500px",
  maxWidth: "500px",
  minHeight: "200px",
  justifyContent: "space-around",
  flexDirection: "column",
}));
