import { Link } from "react-router-dom";
import './index.css';

// const baseUrl = `http://localhost:5173/src/assets/images/`;
// const baseUrl = `https://furniture-ui-2qka.onrender.com/public/images`;
const baseUrl = `/images/`;

const Images = ({ fileName, categoryListId, path, cssClass }) => {
    const url = baseUrl + path + '/' + fileName;

    return (
        <div className="images-view">
            <Link to={"/categories-list/" + categoryListId}>
                <img className={cssClass} src={url} alt={fileName} srcSet={`${url} 200w,`} />
            </Link>
        </div>
    )
}

export default Images;