import "./Home.css";
import HomeCarousel from "./HomeCarousel";
import CategoriesBtns from "../../components/CategoriesBtns/CategoriesBtns";
import FeaturedProduct from "../../components/FeaturedProducts";
import ChatBot from "../../components/ChatBot/ChatBot";



function Home(){
    return(
        <>
             <HomeCarousel/>

            <CategoriesBtns/>     
            <FeaturedProduct/>
            <ChatBot/>
        </>
    )
}
export default Home;