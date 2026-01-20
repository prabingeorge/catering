import { useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Images from "../Images/Images";
import { CartContext } from "../../contexts/Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const ProductOrder = () => {
    const { cartItems, addCartQuantityCount } = useContext(CartContext);
    let params = useParams();
    const navigate = useNavigate();

    const product = cartItems.find((cartItem) => cartItem.categoryListItemId === parseInt(params?.categoryListItemId));

    const [productQuantity, setProductQuantity] = useState(product?.quantity);
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

    const setQuantity = (qty) => {
        setProductQuantity(qty);
        addCartQuantityCount(product, qty);
    }

    const buyNowProduct = () => {
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
                    <Images fileName={product?.imageName} path={'details'} cssClass={'order-rectangle-image'} />
                </div>
                <div className="order-right-panel">
                    <ul className="order-summary">
                        <li className="product-name">
                            {product?.itemName}
                        </li>
                        <li>
                            <label>Ratings:</label> {product?.ratings}
                        </li>
                        <li>
                            <label>Total Orders:</label> {product?.sendItemsCount}
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
                            <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{product?.discountPrice}
                        </li>
                        <li>
                            <label>Total Price:</label>
                            <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{product?.price - product?.discountPrice}
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
                        {(product?.categoryListId == 1) && <>
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
                        {(product?.categoryListId == 2) && <>
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
                            <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{(product?.price - product?.discountPrice) * productQuantity} (incl. of all taxes)
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