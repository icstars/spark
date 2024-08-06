import { Link } from 'react-router-dom';
import '/Users/ValeriiKharchenko/Documents/icstars/spark/src/css/style.css';

function NavMenu() {
    return (


        <nav className="main-nav">
            <ul className="main-nav-ul">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/DepMetrics">Department metrics</Link></li>
                {/* <li><Link to ="/"></Link></li> */}
            </ul>
        </nav>

    );
}

export default NavMenu;
