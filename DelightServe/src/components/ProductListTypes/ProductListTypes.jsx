import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import api from "../../contexts/APIContext";
import Images from "../Images/Images";
import { Table } from 'react-bootstrap';
import "./index.css";

const ProductListTypes = () => {

    const [categoriesListItemsTypes, setCategoriesListItemsTypes] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [selectedFoodTypeId, setSelectedFoodTypeId] = useState(0);

    let params = useParams();
    const navigate = useNavigate();
    const apiURL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post(apiURL + "/api/user/categories-list-items-types-by-id", { categoryListItemId: params?.categoryListItemId });
                const { data } = response;
                setCategoriesListItemsTypes(data);
                if (data[0]?.categoryListItemTypeId) {
                    setSelectedFoodTypeId(data[0]?.categoryListItemTypeId);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post(apiURL + "/api/user/food-menus-by-id", { categoryListItemTypeId: selectedFoodTypeId });
                const { data } = response;
                setFoodItems(data);
            } catch (error) {
                console.error("Error fetching food data:", error);
            }
        };

        fetchData();
    }, [selectedFoodTypeId]);

    const showFoodItems = async (categoryListItemTypeId) => {
        setSelectedFoodTypeId(categoryListItemTypeId);
    };

    const buyNowProduct = () => {
        navigate('/product-confirmation');
    };

    return (
        <div className="dashboard">
            <div>
                <div className="images-container">
                    {categoriesListItemsTypes?.length > 0 && categoriesListItemsTypes.map((type) => {
                        return (
                            <div key={type?.categoryListItemTypeId}>
                                <div className={(selectedFoodTypeId == type?.categoryListItemTypeId) ? 'active-food-menu' : 'non-active-food-menu'}>
                                    <button onClick={() => showFoodItems(type?.categoryListItemTypeId)}>
                                        <Images fileName={type?.imageName} isNavigate={false} path={'listtypes'} cssClass={'circle-image'} />
                                    </button>
                                </div>
                                <div className="type-container">
                                    <label>{type?.typeName}</label>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="productlisttypes-view">
                <div className='categories-list'>
                    {foodItems?.length == 0 && <div>No Food item is available!</div>}
                    {foodItems?.length > 0 && <Table striped bordered hover className='table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodItems?.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            {item?.foodName}
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan={2}>
                                    <input type="button" className="buy-now" onClick={() => buyNowProduct()} value={'ORDER NOW'} />
                                </td>
                            </tr>
                        </tbody>
                    </Table>}
                </div>
            </div>
        </div>
    )
};

export { ProductListTypes };