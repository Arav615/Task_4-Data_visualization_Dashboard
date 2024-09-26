import React from 'react';

const Header = () => {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center w-3/12">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded bg-gray-100 text-black w-full"
        />
      </div>
      <div className="flex items-center">
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4">
          Login
        </button>
        <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
