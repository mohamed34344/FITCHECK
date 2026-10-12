import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductById } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist, selectWishlistIds } from "../../store/wishlistSlice";
import AddToCartButton from "../../components/AddToCartButton";

function ProductDetails() {
    const {id} = useParams();
    
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    const wished = useSelector(selectWishlistIds).includes(product?.id);

    const [selectedImg, setSelectedImg] = useState(0);
    
    useEffect(()=>{
        const getProduct = async () => {
            const data = await getProductById(id);
            setProduct(data);
        };
        getProduct();
    }, [id]);

    if(!product){
        return <h2 className="text-center">Loading...</h2>;
    }

    const rating = Math.round(product.rating);

    return(
        <div className="container py-5">
            <div className="card border-0 shadow p-4 position-relative"
                style={{
                    maxWidth: "1000px",
                    margin: "0 auto",
                    borderRadius: "20px"
                }}
            >
                <button 
                    type="button" 
                    className={`btn bi ${wished ? "bi bi-heart-fill text-danger" : "bi bi-heart"} fs-3 position-absolute top-0 end-0 m-3`}
                    style={{ zIndex: 2 }} 
                    onClick={() => dispatch(toggleWishlist(product.id))}
                >
                </button>

                <div className="row g-5 align-items-center">
                    {/* Product Image */}
                    <div className="col-md-5">
                        <div
                            className="row d-flex justify-content-center align-items-center bg-light"
                            style={{
                                height: "400px",
                                borderRadius: "15px"
                            }}
                        >
                            <img
                                src={product.images[selectedImg]}
                                alt={product.title}
                                className="img-fluid"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    padding: "25px"
                                }}
                            />
                        </div>
                        <div className="row d-flex justify-content-center align-items-center mt-3">
                                {product.images.map((img, index) => (
                                    <img 
                                    key={index}
                                    src={img}
                                    onClick={() => setSelectedImg(index)}
                                    className={`img-thumbnail ${
                                        selectedImg === index ? "border-2 border-primary" : ""
                                    }`}
                                    style={{
                                        width: "70px", 
                                        height: "70px",
                                        objectFit: "contain",
                                        cursor: "pointer"
                                    }}/>
                                ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="col-md-7">
                        <small className="text-muted">{product.category}</small>
                        <h2 className="fw-bold mt-2">{product.title} </h2>
                        <p className="text-muted my-4">{product.description}</p>
                        {/* Rating */}
                        <div className="mb-4">
                            {[1, 2, 3, 4, 5].map((star)=>(
                                <i key={star} className={`bi fs-4 me-1 ${star <= rating ? "bi-star-fill text-warning" : "bi-star text-secondary"}`}></i>
                            ))}

                            <span className="ms-2 text-muted">
                                {product.rating}
                               
                            </span>
                        </div>
                         <div className="mb-3">
                            <div className="d-flex align-items-center gap-3">
                                <span className="text-muted text-decoration-line-through">${product.price} </span>
                                <h3 className="fw-bold d-inline m-2">
                                    ${(
                                        product.price - (product.price * product.discountPercentage) / 100
                                    ).toFixed(2)}
                                </h3>
                            </div>
                            <span className="badge bg-danger mt-2">{product.discountPercentage}% OFF</span>
                        </div>   
                        
                        <span className={`badge ${product.stock > 0 ? "bg-success": "bg-danger"}`}>
                            {product.stock > 0
                                ? "In Stock"
                                : "Out of Stock"}
                        </span>

                        <div className="mt-4 d-flex align-items-center gap-3">
                            <div className="input-group" style={{width: "130px"}}>
                                <button 
                                    className="btn btn-outline-secondary" 
                                    disabled={qty <= 1} 
                                    onClick={() => setQty(qty - 1)}><i className="bi bi-dash"></i>
                                </button>
                                <span className="form-control text-center">{qty}</span>
                                <button 
                                    className="btn btn-outline-secondary" 
                                    disabled={qty >= product.stock} 
                                    onClick={() => setQty(qty + 1)}><i className="bi bi-plus"></i>
                                </button>
                            </div>
                            <AddToCartButton product={product} quantity={qty} className="btn btn-primary px-4 py-2">
                                <i className="bi bi-cart-plus me-2"></i>Add to Cart
                            </AddToCartButton>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container mt-3">
                <h3 className="my-4 fw-bold text-center">Customer Reviews</h3>
                <div className="row g-4 d-flex justify-content-center align-items-center">
                    {product.reviews.map((review, index) => {
                        const reviewRating = Math.round(review.rating);
                        return(
                            <div className="col-10 col-md-6 col-lg-4" key={index}>
                                <div 
                                className="card border-0 shadow-sm p-4 review-card"
                                style={{ animationDelay: `${index * 0.15}s` }}>
                                    <div className="">
                                        <h5 className="fw-bold mb-0">
                                            {review.reviewerName}
                                        </h5>
                                        <div>
                                            {[1, 2, 3, 4, 5].map((star)=>(
                                                <i key={star} className={`bi fs-4 me-1 ${star <= reviewRating ? "bi-star-fill text-warning" : "bi-star text-secondary"}`}></i>
                                            ))}
                                            <span className="ms-2 text-muted">
                                                {review.rating}
                                            </span>
                                        </div>
                                    </div>
                                    <small className="text-muted mb-3">
                                        {review.reviewerEmail}
                                    </small>
                                    <p className="mb-3">
                                        {review.comment}
                                    </p>
                                    <small className="text-muted mt-auto">
                                            {review.date}
                                    </small>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
    
}
export default ProductDetails;