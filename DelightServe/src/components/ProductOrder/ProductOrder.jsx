import { useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Images from "../Images/Images";
import { CartContext } from "../../contexts/Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const ProductOrder = () => {
    const { cartItems } = useContext(CartContext);
    let params = useParams();
    const navigate = useNavigate();

    const product = cartItems.find((cartItem) => cartItem.categoryListItemId === parseInt(params?.categoryListItemId));

    const [productQuantity, setProductQuantity] = useState(product?.quantity);
    
    const buyNowProduct = () => {
        navigate(`/eventinformations/${params?.categoryListItemId}`);
    };

    return (
        <>
            <div className="productorder-view">
                <div>
                    <Images fileName={product?.imageName} path={`details/${product?.categoryId}`} cssClass={'order-rectangle-image'} />
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
                            <label>Total Price: </label>
                            <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{(product?.price - product?.discountPrice) * productQuantity} (incl. of all taxes)
                        </li>
                        <li>
                            <input type="button" className="buy-now" onClick={() => buyNowProduct()} value={'ORDER NOW'} />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default ProductOrder;