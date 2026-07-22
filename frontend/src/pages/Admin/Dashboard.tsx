import { NavLink, Outlet } from "react-router-dom";
import { FiGrid, FiPackage, FiClipboard } from "react-icons/fi";

const tabs = [
  { to: "/admin", label: "Overview", icon: <FiGrid />, end: true },
  { to: "/admin/cakes", label: "Manage Cakes", icon: <FiPackage /> },
  { to: "/admin/orders", label: "Orders", icon: <FiClipboard /> },
];

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-cocoa mb-8">Admin Dashboard</h1>

      <div className="flex gap-2 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                isActive ? "bg-blush-500 text-white" : "bg-blush-50 text-cocoa hover:bg-blush-100"
              }`
            }
          >
            {tab.icon} {tab.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default Dashboard;
