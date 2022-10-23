import { atom } from "recoil";

export const profileAtom = atom({
  key: "profile",
  default: {
    name: "",
    phone: "",
  },
});
