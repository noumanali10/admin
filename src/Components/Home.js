import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../MiddleWare/AuthContext";

export default function Home() {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/');
        return;
      }

      const fetchBuildings = async () => {
        try {
          console.log("Fetching buildings...");
          const response = await axios.get("https://backend-two-mu-64.vercel.app/buildings");
          console.log("API Response:", response.data);
          setBuildings(Array.isArray(response.data) ? response.data : []);
          setLoadingData(false);
        } catch (err) {
          setError(err.message);
          setLoadingData(false);
        }
      };

      fetchBuildings();
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSearch = async () => {
    try {
      setLoadingData(true);
      const response = await axios.get(
        `https://backend-two-mu-64.vercel.app/buildings/search/${searchQuery}`
      );
      console.log("Search API Response:", response.data);
      setBuildings(Array.isArray(response.data) ? response.data : []);
      setLoadingData(false);
    } catch (err) {
      setError(err.message);
      setLoadingData(false);
    }
  };

  const onClickDelete = async (id) => {
    try {
      await axios.delete(`https://backend-two-mu-64.vercel.app/buildings/${id}`);
      setBuildings(buildings.filter((building) => building._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading || loadingData) {
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
                  <td className="py-2 px-4 border-b">
                    <Link to={`/files/${building.File}`}>{building.File}</Link>
                  </td>
                  <td className="py-2 px-4 border-b">{`Lat: ${building.coordinates.lat}, Lng: ${building.coordinates.lng}`}</td>
                  <td className="py-2 px-4 border-b">{building.Description}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="mr-2 text-blue-500">
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => setConfirmDelete(building._id)}
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

      {confirmDelete && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <div className="flex justify-between">
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClickDelete(confirmDelete);
                  setConfirmDelete(null);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
