import { useDashboardContext } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSideBar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        let { text, icon, path } = link;
        // const { role } = user;
        // if (role !== "admin" && path === "admin") return;
        return (
          <NavLink
            className="nav-link"
            to={path}
            key={text}
            onClick={isBigSidebar ? null : toggleSideBar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
