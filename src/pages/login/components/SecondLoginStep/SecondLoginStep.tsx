import ReactInputVerificationCode from "react-input-verification-code";
import { Box, Link, Typography } from "@mui/material";
import "./SecondLoginStep.css";
import { useState } from "react";
import useInterval from "../../../../utils/useInterval";
import { motion } from "framer-motion";
import { confirmPost } from "../../../../networking/authorize";
import { profileAtom } from "../../../../states/profile";
import {useRecoilState, useRecoilValue} from "recoil";
import { authAtom } from "../../../../states/auth";

export const SecondLoginStep = (props: { handleNext: Function }) => {
  const [timer, setTimer] = useState(60);
  const profile = useRecoilValue(profileAtom);
  useInterval(() => setTimer((prev) => prev - 1), timer > 0 ? 1000 : null);
  const [error, setError] = useState<string | null>(null);

  const resetTimer = function () {
    if (!timer) {
      setTimer(60);
    }
  };

  const handleCompleted = (code: string) => {
    confirmPost(profile.phone, code)
      .then((r) => {
        localStorage.setItem("token", r.data);
        props.handleNext()
      })
      .catch((e) => {
        console.log(e);
        if (
          e.response?.status === 404 &&
          e.response?.data?.message !== "Invalid code"
        ) {
          localStorage.setItem("token", e.response?.data);
          props.handleNext();
        } else {
          setError(e.response?.data?.message);
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ x: [-100, 0], opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box className="custom-styles">
          <ReactInputVerificationCode
            autoFocus
            placeholder=""
            length={4}
            onCompleted={handleCompleted}
          />
          {error && (
            <Typography
              variant={"body1"}
              sx={{ color: "error.main", marginTop: "10px" }}
            >
              {error}
            </Typography>
          )}
        </Box>
        <Typography variant={"subtitle1"}>
          Введите код из СМС для продолжения
        </Typography>
        <Typography variant={"subtitle2"}>
          Не пришёл код?{" "}
          {timer > 0 ? (
            `Запросить его снова вы сможете через ${timer} секунд.`
          ) : (
            <Link sx={{ cursor: "pointer" }} onClick={resetTimer}>
              Запросите его заного!
            </Link>
          )}
        </Typography>
      </Box>
    </motion.div>
  );
};
