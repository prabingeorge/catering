import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/Cart";
import api from "../../contexts/APIContext";
import "./index.css";

const Menu = () => {
    const { totalCartCount, selectedCategoryId, addSelectedCategoryToCart } = useContext(CartContext);
    const [categoriesList, setCategoriesList] = useState([]);

    const apiURL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(apiURL + "/api/user/categories");
                const { data } = response;
                setCategoriesList([...data]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const changeCategory = (categoryId) => {
        addSelectedCategoryToCart(categoryId);
    };
    return (
        <div className="menu-view">
            <div className="bottom-header">
                <div>
                    <ul className="bottom-menu">
                        {categoriesList?.length > 0 && categoriesList.map((category) => {
                            return (
                                <li key={category?.category_id} className={(selectedCategoryId == category?.category_id) ? 'active-menu' : 'non-active-menu'}>
                                    <Link to={'/dashboard'} onClick={() => changeCategory(category?.category_id)}>{category?.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export { Menu };