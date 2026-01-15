import React, { useState, useEffect } from 'react';
import "./index.css";
import api from "../../contexts/APIContext";
import { Table } from 'react-bootstrap';

const ADashboard = () => {

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
        <div className='ADashboard-view'>
            Dashboard
            {JSON.stringify(eventDetails)}
            ======
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Event</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {eventDetails && eventDetails.map((detail, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    {detail?.name}


                                </td>
                                <td>
                                    <Table>
                                        <tbody>
                                            {detail?.PurchaseDetails?.map((purchase) => {
                                                return (
                                                    <tr>
                                                        <td>hi</td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </Table>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {/* <ul className='table'>
                {eventDetails && eventDetails.map((detail, index) => {
                    return (
                        <>
                            {index ===0 && <li>
                                    <ul className='table-row'>
                                        <li>
                                            Name
                                        </li>
                                        <li>
                                            Email
                                        </li>
                                        <li>
                                            Mobile
                                        </li>
                                    </ul>
                                </li>}
                            <li>
                               
                               <ul className='table-row'>
                                    <li>
                                        {detail?.name}
                                    </li>
                                    <li>
                                        {detail?.email}
                                    </li>
                                    <li>
                                        {detail?.phone}
                                    </li>
                                </ul>
                            </li>
                        </>
                    )
                })}
            </ul> */}
        </div>
    )
};

export { ADashboard };