import { getProducts } from "../../api/api";
import {useEffect, useState} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { categoryMap, allowedCategories } from "../../utils/categories";

import ProductCard from "../../components/ProductCard/ProductCard";
import CategoriesBtns from "../../components/CategoriesBtns/CategoriesBtns";
import { selectWishlistIds } from "../../store/wishlistSlice";

function Products(){
    const {category}  = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const wishlistIds = useSelector(selectWishlistIds);

    const [products, setProducts] = useState([]);
    const [searchVal , setSearchVal] = useState(searchParams.get("search") || "");

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const wishOnly = searchParams.get("wishlist") === "1";
    
    const filteredProducts = category
    ? products.filter((product) =>
          categoryMap[category]?.includes(product.category)
      )
    : products;

    const wishFiltered = wishOnly
        ? filteredProducts.filter(product => wishlistIds.includes(product.id))
        : filteredProducts;


    const searchedProducts = wishFiltered.filter(product => product.title.toLowerCase().includes(searchVal.toLowerCase()));      
    
    const priceFilteredProduct = searchedProducts.filter(product => (!minPrice || product.price >= Number(minPrice)) && (!maxPrice || product.price <= Number(maxPrice)));

    console.log(products);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const totalPage = Math.ceil(priceFilteredProduct.length / productsPerPage);    

    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;

    const currentProducts = priceFilteredProduct.slice(firstProductIndex, lastProductIndex);
    const noProductFound = priceFilteredProduct.length === 0;

    const pages = [];
    for(let i=1; i <= totalPage; i++){
        pages.push(i);
    }    

    useEffect(() => {
        setCurrentPage(1);
    }, [searchVal]);

    useEffect(()=>{
        const getAllProducts = async ()=>{
            const data = await getProducts();
            const filteredProducts = data.filter((product) => allowedCategories.includes(product.category));

            setProducts(filteredProducts);
        }
        getAllProducts();
    }, []);

    console.log(searchVal);

    return(
        <>
        <div className="container py-5">
            <h2 className="text-center">
                Our Products
            </h2>
            <CategoriesBtns/>

            <div className="row p-3">
                <div className="col-md-6 col-12 p-3">
                    <input id="search-input" type="text" className="form-control rounded-pill shadow-sm px-4" 
                        placeholder="search by products name..." 
                        onChange={(e) => setSearchVal(e.target.value)}/>
                </div>
                
                <div className="col-md-6 col-12 p-3">
                    <div className="d-flex gap-2">
                        <div className="col-6">
                            <input type="number" className="form-control rounded-pill w-100" placeholder="Min Price" onChange={(e) => {setMinPrice(e.target.value)}}/>
                        </div>
                        <div className="col-6">
                            <input type="number" className="form-control rounded-pill w-100" placeholder="Max Price" onChange={(e) => {setMaxPrice(e.target.value)}}/>
                        </div>
                    </div>
                </div>
            </div>

            {noProductFound ? (
                <div className="text-center py-5">
                    <p className="text-danger fs-4">No products match your search</p>
                </div>
                ):(
                    <div className="row">
                        {currentProducts.map(product => (
                            <div className="col-12 col-lg-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center align-items-center" key={product.id}>
                                <ProductCard product={product}/>
                            </div>
                        ))}
                    </div>
            )}
            

            <div className="container d-flex justify-content-center align-items-center">
                {!noProductFound && (
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <button className="page-link" aria-label="Previous" onClick={() => {setCurrentPage(currentPage - 1)}} disabled={currentPage == 1}>
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>
                            {pages.map(page => (
                                <li className="page-item" key={page}>
                                    <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                                </li>
                            ))}
                            <li className="page-item">
                                <button className="page-link" href="#" aria-label="Next" onClick={() => {setCurrentPage(currentPage + 1)}} disabled={currentPage == totalPage}>
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
           
        </div>
        
        </>
    )
}

export default Products;