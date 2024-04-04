import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Failure {
  id: number;
  failureType: string;
  name: string;
  date: string;
  potentialPrice: number;
  potentialDate: string;
  status: string;
  repairDescription: string;
}

const FailureList: React.FC = () => {
  const [failures, setFailures] = useState<Failure[]>([]);

  useEffect(() => {
    const fetchFailures = async () => {
      try {
        const response = await axios.get<Failure[]>('https://localhost:7292/get-failures');
        setFailures(response.data);
      } catch (error) {
        console.error('Error fetching failures:', error);
      }
    };

    fetchFailures();
  }, []); // Empty dependency array ensures that effect runs only once on component mount

  return (
    <div>
      <h2>List of Failures</h2>
      <ul>
        {failures.map((failure, index) => (
          <li key={index}>
            <strong>ID:</strong> {failure.id}<br />
            <strong>Name:</strong> {failure.name}<br />
            <strong>Failure Type:</strong> {failure.failureType}<br />
            <strong>Date:</strong> {failure.date}<br />
            <strong>Potential Price:</strong> {failure.potentialPrice}<br />
            <strong>Potential Date:</strong> {failure.potentialDate}<br />
            <strong>Status:</strong> {failure.status}<br />
            <strong>Repair Description:</strong> {failure.repairDescription}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FailureList;
