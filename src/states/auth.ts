import { atom } from "recoil";

export const authAtom = atom({
    key: "auth",
    default:
        localStorage.getItem("token") !== null ? JSON.parse(localStorage.getItem("token")!) : "",
});