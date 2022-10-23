import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AccountCircle, FactCheck } from "@mui/icons-material";

export const DashboardDrawer = () => {
  const drawerWidth = 240;
  const navigator = useNavigate();

  const items = [
    {
      text: "Профиль",
      icon: <AccountCircle />,
      onClick: () => {
        navigator("profile");
      },
    },
    {
      text: "Проверки",
      icon: <FactCheck />,
      onClick: () => {
        navigator("checks");
      },
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        display: { xs: "none", md: "block" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {items.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export const BottomDashboardNavigation = () => {
  const [value, setValue] = useState("checks");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", md: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ width: "100%" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          component={Link}
          to={"checks"}
          label="Проверки"
          value="checks"
          icon={<FactCheck />}
        />
        <BottomNavigationAction
          component={Link}
          to={"profile"}
          label="Профиль"
          value="profile"
          icon={<AccountCircle />}
        />
      </BottomNavigation>
    </Paper>
  );
};
