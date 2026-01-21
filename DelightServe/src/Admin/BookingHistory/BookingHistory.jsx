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
                    </tr>
                </thead>
                <tbody>
                    {eventDetails && eventDetails.map((category) => {
                        return (
                            <tr key={category?.categoryId}>
                                <td>{category?.categoryId}</td>
                                <td>
                                    <div>
                                        {category?.name}
                                    </div>
                                    <div>
                                        <Table>
                                            <tbody>
                                                {category?.CategoriesLists?.map((list) => {
                                                    return (
                                                        <tr key={list?.categoryListId}>
                                                            <td>{list?.categoryListId}</td>
                                                            <td>{list?.type}</td>
                                                            <td>
                                                                <Table>
                                                                    <tbody>
                                                                        {list?.CategoriesListItems?.map((item) => {
                                                                            return (
                                                                                <tr key={item?.categoryListItemId}>
                                                                                    {/* <td>{item?.categoryListItemId}</td> */}
                                                                                    <td>{item?.itemName}</td>
                                                                                    {/* <td>{item?.price}</td>
                                                                                    <td>{item?.discountPrice}</td> */}
                                                                                    <td>
                                                                                        <Table>
                                                                                            <tbody>
                                                                                                {item?.PurchaseDetails?.map((purchase) => {
                                                                                                    return (
                                                                                                        <tr key={purchase?.purchaseId}>
                                                                                                            {/* <td>{purchase?.purchaseId}</td>
                                                                                                            <td>{purchase?.quantity}</td> */}
                                                                                                            <td>{purchase?.amount}</td>
                                                                                                            <td>{purchase?.User?.name}</td>
                                                                                                            <td>{purchase?.User?.email}</td>
                                                                                                            <td>{purchase?.User?.phone}</td>
                                                                                                            <td>{purchase?.User?.status}</td>
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
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </Table>
                                    </div>
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