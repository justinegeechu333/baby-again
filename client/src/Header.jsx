import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import juju from "./assets/juju_face.png";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const onLogout = () => {
        setUser({});
        navigate("/home");
    };
    return (
        <nav>
            <img src={juju} alt="alt" className="logo" />
            <div className="gap"> BabyAgain</div>
            <ul className="navigate">
                <li>
                    <NavLink to={user?.isAdmin ? "/admin/home" : "/home"}>
                        {user?.isAdmin ? "Admin Home" : "Home"}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/baby_products">Baby Products</NavLink>
                </li>
                {user?.name ? (
                    <>
                        <li>
                            <a href="#" onClick={onLogout}>
                                Log Out
                            </a>
                        </li>
                        {!user.isAdmin && (
                            <li>
                                <NavLink to="/profile">Profile</NavLink>
                            </li>
                        )}
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin">Admin</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Header;
