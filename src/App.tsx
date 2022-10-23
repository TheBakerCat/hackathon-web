import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
const Login = lazy(() => import("./pages/login/Login"));
const Main = lazy(() => import("./pages/home/Home"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const NoMatch = lazy(() => import("./pages/nomatch/NoMatch"));
const UserProfile = lazy(
  () => import("./pages/dashboard/pages/UserProfile/UserProfile")
);
const UserChecks = lazy(
  () => import("./pages/dashboard/pages/UserChecks/UserChecks")
);
const Check = lazy(() => import("./pages/dashboard/pages/Check/Check"));
import { AnimatePresence } from "framer-motion";
import FallbackBackdrop from "./components/FallbackBackdrop";

function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route index element={<div>Home</div>} />
        <Route
          path="login"
          element={
            <Suspense fallback={<FallbackBackdrop />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<FallbackBackdrop />}>
              <Dashboard />
            </Suspense>
          }
        >
          <Route
            path={"profile"}
            element={
              <Suspense fallback={<FallbackBackdrop />}>
                <UserProfile />
              </Suspense>
            }
          />
          <Route
            path={"checks"}
            element={
              <Suspense fallback={<FallbackBackdrop />}>
                <UserChecks />
              </Suspense>
            }
          >
            <Route
              path={":checkId"}
              element={
                <Suspense fallback={<FallbackBackdrop />}>
                  <Check />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="/admin" element={<div>Admin</div>} />
        <Route
          path="*"
          element={
            <Suspense fallback={<FallbackBackdrop />}>
              <NoMatch />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
