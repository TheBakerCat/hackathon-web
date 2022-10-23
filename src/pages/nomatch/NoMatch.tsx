import {Box, styled, Typography} from "@mui/material";
import { motion } from "framer-motion";
import background from "../../assets/404.jpg";

const NoMatchContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
})

const NoMatch = () => {
  return (
    <NoMatchContainer>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ x: [-1000, 0], opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{marginLeft: "5%"}}>
            <Typography variant="h2" fontWeight={700} color="black">404 - Такой страницы не существует</Typography>
        </motion.div>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ x: [1000, 0], opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 1 }}
            style={{marginLeft: "30%", marginTop: "40px"}}>
            <Typography variant="h3" color="black">Придётся начать сначала.</Typography>
        </motion.div>
    </NoMatchContainer>
  );
};

export default NoMatch;
