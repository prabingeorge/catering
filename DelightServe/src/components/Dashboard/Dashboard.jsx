import { useEffect, useState, useContext } from "react";
import Images from "../Images/Images";
import api from "../../contexts/APIContext";
import { CartContext } from "../../contexts/Cart";
import { Timer } from "../Timer/Timer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlingBall } from '@fortawesome/free-solid-svg-icons';
import "./index.css";

const Dashboard = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [isTimerRunning, setTimerRunning] = useState(false);

  const { selectedCategoryId } = useContext(CartContext);

  const apiURL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      setTimerRunning(true);
      try {
        const response = await api.post(apiURL + "/api/user/categories-list-by-id", { categoryId: selectedCategoryId });
        const { data } = response;
        setCategoriesList([...data]);
        setTimerRunning(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCategoryId]);

  if (categoriesList?.length === 0) {
    return (
      <div className="dashboard">
        <div>
          <div className="images-container">
            {isTimerRunning && <p className="timer">
              <FontAwesomeIcon icon={faBowlingBall} size="10x" spin style={{ color: '#ed81f7' }} />
              We are fecthing data for you, Kindly do wait <Timer isTimerRunning={isTimerRunning} />
            </p>}
            {!isTimerRunning && <label className="no-data">No data is available.</label>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div>
        <div className="images-container">
          {categoriesList?.length > 0 && categoriesList.map((category) => {
            return (
              <div key={category?.category_list_id}>
                <div>
                  <Images fileName={category?.imageName} categoryListId={category?.categoryListId} path={'dashboard'} cssClass={'circle-image'} />
                </div>
                <div className="type-container">
                  <label>{category?.type}</label>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;