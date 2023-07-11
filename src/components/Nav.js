import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "/context/AuthContextComponent";

function Nav() {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <ul className="hamburger">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Create Campaign</Link>
        </li>
        <li>
          <Link to="/account">My Account</Link>
        </li>
        <li>
          <button onClick={handleSignOut}>Sign Out</button>
        </li>
      </ul>
      <div className="logo">
        <h3>Logo</h3>
      </div>
    </nav>
  );
}

export default Nav;
