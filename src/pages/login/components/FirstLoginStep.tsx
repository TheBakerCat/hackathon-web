import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, FieldValues, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PatternFormat } from "react-number-format";
import { useEffect, useState } from "react";
import { NavigateNext } from "@mui/icons-material";
import { motion } from "framer-motion";
import { authorizePost } from "../../../networking/authorize";
import { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";
import { profileAtom } from "../../../states/profile";

export const FirstLoginStep = (props: {
  handleNext: Function;
  setRegistered: Function;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [canContinue, setCanContinue] = useState<boolean>(false);
  const setProfile = useSetRecoilState(profileAtom);

  const LoginForm = Yup.object().shape({
    phone_number: Yup.string()
      .min(10, "Phone number should be 10 digits")
      .required("Phone number is required"),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState,
    formState: { isValidating },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginForm),
  });

  const data = watch();

  useEffect(() => {
    if (formState.isValid && !isValidating) {
      setCanContinue(true);
    } else {
      setCanContinue(false);
    }
  }, [formState, data, isValidating]);

  const handleClick = (data: FieldValues) => {
    setLoading(true);
    setProfile((prev) => {
      return {
        ...prev,
        phone: data.phone_number,
      };
    });
    authorizePost(data.phone_number)
      .then((r) => {
        setLoading(false);
        props.setRegistered(true);
        props.handleNext();
      })
      .catch((e: AxiosError) => {
        setLoading(false);
        console.log(e);
        if (e.response?.status === 404) {
          props.setRegistered(false);
          props.handleNext();
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Typography variant={"h5"}>Вход</Typography>
      <form
        style={{ margin: "20px 0" }}
        onSubmit={handleSubmit(
          (e) => handleClick(e),
          (e) => console.log(e)
        )}
      >
        <Controller
          render={({ field: { ref, onChange, value }, fieldState }) => (
            <PatternFormat
              format={"(###) ###-####"}
              prefix={"+7"}
              mask="_"
              customInput={TextField}
              onValueChange={(v) => {
                onChange(Number(v.value));
              }}
              label={"Введите номер телефона"}
              sx={{ marginTop: "20px" }}
              variant={"outlined"}
              value={value}
              inputRef={ref}
              fullWidth
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+7</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleSubmit(
                        (e) => handleClick(e),
                        (e) => console.log(e)
                      )}
                      disabled={loading || !canContinue}
                    >
                      {loading ? (
                        <CircularProgress size={25} />
                      ) : (
                        <NavigateNext />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder={"(___) ___-____"}
              error={!!fieldState.error?.message}
              helperText={fieldState.error?.message}
            />
          )}
          name={"phone_number"}
          control={control}
        />
      </form>
      <Typography sx={{ textAlign: "center" }} variant={"subtitle1"}>
        Введите номер телефона. На него поступит СМС с кодом для авторизации.
      </Typography>
    </motion.div>
  );
};
