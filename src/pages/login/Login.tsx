import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LoginBox } from "./components/LoginBox";
import { LoginCard } from "./components/LoginCard";
import { PatternFormat } from "react-number-format";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";

export const Login = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

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
    console.log(formState.isValid);
    if (formState.isValid && !isValidating) {
      console.log(data);
      setLoading(true);
    }
  }, [formState, data, isValidating]);

  return (
    <LoginBox>
      <LoginCard elevation={20}>
        <Typography variant={"h5"}>Вход</Typography>
        <Typography variant={"subtitle1"}>
          Введите номер телефона. На него поступит СМС с кодом для авторизации.
        </Typography>

        <form
          onSubmit={handleSubmit(
            (e) => console.log(e),
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
                  endAdornment: loading ? (
                    <InputAdornment position="end">
                      <CircularProgress size={30}/>
                    </InputAdornment>
                  ) : null,
                }}
                placeholder={"(___) ___-____"}
              />
            )}
            name={"phone_number"}
            control={control}
          />
        </form>
      </LoginCard>
    </LoginBox>
  );
};
