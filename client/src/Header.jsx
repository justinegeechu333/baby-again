import { NavLink } from "react-router-dom";
import "./Header.css";
import juju from "./assets/juju_face.png";

const Header = () => {
    return (
        <nav>
            <img src={juju} alt="alt" className="logo" />
            <div className="gap"> BabyAgain</div>
            <ul className="navigate">
                <li>
                    <NavLink to="/home">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/baby_products">Baby Products</NavLink>
                </li>
                <li>
                    <NavLink to="/how_it_works">How It Works</NavLink>
                </li>
                <li>
                    <NavLink to="/trust_and_safety">Trust & Safety</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/admin">Admin</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
