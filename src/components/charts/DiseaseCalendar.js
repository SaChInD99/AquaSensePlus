import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './chart.css'; // Import your CSS file
import Header2 from '../pages/Header2';
import SideNav from '../pages/SideNav';
import '../pages/LocationDetail.css'


function DiseaseCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diseaseReportDates, setDiseaseReportDates] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const locationsCollection = collection(firestore, 'locations');
      const querySnapshot = await getDocs(locationsCollection);

      const reportDates = [];
      querySnapshot.forEach((doc) => {
        const timestamp = doc.data().timestamp.toDate();
        const mobileNo = doc.data().mobileNo;
        const disease = doc.data().disease;
        const name = doc.data().name;
        const species = doc.data().species;
        reportDates.push({ date: timestamp, disease, mobileNo, name, species });
      });

      setDiseaseReportDates(reportDates);
    };

    fetchData();
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const event = diseaseReportDates.find(
        (reportDate) =>
          reportDate.date.getDate() === date.getDate() &&
          reportDate.date.getMonth() === date.getMonth() &&
          reportDate.date.getFullYear() === date.getFullYear()
      );

      return event ? <div className="event-marker" /> : null;
    }
  };

  const handleTileClick = (date) => {
    const event = diseaseReportDates.find(
      (reportDate) =>
        reportDate.date.getDate() === date.getDate() &&
        reportDate.date.getMonth() === date.getMonth() &&
        reportDate.date.getFullYear() === date.getFullYear()
    );

    setSelectedEvent(event);
  };

  return (
    <>
      <div>
        <Header2 />
        <SideNav />
      </div>
      <div className="content-wrapper">
        <div className='content-wrapper1'>
          <div className="calendar-container">
            <h2 className="calendar-title">Disease Report Calendar</h2>
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              tileContent={tileContent}
              onClickDay={handleTileClick} // Add onClickDay handler
            />
            {selectedEvent && (
              <div className="event-popup">
                <h3 className="popup-title">Reported Diseases Details</h3>
                <p><strong>Date:</strong> {selectedEvent.date.toDateString()}</p>
                <p><strong>Disease:</strong> {selectedEvent.disease}</p>
                <p><strong>Mobile Number:</strong> {selectedEvent.mobileNo}</p>
                <p><strong>Name:</strong> {selectedEvent.name}</p>
                <p><strong>Species:</strong> {selectedEvent.species}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DiseaseCalendar;
