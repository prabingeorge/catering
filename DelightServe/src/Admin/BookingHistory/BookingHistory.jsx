import React, { useState, useEffect } from 'react';
import "./index.css";
import api from "../../contexts/APIContext";
import { Table } from 'react-bootstrap';

const ABookingHistory = () => {

    const [eventDetails, setEventDetails] = useState([]);
    const apiURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(apiURL + "/api/admin/users-details/users-purchase-details");
                const { data } = response;
                setEventDetails([...data]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className='ABookinghistory-view'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Event</th>
                        <th>Name</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {eventDetails && eventDetails.map((purchase) => {
                        return (
                            <tr key={purchase?.purchase_id}>
                                <td>
                                    {purchase?.purchase_id}
                                </td>
                                <td>
                                    <div>
                                        {purchase?.Category?.name}
                                    </div>
                                </td>
                                <td>
                                    <Table>
                                        <tbody>
                                            {purchase?.Category?.CategoriesLists?.map((list) => {
                                                return (
                                                    <tr key={list?.category_list_id}>
                                                        <td>{list?.type}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </td>
                                <td>
                                    {purchase?.User?.name}
                                </td>
                                <td>
                                    {purchase?.User?.phone}
                                </td>
                                <td>
                                    {purchase?.User?.email}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
};

export { ABookingHistory };




