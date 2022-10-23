import { apiInstance } from "./base";
import { getRecoil } from "recoil-nexus";
import { authAtom } from "../states/auth";

export const createRevision = (
  form_template_id: string,
  shop_address: string,
  expire_date: string
) => {
  return apiInstance.post(
    "/revisions",
    {
      form_template_id,
      shop_address,
      expire_date,
    },
    {
      headers: {
        Authorization: `Bearer ${getRecoil(authAtom)}`,
      },
    }
  );
};

export const getRevisions = () => {
  return apiInstance.get("/revision/avaliable", {
    headers: {
      Authorization: `Bearer ${getRecoil(authAtom)}`,
    },
  });
};
