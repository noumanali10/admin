import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Building() {
    const [buildingData, setBuildingData] = useState({
        ID: '',
        name: '',
        Description: '',
        coordinates: {
            lat: '',
            lng: '',
        },
        File: null
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchBuildingData = async () => {
                try {
                    const response = await axios.get(`https://backend-two-mu-64.vercel.app/buildings/${id}`);
                    setBuildingData({
                        ID: response.data.ID,
                        name: response.data.name,
                        Description: response.data.Description,
                        coordinates: {
                            lat: response.data.coordinates.lat,
                            lng: response.data.coordinates.lng,
                        },
                        File: null // File cannot be pre-filled
                    });
                } catch (error) {
                    console.error('Error fetching building data:', error);
                }
            };

            fetchBuildingData();
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'lat' || name === 'lng') {
            setBuildingData(prevState => ({
                ...prevState,
                coordinates: {
                    ...prevState.coordinates,
                    [name]: value
                }
            }));
        } else if (name === 'File') {
            setBuildingData(prevState => ({
                ...prevState,
                File: files[0]
            }));
        } else {
            setBuildingData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('ID', buildingData.ID);
        formData.append('name', buildingData.name);
        formData.append('Description', buildingData.Description);
        formData.append('lat', buildingData.coordinates.lat);
        formData.append('lng', buildingData.coordinates.lng);
        if (buildingData.File) {
            formData.append('File', buildingData.File);
        }

        try {
            if (id) {
                // Update existing building
                const response = await axios.put(`https://backend-two-mu-64.vercel.app/buildings/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Building updated successfully:', response.data);
            } else {
                // Create new building
                const response = await axios.post('https://backend-two-mu-64.vercel.app/buildings', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Building created successfully:', response.data);
            }
            navigate('/admin');
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    };

    return (
        <>
            <Navbar />
            <h1 className="text-2xl font-semibold mt-4 pl-2">Building</h1>
            <div className="flex items-center justify-center mt-5 bg-gray-100 border border-red-700">
                <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label htmlFor="ID" className="block text-gray-700 font-bold mb-2">Building ID</label>
                        <input type="text" id="ID" name="ID" value={buildingData.ID} onChange={handleChange} placeholder="B123" className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Building Name</label>
                        <input type="text" id="name" name="name" value={buildingData.name} onChange={handleChange} placeholder="Main Building" className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lat" className="block text-gray-700 font-bold mb-2">Latitude</label>
                        <input type="text" id="lat" name="lat" value={buildingData.coordinates.lat} onChange={handleChange} placeholder="37.7749° N" className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lng" className="block text-gray-700 font-bold mb-2">Longitude</label>
                        <input type="text" id="lng" name="lng" value={buildingData.coordinates.lng} onChange={handleChange} placeholder="122.4194° W" className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="File" className="block text-gray-700 font-bold mb-2">File</label>
                        <input type="file" id="File" name="File" onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="Description" className="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea id="Description" name="Description" value={buildingData.Description} onChange={handleChange} placeholder="Description of the building" className="w-full px-3 py-2 border rounded-md"></textarea>
                    </div>
                    <div className="mb-4">
                        <input type="submit" value="Submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer" />
                    </div>
                </form>
            </div>
        </>
    );
}
