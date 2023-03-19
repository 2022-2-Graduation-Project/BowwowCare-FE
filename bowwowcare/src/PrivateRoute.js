import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./components/Alert";

const PrivateRoute = ({ authenticated, component: Component }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleOpen = (e) => {
    setOpen(!open);
    navigate("/login");
  };

  return authenticated ? (
    Component
  ) : (
    <Alert
      open={open}
      handleOpen={handleOpen}
      content={"로그인이 필요합니다."}
    />
  );
};

export default PrivateRoute;
