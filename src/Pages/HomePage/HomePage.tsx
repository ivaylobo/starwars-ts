import classes from './Home.module.css'
import {useSelector} from "react-redux";
import Solder from '../../assets/solder.png'
import SolderLogged from '../../assets/solder-logged.png'
import {RootState} from "../../Store";

const HomePage = () => {

    const loggedIn = useSelector((state:RootState) => !!state.log.userName);


    return (
        <div className={classes.mainContainer}>
            <h2 className={classes.titleContainer}>
                {loggedIn ? 'Welcome to the dark side!' : 'Join the dark side!'}
            </h2>
            <div className={classes.imgSolder}>
                <img src={loggedIn ? SolderLogged : Solder} alt="solder"/>
            </div>
            <div className={classes.buttonContainer}>
                {loggedIn ? <div> Thank you for visiting our website!</div> : <div>If you want to see all Star Wars characters, login to our website! </div>}
            </div>
        </div>
    )
}

export default HomePage