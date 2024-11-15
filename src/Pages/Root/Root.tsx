import {Outlet} from "react-router-dom";
import Header from "../../Components/Header/Header.tsx";

function RootLayout () {
    return(<>
        <Header />
        <main>
            <Outlet  />
        </main>
    </>)
}

export default RootLayout