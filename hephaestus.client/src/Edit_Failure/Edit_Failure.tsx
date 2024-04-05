import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface FailureData {
    failureType: string;
    name: string;
    date: string;
    potentialPrice: string;
    potentialDate: string;
    status: string;
    repairDescription: string;
}

function Edit_Failure() {
    const { id } = useParams();
    const [failureData, setFailureData] = useState<FailureData>({
        failureType: '0',
        name: '',
        date: '',
        potentialPrice: '',
        potentialDate: '',
        status: '0',
        repairDescription: ''
    });

    useEffect(() => {
        const fetchFailureDetails = async (id: string) => {
            try {
                const response = await axios.get<FailureData>(`https://localhost:7292/failures/${id}`);
                setFailureData({
                    ...response.data,
                    date: response.data.date ? response.data.date.slice(0, 10) : '',
                    potentialDate: response.data.potentialDate ? response.data.potentialDate.slice(0, 10) : ''
                });
            } catch (error) {
                console.error('Error fetching failure details:', error);
            }
        };
        fetchFailureDetails(id);

    }, [id]);

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
            const response = await axios.put(
                `https://localhost:7292/faiilures/${id}`,
                convertedData
            );

            console.log('Server response:', response.data);
            window.location.href = '/failure/details/' + id;
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
                        disabled
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
                        disabled
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
                        disabled
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
}
export default Edit_Failure;
