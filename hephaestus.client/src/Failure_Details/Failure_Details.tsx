import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';

interface FailureData {
    failureType: number;
    name: string;
    date: string;
    potentialPrice: string;
    potentialDate: string;
    status: number;
    repairDescription: string;
}

function Failure_Details() {
    const { id } = useParams();
    const [failure, setFailure] = useState<FailureData | null>(null);

    useEffect(() => {
        const fetchFailureDetails = async (id: string) => {
            try {
                const response = await axios.get<FailureData>(`https://localhost:7292/failures/${id}`);
                setFailure(response.data);
            } catch (error) {
                console.error('Error fetching failure details:', error);
            }
        };

        fetchFailureDetails(id);
    }, [id]);

    const formatDate = (dateString: string) => {
        const formattedDate = format(new Date(dateString), 'dd/MM/yyyy');
        return formattedDate;
    };

    const mapFailureTypeToText = (type: number) => {
        switch (type) {
            case 0:
                return 'Low';
            case 1:
                return 'Mild';
            case 2:
                return 'High';
            case 3:
                return 'Critical';
            default:
                return 'Error';
        }
    };

    const mapStatusToText = (status: number) => {
        switch (status) {
            case 0:
                return 'New';
            case 1:
                return 'In Progress';
            case 2:
                return 'Finished';
            case 3:
                return 'Unrepairable';
            default:
                return 'Error';
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this failure?');
        if (confirmDelete) {
            try {
                await axios.delete(`https://localhost:7292/failures/${id}`);
                window.location.href = '/failure/list';
            } catch (error) {
                console.error('Error deleting failure:', error);
            }
        }
    };

    return (
        <div>
            {failure ? (
                <div>
                    <h2>Failure Details</h2>
                    <p>Failure Type: {mapFailureTypeToText(failure.failureType)}</p>
                    <p>Name: {failure.name}</p>
                    <p>Date: {formatDate(failure.date)}</p>
                    <p>Potential Price: {failure.potentialPrice}</p>
                    <p>Potential Date: {formatDate(failure.potentialDate)}</p>
                    <p>Status: {mapStatusToText(failure.status)}</p>
                    <p>Repair Description: {failure.repairDescription}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Link to={`/failure/edit/${id}`}>
                <button>Edit</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}
export default Failure_Details;