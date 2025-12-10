import React, {useState} from 'react';
import SignUpForm from '../SignUpPage/SignUp';
import RecoverPassword from '../RecoverPasswordPage/Recover';

export function Authorization() {
    const [formData, setFormData] = useState({
        login: "",
        password: "",
    });

    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showSignForm, setShowSignForm] = useState(false);
    const [showRecoverForm, setShowRecoverForm] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginError(false); 
        setPasswordError(false);

        if (formData.login === '') {
            setLoginError(true);
        }
        if (formData.password === '') {
            setPasswordError(true);
        }

        if (formData.login === '' || formData.password === '') {
            return;
        }


        console.log("Form Data Submitted:", formData);
    };

    const handleLoginClick = () => {
        setShowSignForm(true);
    };

    const handleRecoverClick = () => {
        setShowRecoverForm( true);
    }

    return (
        <div className='form-container'>
            {!showSignForm && !showRecoverForm ? (
                <form className='form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your login"
                        className="input"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                    />
                    {loginError &&
                        <span className="error">Please enter your login</span>}

                    <input
                        type="password"
                        placeholder="Your password"
                        className="input"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {passwordError &&
                        <span className="error">Please enter your password</span>}

                    <button className='submit' type="submit">Login</button>
                    <button className='submit' type="submit" onClick={handleLoginClick}>Sign Up</button>
                    <button className='submit' type="submit" onClick={handleRecoverClick}>Recover Password</button>
                </form>
            ) : showSignForm ? (
                <SignUpForm/>
            ) : (
                <RecoverPassword />
            )}
        </div>
    );
}