import {Paper, PaperProps, styled} from "@mui/material";

export const LoginCard = styled(Paper)<PaperProps>(({theme}) => ({
    display: "flex",
    padding: "10px 20px",
    maxWidth: "500px",
    justifyContent: "space-around",
    flexDirection: "column",
}))