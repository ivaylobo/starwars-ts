import classes from "./LoginPage.module.css";
import {ChangeEvent, useRef, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {loginActions} from "../../Store/login-slice.ts";
import {useDispatch} from "react-redux";

const LoginPage = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const dispatch = useDispatch();
    const loginButtonRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const validateForm = () => {
        let usernameError = '';
        let passwordError = '';
        let isValid = true;

        if (username.length < 4 || username.length > 30) {
            usernameError = 'Username must be between 4 and 30 characters.';
            isValid = false;
        }

        if (password.length < 4 || password.length > 30) {
            passwordError = 'Password must be between 4 and 30 characters.';
            isValid = false;
        }

        setUsernameError(usernameError);
        setPasswordError(passwordError);
        setIsFormValid(isValid);
    };

    const handleUsernameChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setUsername(ev.target!.value);
    };

    const handlePasswordChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setPassword(ev.target.value);
    };

    useEffect(() => {
        validateForm();
    }, [username, password]);


    // Control button disabled state based on form validity
    useEffect(() => {
        if (loginButtonRef.current) {
            loginButtonRef.current.disabled = !isFormValid;
        }
    }, [isFormValid]);

    const onButtonClick = () => {
        if (isFormValid) {
            dispatch(loginActions.login(username));
            localStorage.setItem('username', username);
            navigate('/table/people');
        }
    };


    return (<div className={classes.mainContainer}>
        <div className={classes.titleContainer}>
            <div>Login</div>
        </div>
        <br/>
        <div className={classes.inputContainer}>
            <input
                value={username}
                placeholder="Username"
                onChange={handleUsernameChange}
                className={classes.inputBox}
            />
            {username && <label className={classes.errorLabel}>{usernameError}</label>}
        </div>
        <div className={classes.inputContainer}>
            <input
                value={password}
                placeholder="Password"
                type="password"
                onChange={handlePasswordChange}
                className={classes.inputBox}
            />
            {password && <label className={classes.errorLabel}>{passwordError}</label>}
        </div>
        <div className={classes.inputContainer}>
            <input
                className="inputButton"
                type="button"
                ref={loginButtonRef}
                onClick={onButtonClick}
                value="Log in"
            />
        </div>
    </div>)
}

export default LoginPage