import { Link } from 'react-router-dom';
import routes from "../../constants/routes";

export default function Footer() {
    return (
        <footer>    
            <p className="center big color-gray">Remindii <span id="year">2022</span> - All Rights Reserved &copy;</p>
            <div className="footer-buttons">
                <Link to={routes.privacy_policy}>Polityka Prywatności</Link>
            </div>
        </footer>
    )
}