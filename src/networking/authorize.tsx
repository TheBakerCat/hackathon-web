import { apiInstance } from "./base";

export const authorizePost = (phone: string) => {
  return apiInstance.post("/authorize", {
    phone,
  });
};

export const confirmPost = (phone: string, code: string) => {
  return apiInstance.post("/authorize/confirm", {
    phone,
    code,
  });
};

export const finishPost = (phone: string, name: string) => {
  return apiInstance.post("/authorize/finish", {
    phone,
    name,
  });
};
