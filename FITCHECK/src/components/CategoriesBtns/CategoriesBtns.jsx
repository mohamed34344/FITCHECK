import { Link } from "react-router-dom";
import "./categoriesBtns.css";

function CategoriesBtns() {
    return (
        <div className="container text-center py-5">
            <h4 className="mb-4">Shop By Category</h4>

            <div className="row g-3 category-btns">
                <div className="col-6 col-md-4 col-lg">
                    <Link to="/products" className="btn btn-outline-primary w-100 category-btn">
                        All
                    </Link>
                </div>

                <div className="col-6 col-md-4 col-lg">
                    <Link to="/products/category/men" className="btn btn-outline-primary w-100 category-btn">
                        Men's fit
                    </Link>
                </div>

                <div className="col-6 col-md-4 col-lg">
                    <Link to="/products/category/women" className="btn btn-outline-primary w-100 category-btn">
                        Women's fit
                    </Link>
                </div>

                <div className="col-6 col-md-4 col-lg">
                    <Link to="/products/category/shoes" className="btn btn-outline-primary w-100 category-btn">
                        Shoes
                    </Link>
                </div>

                <div className="col-6 col-md-4 col-lg">
                    <Link to="/products/category/watches" className="btn btn-outline-primary w-100 category-btn">
                        Watches
                    </Link>
                </div>

                <div className="col-6 col-md-4 col-lg">
                    <Link to="/products/category/bags" className="btn btn-outline-primary w-100 category-btn">
                        Bags
                    </Link>
                </div>

                <div className="col-6 col-md-4 col-lg offset-3 offset-md-4 offset-lg-0">
                    <Link to="/products/category/accessories" className="btn btn-outline-primary w-100 category-btn">
                        Accessories
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CategoriesBtns;