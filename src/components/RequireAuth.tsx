import { useLocation, Navigate } from "react-router-dom";
import React from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../states/auth";
import parseJwt from "../utils/parseJWT";

export function RequireAuth(props: {
  children: React.ReactNode;
  to: string;
  admin?: boolean;
}): React.ReactElement {
  let location = useLocation();
  const auth = useRecoilValue(authAtom);

  if (!auth) {
    return (
      <Navigate
        to={props.to}
        state={{ from: location, reason: "Your session has expired" }}
        replace
      />
    );
  }

  const parsedJWT = parseJwt(auth);
  if (props.admin && !parsedJWT.admin) {
    return (
      <Navigate
        to={props.to}
        state={{ from: location, reason: "You are not an admin" }}
        replace
      />
    );
  }

  return <>{props.children}</>;
}
