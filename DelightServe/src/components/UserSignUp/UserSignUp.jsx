import { useState } from "react";
import api from "../../contexts/APIContext";
import "./index.css";

const UserSignUp = () => {

    const apiURL = import.meta.env.VITE_API_URL;
    const initialUserInfo = {
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        status: "confirmed"
    }

    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const addFieldValue = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const saveUserInfo = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        try {
            const { confirmPassword, ...userInfoCopy } = userInfo;
            if (!userInfo?.name) {
                setError("Name should not be empty!");
                return;
            }
            if (!userInfo?.email) {
                setError("Email should not be empty!");
                return;
            }
            if (!userInfo?.phone) {
                setError("Phone should not be empty!");
                return;
            }
            if (!userInfo?.password) {
                setError("Password should not be empty!");
                return;
            }
            if (!confirmPassword) {
                setError("Confirm password should not be empty!");
                return;
            }
            if (confirmPassword !== userInfo?.password) {
                setError("Password and Confirm password should be same!");
                return;
            }
            const response = await api.post(apiURL + "/api/auth/register", userInfoCopy);

            if (response?.status === 201 && !!response?.data?.token) {
                setSuccess("Registered successfully. Kindly do SignIn");
                setUserInfo(initialUserInfo);
            }

            //   navigate("/dashboard");
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

    return (
        <div className="usersignup-view">
            <ul className="product-panel">
                <li>
                    <div className="group">
                        <label htmlFor="name" className="label">Full Name*</label>
                        <input type="text" name="name" placeholder="Full Name" value={userInfo?.name} onChange={addFieldValue} className="input" />
                    </div>
                </li>
                <li>
                    <div className="group">
                        <label htmlFor="phone" className="label">Mobile*</label>
                        <input type="text" name="phone" placeholder="Mobile" value={userInfo?.phone} onChange={addFieldValue} className="input" />
                    </div>
                </li>
                <li>
                    <div className="group">
                        <label htmlFor="email" className="label">Email*</label>
                        <input type="email" name="email" placeholder="Email" value={userInfo?.email} onChange={addFieldValue} className="input" />
                    </div>
                </li>
                <li>
                    <div className="group">
                        <label htmlFor="password" className="label">Password*</label>
                        <input type="password" name="password" placeholder="Password" value={userInfo?.password} onChange={addFieldValue} className="input" />
                    </div>
                </li>
                <li>
                    <div className="group">
                        <label htmlFor="confirmPassword" className="label">Confirm Password*</label>
                        <input type="password" name="confirmPassword" placeholder="Confirm" value={userInfo?.confirmPassword} onChange={addFieldValue} className="input" />
                    </div>
                </li>
                {(error || success) && <li>
                    <div className="group group-error">
                        {error && <label className="error">{error}</label>}
                        {success && <label className="success">{success}</label>}
                    </div>
                </li>}
                <li>
                    <div className="group">
                        <input type="button" className="button" value="Save" onClick={saveUserInfo} />
                    </div>
                </li>
            </ul>
        </div>
    )
};

export { UserSignUp };