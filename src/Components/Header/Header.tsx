import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store";
import {useNavigate} from "react-router-dom";
import {loginActions} from "../../Store/login-slice.ts";
import classes from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {FetchedTable} from "../../types/FetchedTables.ts";

export default function Header() {
    const username = useSelector((state: RootState) => state.log.userName);
    const loggedIn = useSelector((state:RootState) => !!state.log.userName)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tables, setTables] = useState<FetchedTable[]>([]);

    useEffect(() => {
        const fetchTablesData = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/`);
                // const results = response.data.results;
                const linksArray = Object.entries(response.data).map(([key, value]) => ({
                    name: key,
                    url: value as string
                }));
                setTables(linksArray)
            } catch (err) {
                console.log(err);
            } finally {
                console.log('finally');
            }
        }

        fetchTablesData();
    }, []);

    const onButtonClick = () => {
        if(loggedIn){
            dispatch(loginActions.logout());
            localStorage.removeItem('username');
            navigate('/');
        } else{
            navigate('/login');
        }
    }
    return (<header className={loggedIn ? classes.logged : ''}>
        <nav className={classes.headerNavigation}>
            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({isActive}) => (isActive ? classes.active : undefined)}
                    >
                        Home
                    </NavLink>
                </li>
                {tables.length && (tables.map((table: FetchedTable) => <li key={table.url}>
                    <NavLink
                             to={`/table/${table.name}`}
                             className={({isActive}) => (isActive ? classes.active : undefined)}
                    >
                        {table.name}
                    </NavLink>
                </li>))}

            </ul>
        </nav>
        {username && <p className={classes.userText}>Hi, <strong>{username}</strong>, welcome to our website!</p>}
        <input
            className={loggedIn ? classes.logged : classes.unlogged}
            type="button"
            onClick={onButtonClick}
            value={loggedIn ? 'Log out' : 'Log in'}
        />
    </header>)
}