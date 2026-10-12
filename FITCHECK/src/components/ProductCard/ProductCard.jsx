import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddToCartButton from "../AddToCartButton";
import { toggleWishlist, selectWishlistIds } from "../../store/wishlistSlice";
import "./productCard.css"

function ProductCard({product, showRating = false}){

    const dispatch = useDispatch();
    const wished = useSelector(selectWishlistIds).includes(product.id);
    const inStock = product.stock > 0;
    const rating = Math.round(product.rating);

    return(
        <div className="card shadow-sm" style={{width: "17rem", height: showRating ?  "480px" : "450px"}}>
            
            <img src={product.images[0]} 
                className="card-img-top position-relative" 
                alt={product.name}
                style={{height: "220px", objectFit: "contain", zIndex: 1}}
            />
            <button
                type="button"
                className={`btn bi ${ wished ? "bi-heart-fill text-danger" : "bi-heart"} fs-3 position-absolute top-0 end-0`}
                style={{ zIndex: 2 }}
                onClick={() => dispatch(toggleWishlist(product.id))}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wished}
            ></button>

            <div className="card-body d-flex flex-column text-start p-3">
                <h5 
                    className="card-title overflow-hidden"
                    style={{height: "48px"}}
                >
                    {product.title}
                </h5>
                <p className="card-text text-muted small overflow-hidden" style={{height: "40px"}}>{`${product.description}...`}</p>
                {showRating&&
                    <div 
                        className="mb-1"
                        style={{height: "32px"}}
                    >
                        {[1, 2, 3, 4, 5].map((star)=>(
                            <i key={star} className={`bi fs-5 me-1 ${star <= rating ? "bi-star-fill text-warning" : "bi-star text-secondary"}`}></i>
                        ))}
                        <span className="ms-2 text-muted">
                            {product.rating}
                        </span>
                    </div>
                }

                <div className="d-flex justify-content-between align-items-center mb-2 mt-auto">
                    <span className="card-text text-primary fw-bold fs-5">${product.price}</span>
                    <span className={`badge ${inStock ? "bg-success small" : "bg-danger small"}`}>{inStock ? "In stock" : "Out of stock"}</span>
                </div>

                <div className="d-flex gap-2 justify-content-between">
                    <Link to={`/products/${product.id}`} className="btn btn-outline-primary">view details</Link>
                    <AddToCartButton product={product} className="btn btn-primary flex-fill" disabled={product.quantity === 0}>Add to cart</AddToCartButton>
                </div>

            </div>
        </div>
    )
}

export default ProductCard;