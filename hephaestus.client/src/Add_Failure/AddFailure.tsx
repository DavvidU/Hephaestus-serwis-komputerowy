import axios from 'axios';
import React, { useState } from 'react';

interface FailureData {
  failureType: string;
  name: string;
  date: string;
  potentialPrice: string;
  potentialDate: string;
  status: string;
  repairDescription: string;
}

const AddFailure: React.FC = () => {
  const [failureData, setFailureData] = useState<FailureData>({
    failureType: '',
    name: '',
    date: '',
    potentialPrice: '',
    potentialDate: '',
    status: '',
    repairDescription: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFailureData({ ...failureData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert string values to numbers
    const convertedData = {
      ...failureData,
      failureType: parseInt(failureData.failureType),
      status: parseInt(failureData.status)
    };

    try {
      const response = await axios.post(
        'https://localhost:7292/add-failure',
        convertedData
      );

      console.log('Server response:', response.data);

      // Clear form fields after successful submission
      setFailureData({
        failureType: '',
        name: '',
        date: '',
        potentialPrice: '',
        potentialDate: '',
        status: '',
        repairDescription: ''
      });
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };


  return (
    <div>
      <h2>Failure Form</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Failure Type:
          <select
            name="failureType"
            value={failureData.failureType}
            onChange={handleChange}
            required
          >
            <option value="0">Low</option>
            <option value="1">Mild</option>
            <option value="2">High</option>
            <option value="3">Critical</option>
          </select>
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={failureData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={failureData.date}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Potential Price:
          <input
            type="number"
            name="potentialPrice"
            value={failureData.potentialPrice}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Potential Date:
          <input
            type="date"
            name="potentialDate"
            value={failureData.potentialDate}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Status:
          <select
            name="status"
            value={failureData.status}
            onChange={handleChange}
            required
          >
            <option value="0">New</option>
            <option value="1">InProgress</option>
            <option value="2">Finished</option>
            <option value="3">Unrepairable</option>
          </select>
        </label>
        <br />
        <label>
          Repair Description:
          <textarea
            name="repairDescription"
            value={failureData.repairDescription}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddFailure;
