import { Link } from "react-router-dom";
import "./footer.css"

function Footer (){

    return(
        <>
            <footer className="bg-light  py-5 mt-5 p-4" id="footer">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 mb-4">
                            <h5 className="footer-title">Quick Links</h5>
                            <ul className="list-unstyled mt-4">
                                <li className="mb-2"><Link to="/" className="footer-link">Home</Link></li>
                                <li className="mb-2"><Link to="/products" className="footer-link">Shop</Link></li>
                                <li className="mb-2"><Link to="/about" className="footer-link">About Us</Link></li>
                                <li className="mb-2"><a href="#footer" className="footer-link">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <h5 className="footer-title">Categories</h5>
                            <ul className="list-unstyled mt-4">
                                <li className="mb-2"><Link to="/products/category/men" className="footer-link">Men's Clothing</Link></li>
                                <li className="mb-2"><Link to="/products/category/women" className=" footer-link">Women's Clothing</Link></li>
                                <li className="mb-2"><Link to="/products/category/shoes" className="footer-link">Shoes</Link></li>
                                <li className="mb-2"><Link to="/products/category/watches" className="footer-link">Watches</Link></li>
                                <li className="mb-2"><Link to="/products/category/bags" className="footer-link">Bags</Link></li>
                                <li className="mb-2"><Link to="/products/category/accessories" className=" footer-link">Accessories</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4">
                            <h5 className="mb-4 footer-title">Contact Us</h5>
                            <p>info@fitcheck.com</p>
                            <p>+20 123 456 7890</p>
                            <p>Cairo, Egypt</p>
                            <div className="d-flex gap-3">
                                <a href="#" className="text-dark fs-5"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="text-dark fs-5"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="text-dark fs-5"><i className="bi bi-tiktok"></i></a>

                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="text-center">
                        <p className="mb-0">&copy; 2026 FITCHECK. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        
        </>
    )
}
export default Footer;