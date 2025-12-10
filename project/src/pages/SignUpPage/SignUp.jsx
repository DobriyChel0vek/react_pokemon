import React, {useState} from 'react';
import Authorization from '../AuthorizationPage/Authorization';

export function SignUpForm({onLogin}) { 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        privacyPolicy: false
    });

    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [showLoginForm, setShowLoginForm] = useState(false); 

    const handleChange = (e) => {
        const {name, type, checked, value} = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setSubmitted(false);
        setPasswordMatch(true);

        if (formData.name === '' || formData.email === '' || formData.password === '' || formData.confirmPassword === '') {
            setError(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch(false);
            return;
        }

        setSubmitted(true);
        console.log("Form Data Submitted:", formData);
    };

    const successMessage = () => {
        return (
            <div className='success' style={{display: submitted ? '' : 'none'}}>
                <h1>Successfully signed up!!!</h1>
            </div>
        );
    };

    const handleLoginClick = () => {
        setShowLoginForm(true); // Show the login form
    };

    return (
        <div className='form-container'>
            <div className='messages'>
                {successMessage()}
            </div>

            {!showLoginForm ? (
                <form className='form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your name"
                        className='input'
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                    />
                    {error && !formData.name && <span className="error">*Please enter your name</span>}

                    <input
                        type="email"
                        placeholder="Email address"
                        className='input'
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                    {error && !formData.email && <span className="error">*Please enter your email</span>}

                    <input
                        type="password"
                        placeholder="Password"
                        className='input'
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                    {error && !formData.password &&
                        <span className="error">*Please enter your password</span>}

                    <input
                        type="password"
                        placeholder="Confirm password"
                        className='input'
                        name="confirmPassword"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                    />
                    {error && !formData.confirmPassword &&
                        <span className="error">*Please confirm your password</span>}

                    {!passwordMatch && <span className="error">Passwords do not match!</span>}

                    <div className='marketing'>
                        <input
                            id="allowEmail"
                            type="checkbox"
                            name="privacyPolicy"
                            checked={formData.privacyPolicy}
                            onChange={handleChange}
                        />
                        <label htmlFor="allowEmail">I have read the privacy policy</label>
                        <br />
                        {error && !formData.privacyPolicy &&
                            <span className="error">*Please check privacy policy</span>}
                    </div>

                    <button className='submit' type="submit">Sign Up</button>
                    <button className='submit' type="button" onClick={handleLoginClick}>Login</button>
                    {/* Button to show the login form */}
                </form>
            ) : (
                <Authorization/> /* Render the login form */
            )}
        </div>
    );
}
