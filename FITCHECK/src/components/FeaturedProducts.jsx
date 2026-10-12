import {getProducts} from '../api/api'
import {useEffect, useState} from 'react'
import ProductCard from './ProductCard/ProductCard';
import { allowedCategories } from "../../src/utils/categories";

function FeaturedProduct(){
    const [products, setProducts] = useState([]);

    const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

    useEffect(()=>{
        const getFeaturedProducts = async () => {
            const data = await getProducts();

            const filteredProducts = data.filter(product => allowedCategories.includes(product.category));

            setProducts(filteredProducts);
        }
        getFeaturedProducts();
    }, []);


    console.log(products);
    return(

        <div className="container text-center my-4">
            <h2 className="mb-4">Featured Products</h2>
            <div className="row">
                {topRated.map(product => (
                    <div className="col-lg-3 col-sm-6 col-12 d-flex justify-content-center align-items-center mb-3" key={product.id}>
                        <ProductCard product={product} showRating={true}/>
                    </div>
                ))}
            </div>
        </div>
        
    )
}
export default FeaturedProduct;

