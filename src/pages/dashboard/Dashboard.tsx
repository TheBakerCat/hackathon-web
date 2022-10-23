import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Logout } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import {
  BottomDashboardNavigation,
  DashboardDrawer,
} from "./components/DashboardDrawer";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../states/auth";

const Dashboard = () => {
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth("");
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="static"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Личный кабинет
            </Typography>
            <IconButton onClick={handleLogout} color={"inherit"}>
              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DashboardDrawer />
        <BottomDashboardNavigation />
      </Box>
      <Outlet />
    </motion.div>
  );
};
export default Dashboard;
