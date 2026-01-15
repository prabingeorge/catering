import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../contexts/APIContext";
import { CartContext } from "../../contexts/Cart";
import "./index.css";
import starLogo from "../../assets/images/header/logo3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelopeCircleCheck, faSignOut, faSignIn, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Header = () => {

    const [categoriesList, setCategoriesList] = useState([]);
    const { user, logout } = useAuth();
    const { totalCartCount, selectedCategoryId, addSelectedCategoryToCart } = useContext(CartContext);

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
        <div className="header-view">
            <div className="header">
                <div className="header-wrapper">
                    <ul className="left-menu">
                        <li>
                            <label className="active-menu">Events</label>
                        </li>
                    </ul>
                    <ul className="right-menu">
                        <li>
                            <FontAwesomeIcon icon={faPhone} size="1x" style={{ color: '#ffa500' }} /> +91 9486629098
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faEnvelopeCircleCheck} size="1x" style={{ color: '#ffa500' }} /> ajinselva03@gmail.com
                        </li>
                    </ul>

                </div>
            </div>
            <div className="middle-header">
                <div>
                    <img src={starLogo} alt="logo" className="header-logo" />
                </div>
                <div className="menu-container">
                    {user?.name ? <>
                        <label onClick={logout}>
                            {user?.name}
                            <FontAwesomeIcon icon={faSignOut} size="1x" style={{ color: '#ffa500', paddingLeft: '5px' }} />
                        </label>
                    </> :
                        <label>
                            <FontAwesomeIcon icon={faSignIn} size="1x" style={{ color: '#ffa500', paddingRight: '5px' }} />
                            <Link to="/login">Sign In</Link>
                        </label>}
                    {/* <label>
                        <FontAwesomeIcon icon={faHeart} size="1x" style={{ color: '#ffa500', paddingRight: '5px' }} />
                        Wishlist (0)
                    </label>
                    <label>
                        <FontAwesomeIcon icon={faCartShopping} size="1x" style={{ color: '#ffa500', paddingRight: '5px' }} />
                        Cart ({totalCartCount()})
                    </label> */}
                </div>
            </div>
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

export default Header;