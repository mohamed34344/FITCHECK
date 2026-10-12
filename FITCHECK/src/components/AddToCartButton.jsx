import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

function AddToCartButton({ product, quantity = 1, className = "btn btn-outline-primary", children }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock === 0;

  const handleClick = () => {
    if (outOfStock) return;
    dispatch(addToCart({ product, quantity }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button type="button" className={className} disabled={outOfStock} onClick={handleClick}>
      {added ? <><i className="bi bi-check-lg me-1"></i>Added</> : children || "Add to cart"}
    </button>
  );
}
export default AddToCartButton;
