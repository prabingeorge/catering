import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Images from "../Images/Images";
import api from "../../contexts/APIContext";
import { CartContext } from "../../contexts/Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const ProductOrder = () => {
    const { cartItems, addCartQuantityCount } = useContext(CartContext);
    let params = useParams();
    const navigate = useNavigate();

    const [productQuantity, setProductQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const initialVenueInfo = {
        place: "",
        eventDate: "",
        eventTime: "",
        gender: "",
    };

    const [venueInfo, setVenueInfo] = useState(initialVenueInfo);
    const [validationError, setValidationError] = useState("");

    const addFieldValue = (e) => {
        const { name, value } = e.target;
        setVenueInfo({
            ...venueInfo,
            [name]: value
        });
    };

    const apiURL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post(apiURL + "/api/user/categories-list-items-details", { categoryListItemId: params?.categoryListItemId });
                const { data } = response;
                setProduct(data);
                const selectedItem = cartItems.find((cartItem) => cartItem.category_list_item_id === data.category_list_item_id);
                setProductQuantity(selectedItem?.quantity);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [params?.categoryListItemId]);

    const setQuantity = (qty) => {
        setProductQuantity(qty);
        addCartQuantityCount(product, qty);
    }

    const buyNowProduct = (product) => {
        setValidationError("");
        if (!venueInfo?.place || !venueInfo?.eventDate || !venueInfo?.eventTime || !venueInfo?.gender) {
            setValidationError("Enter all the Event Details!");
            return;
        }
        navigate('/product-confirmation');
    };

    return (
        <>
            <div className="product-order-view">
                <div>
                    <Images fileName={product?.image_name} path={'details'} cssClass={'order-rectangle-image'} />
                </div>
                <div className="order-right-panel">
                    <ul className="order-summary">
                        <li className="product-name">
                            {product?.item_name}
                        </li>
                        <li>
                            <label>Ratings:</label> {product?.ratings}
                        </li>
                        <li>
                            <label>Total Orders:</label> {product?.send_items_count}
                        </li>
                        <li>
                            <hr />
                        </li>
                        <li>
                            <label>Price:</label>
                            <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{product?.price}
                        </li>
                        <li>
                            <label>Discount:</label>
                            <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{product?.discount_price}
                        </li>
                        <li>
                            <label>Total Price:</label>
                            <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{product?.price - product?.discount_price}
                        </li>
                        <li>
                            <hr />
                        </li>
                        <li>
                            <label className="event-details-label">Event Details</label>
                        </li>
                        <li>
                            <label htmlFor="place">Place*</label>
                            <input type="text" placeholder="Place" className="event-control" name="place" value={venueInfo?.place} onChange={addFieldValue} />
                        </li>
                        <li>
                            <label htmlFor="eventDate">Date*</label>
                            <input type="date" className="event-control" name="eventDate" value={venueInfo?.eventDate} onChange={addFieldValue} />
                        </li>
                        {(product?.category_list_id == 1) && <>
                            <li>
                                <label htmlFor="eventTime">Time*</label>
                                <select className="event-control" name="eventTime" value={venueInfo?.eventTime} onChange={addFieldValue}>
                                    <option value="">--Select--</option>
                                    <option value="1">Noon</option>
                                    <option value="2">Evening</option>
                                </select>
                            </li>
                            <li>
                                <label htmlFor="gender">Gender*</label>
                                <select className="event-control" name="gender" value={venueInfo?.gender} onChange={addFieldValue}>
                                    <option value="">--Select--</option>
                                    <option value="1">Bride</option>
                                    <option value="2">Groom</option>
                                </select>
                            </li></>}
                        {(product?.category_list_id == 2) && <>
                            <li>
                                <label htmlFor="eventTime">Time*</label>
                                <select className="event-control" name="eventTime" value={venueInfo?.eventTime} onChange={addFieldValue}>
                                    <option value="">--Select--</option>
                                    <option value="1">Morning</option>
                                    <option value="2">Noon</option>
                                    <option value="3">Evening</option>
                                </select>
                            </li>
                            <li>
                                <label htmlFor="gender">Gender*</label>
                                <select className="event-control" name="gender" value={venueInfo?.gender} onChange={addFieldValue}>
                                    <option value="">--Select--</option>
                                    <option value="1">Girl</option>
                                    <option value="2">Boy</option>
                                </select>
                            </li></>}
                        {validationError && <li>
                            <div className="group-error">
                                <label className="error validation-error">{validationError}</label>
                            </div>
                        </li>}
                        <li>
                            <hr />
                        </li>
                        {/* <li className="product-counter">
                            <label>Quantity:</label>
                            <div className="counter-wrapper">
                                <input type="button" className="counter-button" value={'-'} disabled={productQuantity <= 1} onClick={() => {
                                    if (productQuantity <= 1) {
                                        return;
                                    }
                                    setQuantity(productQuantity - 1);
                                }} />
                                <label className="counter-label">{productQuantity}</label>
                                <input type="button" className="counter-button" value={'+'} disabled={productQuantity >= 10} onClick={() => {
                                    if (productQuantity >= 10) {
                                        return;
                                    }
                                    setQuantity(productQuantity + 1);
                                }} />
                            </div>
                        </li> */}

                        <li>
                            <label>Total Price: </label>
                            <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{(product?.price - product?.discount_price) * productQuantity} (incl. of all taxes)
                        </li>
                        <li>
                            <input type="button" className="buy-now" onClick={() => buyNowProduct(product)} value={'ORDER NOW'} />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default ProductOrder;