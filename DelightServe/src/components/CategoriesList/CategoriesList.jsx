import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Images from "../Images/Images";
import api from "../../contexts/APIContext";
import { CartContext } from "../../contexts/Cart"
import './index.css';

const CategoriesList = () => {

    const { addToCart, selectedCategoryId } = useContext(CartContext);
    const [categoriesListItems, setCategoriesListItems] = useState([]);

    const addToCartClick = (item)=> {
        item.categoryId = selectedCategoryId;
        addToCart(item);
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
                                <ul key={image?.category_list_item_id} className="images-wrapper">
                                    <li>
                                        <Images fileName={image.image_name} path={'details'} cssClass={'rectangle-image'} />
                                    </li>
                                    <li>
                                        <label className="product-name">{image.item_name}</label>
                                    </li>
                                    <li className="product-ratings-count">
                                        <div>
                                            <label>Ratings:</label> {image.ratings}
                                        </div>
                                        <div>
                                            <label>Total Ordered:</label> {image.send_items_count}
                                        </div>
                                    </li>
                                    <li>
                                        <hr />
                                    </li>
                                    <li>
                                        <label>Price:</label> {image.price}
                                    </li>
                                    <li className="button-container">
                                        <Link to={`${'/product-order/' + image.category_list_item_id}`}>
                                            <input type="button" className="add-to-cart" value={'Select'} onClick={()=>addToCartClick(image)} />
                                        </Link>
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