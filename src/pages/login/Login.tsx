import { useNavigate } from "react-router-dom";
import { LoginBox } from "./components/LoginBox";
import { LoginCard } from "./components/LoginCard";
import { FirstLoginStep } from "./components/FirstLoginStep";
import { ReactNode, useEffect, useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import { SecondLoginStep } from "./components/SecondLoginStep/SecondLoginStep";
import { ThirdLoginStep } from "./components/ThirdLoginStep";
import { motion } from "framer-motion";
import { authAtom } from "../../states/auth";
import { useRecoilValue } from "recoil";
import parseJwt from "../../utils/parseJWT";

const Login = () => {
  let navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [registered, setRegistered] = useState<boolean>(true);
  const [steps, setSteps] = useState<string[]>([
    "Введите номер телефона",
    "Введите код подтверждения",
  ]);
  const auth = useRecoilValue(authAtom);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleLogin = () => {
    const parsedJWT = parseJwt(auth!);
    localStorage.setItem("token", auth!);
    if (parsedJWT.admin) {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      handleLogin();
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  useEffect(() => {
    !registered && setSteps((prev) => [...prev, "Введите своё имя"]);
  }, [registered]);

  return (
    <LoginBox>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <LoginCard sx={{ overflow: "hidden" }} elevation={20}>
          {activeStep !== 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ y: [-20, 0], opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: ReactNode;
                  } = {};
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </motion.div>
          )}
          {activeStep === 0 && (
            <FirstLoginStep
              handleNext={handleNext}
              setRegistered={setRegistered}
            />
          )}
          {activeStep === 1 && <SecondLoginStep handleNext={handleNext} />}
          {activeStep === 2 && <ThirdLoginStep handleNext={handleNext} />}
        </LoginCard>
      </motion.div>
    </LoginBox>
  );
};
export default Login;
