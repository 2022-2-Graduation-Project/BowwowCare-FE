import React from "react";
import Header from "../../components/Header";
import ThemeSwitcher from "../../components/ThemeSwitcher";

function UserPage() {
  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />
      <ThemeSwitcher></ThemeSwitcher>
    </div>
  );
}

export default UserPage;
