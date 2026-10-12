import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sliderData } from "./sliderData";
import "./Home.css";

function HomeCarousel() {
    const [banners, setBanners] = useState(sliderData);

    useEffect(() => {
        const savedBanners = localStorage.getItem("fitcheck_home_banners");

        if (savedBanners) {
            try {
                const parsedBanners = JSON.parse(savedBanners);

                if (Array.isArray(parsedBanners) && parsedBanners.length > 0) {
                    const updatedBanners = sliderData.map((defaultBanner, index) => {
                        const adminBanner = parsedBanners[index];

                        if (!adminBanner) {
                            return defaultBanner;
                        }

                        return {
                            ...defaultBanner,
                            title: adminBanner.title || defaultBanner.title,
                            text: adminBanner.subtitle || defaultBanner.text,
                            image: adminBanner.image || defaultBanner.image,
                            alt: adminBanner.title || defaultBanner.alt,
                        };
                    });

                    setBanners(updatedBanners);
                }
            } catch {
                setBanners(sliderData);
            }
        }
    }, []);

    return (
        <section className="bg-light home-carousel-section">
            <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                <div className="carousel-indicators">
                    {banners.map((item, index) => (
                        <button
                            key={item.id || index}
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to={index}
                            className={`bg-dark ${index === 0 ? "active" : ""}`}
                            aria-current={index === 0 ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>

                <div className="carousel-inner">
                    {banners.map((item, index) => (
                        <div
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                            key={item.id || index}
                        >
                            <div className="container d-flex justify-content-center align-items-center py-4 py-md-5">
                                <div className="row justify-content-center align-items-center g-4 carousel-content">

                                    <div className="col-12 col-md-6 text-start carousel-text">
                                        <h1 className="text-primary fw-semibold display-5 mb-3">
                                            {item.title}
                                        </h1>

                                        <p className="text-dark mb-4">
                                            {item.text}
                                        </p>

                                        <Link
                                            to="/products"
                                            className="btn btn-primary"
                                        >
                                            Shop Now
                                        </Link>
                                    </div>

                                    <div className="col-12 col-md-6 text-center carousel-image">
                                        <img
                                            src={item.image}
                                            alt={item.alt}
                                            className="img-fluid"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HomeCarousel;