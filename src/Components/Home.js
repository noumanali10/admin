import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/buildings");
        setBuildings(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/buildings/search/${searchQuery}`);
      setBuildings(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const onClickDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/buildings/${id}`);
      setBuildings(buildings.filter(building => building._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mt-4 text-xl border border-gray-600 p-3 font-semibold flex justify-between">
        <span>Projects</span>
        <span className="flex justify-end items-center">
          <input
            className="w-full border border-black bg-none text-sm font-medium"
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            id="search"
            placeholder="Enter Building Name"
          />
          <i onClick={handleSearch} className="ml-3 fa-solid fa-search"></i>
        </span>
      </div>
      <div className="m-4">
        {buildings.length > 0 ? (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">File</th>
                <th className="py-2 px-4 border-b">Coordinates</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buildings.map((building) => (
                <tr key={building._id}>
                  <td className="py-2 px-4 border-b">{building.ID}</td>
                  <td className="py-2 px-4 border-b">{building.name}</td>
                  <td className="py-2 px-4 border-b">{building.File}</td>
                  <td className="py-2 px-4 border-b">{`Lat: ${building.coordinates.lat}, Lng: ${building.coordinates.lng}`}</td>
                  <td className="py-2 px-4 border-b">{building.Description}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="mr-2 text-blue-500">
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => onClickDelete(building._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="items flex flex-col">
            <span>No Projects saved yet.</span>
          </div>
        )}
      </div>
      <span className="mt-4 w-full flex justify-center items-center">
        <Link className="text-gray-500 underline" to="/buildings">
          Create New Project
        </Link>
      </span>
    </>
  );
}
