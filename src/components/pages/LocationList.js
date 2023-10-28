import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Your Firebase configuration import
import Header2 from "./Header2"
import Footer from "./Footer"
import SideNav from "./SideNav"
import './LocationList.css'
import '../charts/chart.css'

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const firestore = getFirestore();
  const locationsCollection = collection(firestore, 'locations');

  useEffect(() => {
    const unsubscribe = onSnapshot(locationsCollection, snapshot => {
      const locationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLocations(locationsData);
    });

    return () => unsubscribe();
  }, []);

  const handleCheckboxChange = (id) => {
    setLocations(prevLocations =>
      prevLocations.map(location =>
        location.id === id ? { ...location, isChecked: !location.isChecked } : location
      )
    );
  };

  const handleDelete = async (id) => {
    setSelectedLocation(id);
  };

  const confirmDelete = async () => {
    if (selectedLocation) {
      try {
        const locationDocRef = doc(firestore, 'locations', selectedLocation);
        await deleteDoc(locationDocRef);
        console.log('Document successfully deleted!');
      } catch (error) {
        console.error('Error deleting document: ', error);
      } finally {
        setSelectedLocation(null); // Clear selected location after delete
      }
    }
  };

  const closeModal = () => {
    setSelectedLocation(null);
  };

  return (
    <>
      <div>
        <Header2 />
        <SideNav />
      </div>
      <div className="content-wrapper">
        <div className="dashboard-heading">
          <div className='content-wrapper1'>
            <h1>Reported Diseases</h1>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Disease</th>
                  <th>Aquaculture Farm Name</th>
                  <th>Mobile Number</th>
                  <th>Reported Date & Time</th>
                  <th>View</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {locations.map(location => (
                  <tr key={location.id}>
                    <td>
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={location.isChecked}
                          onChange={() => handleCheckboxChange(location.id)}
                        />
                        <span className="checkbox-checkmark"></span>
                      </label>
                    </td>
                    <td>{location.disease}</td>
                    <td>{location.name}</td>
                    <td>{location.mobileNo}</td>
                    <td>{new Date(location.timestamp.seconds * 1000).toLocaleString()}</td>
                    <td>
                      <Link to={`/locationdetail/${location.id}`}>
                        <button className="view-button">View</button>
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(location.id)} className="delete-button">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedLocation && (
        <div className="delete-modal">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this reported disease?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete} className="confirm-button">Confirm</button>
              <button onClick={closeModal} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationList;
