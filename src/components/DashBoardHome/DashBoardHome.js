import React from "react";
import DashBoardTopHeader from "../DashBoardTopHeader/DashBoardTopHeader";

function DashBoardHome({ icon, name }) {
  return (
    <div className="DashBoardHome">
      <DashBoardTopHeader icon={icon} name={name} />
    </div>
  );
}

export default DashBoardHome;
