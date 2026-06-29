import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const staff = JSON.parse(localStorage.getItem("staff"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("staff");
    localStorage.removeItem("admin");
    navigate("/");
  }

  const navItem =
    "relative cursor-pointer text-sm font-medium text-gray-200 hover:text-lime-400 transition";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
      <div className="flex justify-between items-center px-6 py-3">
        {/* LOGO */}
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <h2 className="font-extrabold text-xl tracking-wide">
            DELUXE <span className="text-lime-400">STAYS</span>
          </h2>
        </div>

        {/* NAV LINKS */}
        <ul className="hidden md:flex gap-8 items-center p-0 m-0">
          <li className={navItem} onClick={() => navigate("/")}>
            HOME
          </li>
          <li className={navItem} onClick={() => navigate("/rooms")}>
            ROOMS
          </li>
          <li className={navItem} onClick={() => navigate("/bookings")}>
            BOOKINGS
          </li>
          <li className={navItem} onClick={() => navigate("/contact")}>
            CONTACT
          </li>
        </ul>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          {/* NOT LOGGED IN */}
          {!user && !staff && !admin && (
            <>
              <Link to="/user-login">
                <button className="px-4 py-1.5 rounded-full bg-lime-400 text-black font-semibold hover:scale-105 transition">
                  User
                </button>
              </Link>

              <Link to="/staff-login">
                <button className="px-4 py-1.5 rounded-full border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black transition">
                  Staff
                </button>
              </Link>
            </>
          )}

          {/* USER */}
          {user && (
            <>
              <button
                onClick={() => navigate("/bookings")}
                className="px-4 py-1.5 rounded-full bg-lime-400 text-black font-semibold hover:scale-105 transition"
              >
                My Trips
              </button>

              <button
                onClick={logout}
                className="px-4 py-1.5 rounded-full bg-red-500 text-white hover:scale-105 transition"
              >
                Logout
              </button>
            </>
          )}

          {/* STAFF */}
          {staff && (
            <>
              <button
                onClick={() => navigate("/staff-dashboard")}
                className="px-4 py-1.5 rounded-full bg-lime-400 text-black font-semibold hover:scale-105 transition"
              >
                Dashboard
              </button>

              <button
                onClick={logout}
                className="px-4 py-1.5 rounded-full bg-red-500 text-white hover:scale-105 transition"
              >
                Logout
              </button>
            </>
          )}

          {/* ADMIN */}
          {admin && (
            <>
              <button
                onClick={() => navigate("/admin-dashboard")}
                className="px-4 py-1.5 rounded-full bg-lime-400 text-black font-semibold hover:scale-105 transition"
              >
                Admin
              </button>

              <button
                onClick={logout}
                className="px-4 py-1.5 rounded-full bg-red-500 text-white hover:scale-105 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
