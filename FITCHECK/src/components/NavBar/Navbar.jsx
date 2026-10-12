import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount, setCartUser } from "../../store/cartSlice";
import { selectWishlistCount, setWishlistUser } from "../../store/wishlistSlice";
import {AuthContext} from "../../context/AuthContext";
import "./navBar.css";

function Navbar(){
    const cartCount = useSelector(selectCartCount);
    const wishCount = useSelector(selectWishlistCount);

    const {user, logout} = useContext(AuthContext);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setWishlistUser(user?.email || null));
        dispatch(setCartUser(user?.email || null));

    }, [user, dispatch]);
    
    console.log("navbar user:", user);
    
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const onSearch = (e) => {
        e.preventDefault();
        const q = query.trim();
        navigate(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
    };

    return(
        <div className="sticky-top">
            <nav className="navbar navbar-expand-lg bg-body-tertiary py-2 d-flex justify-content-center">
                <div className="container mx-2 mx-lg-5 d-flex align-items-center">
                    <a className="navbar-brand fw-bold" href="#">FITCHECK</a>
                    
                        <form className="d-flex w-50 mx-auto" onSubmit={onSearch} role="search">
                            <div className="input-group rounded-pill overflow-hidden border border-primary">
                                <input
                                    className="form-control border-0"
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search products ..."
                                    aria-label="Search products"
                                />
                                <button className="btn bg-primary" type="submit" aria-label="Search">
                                    <i className="bi bi-search text-white"></i>
                                </button>
                            </div>
                        </form>

                        <div className="d-flex align-items-center gap-2 me-2 mt-2">
                            <Link 
                                to="/products?wishlist=1" 
                                className="position-relative text-decoration-none text-dark me-3" 
                                aria-label={`Wishlist, ${wishCount} items`}
                            >
                                    <i className="bi bi-heart fs-4"></i>
                                    <span className="badge bg-primary position-absolute rounded-pill translate-middle">{wishCount}</span>
                            </Link>
                            <Link 
                                to="/cart" 
                                className="position-relative text-decoration-none text-dark" 
                                aria-label={`Cart, ${cartCount} items`}
                            >
                                    <i className="bi bi-cart-fill rounded-circle fs-4"></i>
                                    <span className="badge bg-primary position-absolute rounded-pill translate-middle">{cartCount}</span>
                            </Link>
                        </div>
                    
                </div>
            </nav>

            <nav className="navbar navbar-expand-lg bg-primary text-white shadow-sm d-flex justify-content-center py-1">
                <div className="container mx-2 mx-lg-5 text-white d-flex align-items-center">

                    <div className="nav-item dropdown list-unstyled">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Browse Category
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/products/category/men">Men 's Clothing</Link></li>
                            <li><Link className="dropdown-item" to="/products/category/women">Women 's Clothing</Link></li>
                            <li><Link className="dropdown-item" to="/products/category/shoes">Shoes</Link></li>
                            <li><Link className="dropdown-item" to="/products/category/watches">Watches</Link></li>
                            <li><Link className="dropdown-item" to="/products/category/bags">Bags</Link></li>
                            <li><Link className="dropdown-item" to="/products/category/accessories">Accessories</Link></li>
                        </ul>
                    </div>

                    <button 
                        className="navbar-toggler border-0 rounded-0 shadow-none" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon text-white"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-lg-0 mx-auto gap-2 py-1">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active text-light nav-hover px-2" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/products" className="nav-link text-light nav-hover px-2">shop</NavLink>
                            </li>
                            
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link text-light nav-hover px-2" aria-current="page">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/products/category/accessories" className="nav-link text-light nav-hover px-2" aria-current="page">Accessories</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/order-tracking" className="nav-link text-light nav-hover px-2" aria-current="page">Track Order</NavLink>
                            </li>
                            <li className="nav-item">
                                <a href="#footer" className="nav-link text-light nav-hover px-2" aria-current="page">Contact Us</a>
                            </li>
                            {(!user || !user.role || user.role.toLowerCase() === "customer") && (
                                <li className="nav-item">
                                    <NavLink to="/seller-register" className="nav-link text-light nav-hover px-2">
                                        Become a Seller
                                    </NavLink>
                                </li>
                            )}

                            {(user?.role?.toLowerCase() === "seller" || user?.role?.toLowerCase() === "admin") && (
                                <li className="nav-item">
                                    <NavLink to="/seller" className="nav-link text-light nav-hover px-2">
                                        Seller
                                    </NavLink>
                                </li>
                            )}

                            {user?.role?.toLowerCase() === "admin" && (
                                <li className="nav-item">
                                    <NavLink to="/admin" className="nav-link text-light nav-hover px-2">
                                        Admin
                                    </NavLink>
                                </li>
                            )}
                        </ul>


                        <div className="d-flex align-items-center gap-2 ms-auto">
                            {!user ? (
                                <Link to="/login" className="btn text-decoration-none" aria-label="Login">
                                    <i className="bi bi-box-arrow-in-right text-light fs-4"></i>
                                </Link>  ) : (
                                <>
                                    <Link to="/profile" className="text-decoration-none" aria-label="Profile">
                                        {localStorage.getItem(`user_${user.email.toLowerCase()}_img`) ? 
                                            (
                                                <img
                                                    src={localStorage.getItem(`user_${user.email.toLowerCase()}_img`)}
                                                    alt="Profile"
                                                    className="rounded-circle"
                                                    style={{
                                                        width: "38px",
                                                        height: "38px",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                                    style={{
                                                        width: "38px",
                                                        height: "38px",
                                                    }}
                                                >
                                                    {user.name ? user.name.charAt(0).toUpperCase(): "U"}
                                                </div>
                                            )
                                        }
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn p-0 border-0"
                                        onClick={() => {
                                            logout();
                                            navigate("/login");
                                        }}
                                        aria-label="Logout"
                                        title="Logout"
                                    >
                                        <i className="bi bi-box-arrow-right text-light ms-3 fs-4"></i>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;