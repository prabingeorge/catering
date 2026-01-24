import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Images from "../Images/Images";
import api from "../../contexts/APIContext";
import { CartContext } from "../../contexts/Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const CategoriesList = () => {

    let navigate = useNavigate();
    const { addToCart, selectedCategoryId } = useContext(CartContext);
    const [categoriesListItems, setCategoriesListItems] = useState([]);

    const addToCartClick = (item) => {
        item.categoryId = selectedCategoryId;
        addToCart(item);
        if (selectedCategoryId == 2) {
            navigate('/productlisttypes/' + item.categoryListItemId);
            return;
        }
        navigate('/productorder/' + item.categoryListItemId);
    }

    let params = useParams();
    const apiURL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post(apiURL + "/api/user/categories-list-items-by-id", { categoryListId: params?.categoryListId });
                const { data } = response;
                setCategoriesListItems([...data]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [params?.categoryListId]);

    return (
        <div className="categories-list-view">
            <div>
                <div className="images-container">
                    {categoriesListItems?.length > 0 && categoriesListItems.map((image) => {
                        return (
                            <>
                                <ul key={image?.categoryListItemId} className="images-wrapper">
                                    <li>
                                        <Images fileName={image.imageName} path={`details/${selectedCategoryId}/`} cssClass={'rectangle-image'} />
                                    </li>
                                    <li>
                                        <label className="product-name">{image.itemName}</label>
                                    </li>
                                    {!(image.itemName == 'Veg' || image.itemName == 'Non Veg') && <>
                                        <li className="product-ratings-count">
                                            <div>
                                                <label>Ratings:</label> {image.ratings}
                                            </div>
                                            <div>
                                                <label>Total Ordered:</label> {image.sendItemsCount}
                                            </div>
                                        </li>
                                        <li>
                                            <label>Price:</label>
                                            <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{image.price}
                                        </li>
                                    </>}
                                    <li className="button-container">
                                        <input type="button" className="add-to-cart" value={'Select'} onClick={() => addToCartClick(image)} />
                                    </li>
                                    <li>
                                        <hr />
                                    </li>
                                </ul>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CategoriesList;