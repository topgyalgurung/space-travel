import { NavLink, Outlet } from "react-router-dom";

const SpacecraftLayout = () => {
  return (
    <div data-testid="spacecraft-outlet">
      <Outlet />
    </div>
  );
};

export default SpacecraftLayout;
