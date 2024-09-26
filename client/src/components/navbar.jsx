import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h1 className="text-lg font-bold mb-4">School Admin Dashboard</h1>
      <nav className='pt-4'>
        <ul className='gap-2 flex flex-col'>
          <li className="mb-2">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-400" : ""}>
              Dashboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/students" className={({ isActive }) => isActive ? "text-blue-400" : ""}>
              Students
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
