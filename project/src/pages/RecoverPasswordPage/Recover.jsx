import React, {useState} from "react";
import Authorization from "../AuthorizationPage/Authorization";

export function RecoverPassword() { 
    const [formData, setFormData] = useState({
        email: "",
        message: ""
    });

    const [emailError, setEmailError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [showLoginForm, setShowAuthorizationForm] = useState(false);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError(false); 
        setMessageError(false);

        if (formData.email === '') {
            setEmailError(true);
        }
        if (formData.message === '') {
            setMessageError(true);
        }

        if (formData.email === '' || formData.message === '') {
            return;
        }


        console.log("Form Data Submitted:", formData);
    };

    const handleRecoverClick = () => {
        setShowAuthorizationForm(true);
    };


    return (
        <div className='form-container'>
            {!showLoginForm ? (
            <form className='form' onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="input"
                    value={formData.email}
                    onChange={handleChange}
                />
                {emailError &&
                    <span className="error">*Please enter your login</span>}

                <input
                    type="text"
                    name="message"
                    placeholder="Enter message from email"
                    className="input"
                    value={formData.message}
                    onChange={handleChange}
                />
                {messageError &&
                    <span className="error">*Please enter message from email</span>}

                <button className='submit'>Change Password</button>
                <button className='submit' type="button" onClick={handleRecoverClick}>
                    Back to Login
                </button>
            </form>

            ) : (
                <Authorization />
            )}
        </div>
    );
}


