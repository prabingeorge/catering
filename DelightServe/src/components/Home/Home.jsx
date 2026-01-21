import { useContext } from "react";
import { Link } from 'react-router-dom';
import AppCarousel from './../Carousel/Carousel';
import { CartContext } from "../../contexts/Cart";
import './index.css';

const Home = () => {

    const { addSelectedCategoryToCart } = useContext(CartContext);

    return (
        <div className="home-view">
            <div className="carousel-container">
                <AppCarousel></AppCarousel>
            </div>
            <div className='place-order-container'>
                <Link to={'/dashboard'} onClick={()=>addSelectedCategoryToCart(1)} className='order-button'>View & Place Order</Link>
            </div>
            <div className="footer-container">
                <div>
                    <label className='label'>Info:</label>
                    <div className='info-details'>
                        <Link className="info-link" to={'/contact-information'}>Contact Us</Link>
                        <Link className="info-link" to={'/terms-of-service'}>Term of Services</Link>
                        <Link className="info-link" to={'/privacy-policy'}>Privacy Policy</Link>
                    </div>
                </div>
                <label className='label'>Our Mission:</label>
                <div className='misson-details'>
                    <p className='description'>We provide full-service catering for intimate gatherings to grand galas, specializing in modern American cuisine with customizable menus for corporate events and weddings. Our service includes menu planning with dietary considerations, professional staff for seamless service, setup of elegant buffet stations with high-quality linens, and complete breakdown/cleanup, ensuring a delicious and stress-free experience from concept to completion.</p>
                </div>
            </div>
        </div>
    )
};

export { Home };