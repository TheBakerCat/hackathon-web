import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, FieldValues, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { NavigateNext } from "@mui/icons-material";
import { motion } from "framer-motion";
import { finishPost } from "../../../networking/authorize";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileAtom } from "../../../states/profile";
import { authAtom } from "../../../states/auth";

export const ThirdLoginStep = (props: { handleNext: Function }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [canContinue, setCanContinue] = useState<boolean>(false);
  const profile = useRecoilValue(profileAtom);

  const RegistrationForm = Yup.object().shape({
    user_name: Yup.string().max(64).required(),
  });

  const handleClick = (data: FieldValues) => {
    finishPost(profile.phone, data.user_name)
      .then((res) => {
        localStorage.setItem("token", res.data);
        props.handleNext();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const {
    control,
    handleSubmit,
    watch,
    formState,
    formState: { isValidating },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(RegistrationForm),
  });

  const data = watch();

  useEffect(() => {
    console.log(formState.isValid);
    if (formState.isValid && !isValidating) {
      console.log(data);
      setCanContinue(true);
    } else {
      setCanContinue(false);
    }
  }, [formState, data, isValidating]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: [-20, 0], opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <form
          style={{ margin: "20px 0" }}
          onSubmit={handleSubmit(
            (e) => handleClick(e),
            (e) => console.log(e)
          )}
        >
          <Controller
            render={({ field: { ref, value, ...field }, fieldState }) => (
              <TextField
                label={"Введите имя"}
                sx={{ marginTop: "20px" }}
                variant={"outlined"}
                value={value}
                inputRef={ref}
                fullWidth
                disabled={loading}
                InputProps={{
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
                error={!!fieldState.error?.message}
                helperText={fieldState.error?.message}
                {...field}
              />
            )}
            name={"user_name"}
            control={control}
          />
        </form>
        <Typography variant={"subtitle2"}>
          Введите своё имя для завершения регистрации
        </Typography>
      </Box>
    </motion.div>
  );
};
