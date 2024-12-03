import React, { useState, useEffect } from 'react';
import staffService from '../../services/staffService';
import scheduleService from '../../services/scheduleService';
import backgroundImage from '../../images/mediback.jpg';
import { FaUserMd, FaCalendarAlt, FaClock } from 'react-icons/fa';

const StaffNotifyPage = () => {
  const [staff, setStaff] = useState(null);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchStaffAndSchedules = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email) {
        const staffData = await staffService.getStaffByEmail(user.email);
        setStaff(staffData);
        if (staffData.staffId) {
          const scheduleData = await scheduleService.getSchedulesByStaffId(staffData._id);
          setSchedules(scheduleData);
        }
      }
    };

    fetchStaffAndSchedules();
  }, []);

  return (
    <div style={styles.backgroundImage}>
      <div style={styles.container}>
        <h1 style={styles.title}>My Schedule Dashboard</h1>
        {staff && (
          <div style={styles.staffCard}>
            <FaUserMd style={styles.icon} />
            <h2 style={styles.cardTitle}>Staff Information</h2>
            <p style={styles.staffInfo}>Name: {staff.name}</p>
            <p style={styles.staffInfo}>Staff ID: {staff.staffId}</p>
            <p style={styles.staffInfo}>Email: {staff.email}</p>
          </div>
        )}
        <div style={styles.scheduleList}>
          <h2 style={styles.subtitle}>Upcoming Schedules</h2>
          {schedules.map((schedule) => (
            <div key={schedule._id} style={styles.scheduleCard}>
              <div style={styles.dateSection}>
                <FaCalendarAlt style={styles.icon} />
                <p style={styles.date}>{new Date(schedule.date).toLocaleDateString()}</p>
              </div>
              <div style={styles.shiftSection}>
                <FaClock style={styles.icon} />
                <p style={styles.shift}>{schedule.shiftStart} - {schedule.shiftEnd}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  backgroundImage: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    padding: '20px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '30px',
  },
  staffCard: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '22px',
    marginBottom: '15px',
  },
  staffInfo: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  scheduleList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  subtitle: {
    fontSize: '24px',
    color: '#2c3e50',
    gridColumn: '1 / -1',
    marginBottom: '15px',
  },
  scheduleCard: {
    backgroundColor: '#ecf0f1',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dateSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  shiftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  date: {
    fontSize: '18px',
    color: '#2c3e50',
    marginLeft: '10px',
  },
  shift: {
    fontSize: '16px',
    color: '#34495e',
    marginLeft: '10px',
  },
  icon: {
    fontSize: '20px',
    color: '#3498db',
  },
};

export default StaffNotifyPage;
