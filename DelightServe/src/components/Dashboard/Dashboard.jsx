import { useEffect, useState, useContext } from "react";
import Images from "../Images/Images";
import api from "../../contexts/APIContext";
import { CartContext } from "../../contexts/Cart"
import "./index.css";

const Dashboard = () => {
  const [categoriesList, setCategoriesList] = useState([]);

   const { selectedCategoryId } = useContext(CartContext);

  const apiURL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post(apiURL + "/api/user/categories-list-by-id", { category_id: selectedCategoryId });
        const { data } = response;
        setCategoriesList([...data]);
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
            <label className="no-data">No data is available.</label>
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
                  <Images fileName={category?.image_name} categoryListId={category?.category_list_id} path={'dashboard'} cssClass={'circle-image'} />
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