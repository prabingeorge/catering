import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import "./index.css";

const Cards = ({ foodItems, categoryListItemId }) => {

    const navigate = useNavigate();
    const buyNowProduct = () => {
        navigate(`/eventinformations/${categoryListItemId}`);
    };

    return (
        <CardGroup>
            {foodItems?.map((item) => {
                return (
                    <Card>
                        <Card.Img className="d-block w-10 card-image" variant="top" src={`./../../../public/images/cards/${item?.imageName}`} />
                        <Card.Body>
                            <Card.Title>{item?.foodName}</Card.Title>
                            <Card.Text>
                                {item?.description}
                            </Card.Text>
                            <Card.Text>
                                <label style={{ fontWeight: 'bold' }}>Price:</label> Starts from <FontAwesomeIcon icon={faIndianRupee} size="1x" style={{ color: '#ffa500' }} />{item?.price} per person
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <input type="button" className="buy-now" onClick={() => buyNowProduct()} value={'Place Order'} />
                            {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                        </Card.Footer>
                    </Card>
                )
            })}
        </CardGroup>
    );
}

export { Cards };