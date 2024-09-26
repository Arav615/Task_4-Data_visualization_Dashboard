// components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';  

const Dashboard = () => {
  const [metrics, setMetrics] = useState({});
  const [yearData, setYearData] = useState([]);
  const [oldNewData, setOldNewData] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/student-metrics').then(response => {
      setMetrics(response.data);
    });

    axios.get('http://localhost:5000/api/year-wise-strength').then(response => {
      setYearData(response.data);
    });

    axios.get('http://localhost:5000/api/old-new-students').then(response => {
      setOldNewData(response.data);
    });

    axios.get('http://localhost:5000/api/students').then(response => {
      setStudents(response.data);
    });
  }, []);

  const yearWiseChartData = {
    labels: yearData.map(item => item.year),
    datasets: [
      {
        label: 'Students Strength',
        data: yearData.map(item => item.strength),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  
  const oldNewChartData = {
    labels: ['Old Students', 'New Students'],
    datasets: [
      {
        data: [oldNewData.old || 0, oldNewData.new || 0],
        backgroundColor: ['#55E2E9', '#02367B'],
      },
    ],
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex gap-5">
        <div className="bg-gray-200 p-5 rounded-lg flex-1 text-center text-lg font-bold">
          Total Students: {metrics.totalStudents || 0}
        </div>
        <div className="bg-gray-200 p-5 rounded-lg flex-1 text-center text-lg font-bold">
          Total Classes: {metrics.totalClasses || 0}
        </div>
        <div className="bg-gray-200 p-5 rounded-lg flex-1 text-center text-lg font-bold">
          Current Year Strength: {metrics.currentYearStudents || 0}
        </div>
      </div>

      <div className="flex gap-5 mt-5">
        <div className="flex-1 min-w-[300px] h-[350px] flex flex-col items-center justify-center">
          <h2 className="text-center">Year-wise Student Strength</h2>
          <Bar data={yearWiseChartData} />
        </div>
        <div className="flex-1 min-w-[300px] h-[350px] flex flex-col items-center justify-center">
          <h2 className="text-center">Old vs New Students</h2>
          <Doughnut data={oldNewChartData} />
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-center">Student Details</h2>
        <table className="min-w-full border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black p-2">Name</th>
              <th className="border border-black p-2">Year</th>
              <th className="border border-black p-2">Strength</th>
              <th className="border border-black p-2">Is New?</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? students.map((student, index) => (
              <tr key={index}>
                <td className="border border-black p-2">{student.name}</td>
                <td className="border border-black p-2">{student.year}</td>
                <td className="border border-black p-2">{student.strength}</td>
                <td className="border border-black p-2">{student.isNew ? 'Yes' : 'No'}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="border border-black p-2 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
