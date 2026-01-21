import "./index.css";
import { Link } from "react-router-dom";

const ADashboard = () => {

    return (
        <div className='ADashboard-view'>
            <ul className="dashboard-menu">
                <li>
                    <Link to={'/admin/bookinghistory'}>Booking History</Link>
                </li>
                <li>
                    <Link to={'/admin/categories'}>Add Category</Link>
                </li>
                <li>
                    <Link to={'/admin/categorieslist'}>Add Category List</Link>
                </li>
                <li>
                    <Link to={'/admin/categorieslistitems'}>Add Category List Item</Link>
                </li>
            </ul>
        </div>
    )
};

export { ADashboard };