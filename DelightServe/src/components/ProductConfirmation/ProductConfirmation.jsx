import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { renderToString } from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import Images from "../Images/Images";
import { CartContext } from "../../contexts/Cart";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../contexts/APIContext";
import "./index.css";
import { SignIn } from "../SignIn/SignIn";
import { UserSignUp } from "../UserSignUp/UserSignUp";

const EmailTemplate = ({ cartItems }) => {
    return (
        // < !DOCTYPE html >
        <html>
            <head>
                <title>Furniture App</title>
            </head>
            <body>
                <div id="root">
                    <div className="email-view">
                        <ul style={{ border: 'solid #1161ee', listStyle: 'none', padding: '0px' }}>
                            {cartItems?.length > 0 && cartItems.map(item => {
                                return (
                                    <li key={item?.categoryListItemId} style={{ display: 'flex', border: '2px solid #ffa500', margin: '5px', padding: '10px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div>
                                                Name: <label style={{ fontWeight: 'bold' }} key={item?.id}>{item?.itemName}</label>
                                            </div>
                                            <div>
                                                Price: <label style={{ fontWeight: 'bold' }} key={item?.id}>
                                                    <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{item?.price}
                                                </label> per Product
                                            </div>
                                            <div>
                                                Discount: <label style={{ fontWeight: 'bold' }} key={item?.id}>{item?.discountPrice}</label>
                                            </div>
                                            <div>
                                                Total: <label style={{ fontWeight: 'bold' }} key={item?.id}>{(item?.price - item?.discountPrice) * item?.quantity}</label>
                                            </div>
                                            <div>
                                                Quantity: <label style={{ fontWeight: 'bold' }} key={item?.id}>{item?.quantity}</label>
                                            </div>
                                        </div>
                                        <div>
                                            <img style={{ height: '200px' }} src={'cid:' + item?.id + '@example.com'} alt={item?.image_name} />
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <script src="/bundle.js"></script>
            </body>
        </html>
    )
}

const ProductConfirmation = () => {

    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    let navigate = useNavigate();
    const apiURL = import.meta.env.VITE_API_URL;
   
    const [emailValidationError, setEmailValidationError] = useState("");

    const savePurchaseDetails = async () => {

        try {
            let response = null;
            const promises = cartItems.map(async (cartItem) => {
                const details = {
                    userId: user?.userId,
                    categoryId: cartItem?.categoryId,
                    categoryListId: cartItem?.categoryListId,
                    categoryListItemId: cartItem?.categoryListItemId,
                    quantity: cartItem?.quantity,
                    amount: cartItem?.price
                }
                response = await api.post(apiURL + "/api/user/purchase-detail", details);

            });
            await Promise.all(promises);
        } catch (error) {
            if (error?.response?.data?.message) {
                setError(error?.response?.data?.message);
                return;
            }
            if (error?.message) {
                setError(error?.message);
                return;
            }
            setError("Already info present!", error);
        }
    };

    const sendConfirmationEmail = async () => {
        try {
            const html = renderToString(<EmailTemplate cartItems={cartItems} />);
            const attachments = [];
            cartItems.map(item => {
                const attachment = {
                    filename: item?.image_name,
                    path: "D:/Divine/furniturem/API/public/images/details/" + item?.imageName,
                    cid: item?.id + '@example.com' //"nodemailer@example.com", // matches the cid in the img src attribute
                };
                attachments.push(attachment);
            });

            const emailBody = {
                to: user?.email,
                subject: "Furniture Order Confirmation",
                message: html,
                attachments: attachments
            }

            await api.post(apiURL + "/api/user-profile/send-mail", emailBody);
            // if (response?.statusText === "Created") {
            //     setSuccess("Order updated successfully");
            //     clearCart();
            //     navigate('/delivery');
            // }
        } catch (error) {
            if (error?.response?.data?.message) {
                setEmailValidationError(error?.response?.data?.message);
                return;
            }
        }
    }

    const confirmedClick = async () => {
        await savePurchaseDetails();
        // await sendConfirmationEmail();
        clearCart();
        navigate('/delivery');
    };

    const removeItemClick = (item) => {
        removeFromCart(item);
    }

    const { user } = useAuth();
   
    // const [isLoggedIn, setIsLoggedIn] = useState(!!user?.phone);
    const [isNewUser, setIsNewUser] = useState(false);
    
    if (cartItems?.length === 0) {
        return (
            <div className="product-confirmation-view">
                <label className="no-product">No orders in the Cart!</label>
            </div>
        )
    }

    return (
        <div className="product-confirmation-view">
            <ul className="product-panel">
                {cartItems?.length > 0 && cartItems.map((item) => {
                    return (
                        <>
                            <li key={item?.categoryListItemId} className="product-wrapper">
                                <div className="product-details">
                                    <div>
                                        Name: <label>{item?.itemName}</label>
                                    </div>
                                    <div>
                                        Price: <label>
                                            <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{item?.price}
                                        </label>
                                    </div>
                                    <div>
                                        Discount: <label>
                                            <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{item?.discountPrice}
                                        </label>
                                    </div>
                                    <div>
                                        Total: <label>
                                            <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{(item?.price - item?.discountPrice) * item?.quantity}
                                        </label>
                                    </div>
                                    {/* <div>
                                        Quantity: <label>{item?.quantity}</label>
                                    </div> */}
                                    <div className="footer-container">
                                        <input type="button" className="button" value="Remove" onClick={() => removeItemClick(item)} />
                                    </div>
                                </div>
                                <div>
                                    <Images fileName={item?.imageName} path={`details/${item?.categoryId}`} cssClass={'square-image'} />
                                </div>
                            </li>
                        </>

                    )
                })}
            </ul>
            {user && <div>
                <ul className="loggedin-panel">
                    <li>
                        Name: {user?.name}
                    </li>
                    <li>
                        Email: {user?.email}
                    </li>
                    <li>
                        Mobile: {user?.phone}
                    </li>
                </ul>
            </div>}
            {!user && !isNewUser && <div>
                <div className="login-header">
                    New User Click here to Register <Link className="link" onClick={() => setIsNewUser(true)}> Click</Link>
                </div>
                <SignIn />
            </div>}
            {!user && isNewUser && <div>
                <div className="login-header">
                    Already registered user <Link className="link" onClick={() => setIsNewUser(false)}> Click</Link>
                </div>
                <UserSignUp />
            </div>
            }
            {user && emailValidationError && <div className="email-validation-container">
                <div className="group group-error">
                    <label className="error">{emailValidationError}</label>
                </div>
            </div>}
            {user && <div className="confirm-button-wrapper">
                <input type="button" className="button" value="Confirmed" onClick={confirmedClick} />
            </div>}
        </div>
    )
};

export default ProductConfirmation;