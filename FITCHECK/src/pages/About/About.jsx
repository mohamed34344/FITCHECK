import { Link } from "react-router-dom";
import photo from "../../assets/aboutSec01.avif";
import photo02 from "../../assets/aboutSec0102.avif"
import "./About.css"
function About(){
    return(
        <>
            <div className="section-1 d-flex align-items-center p-3 p-md-5">
                <div className="container">
                    <div className="row align-items-center g-5">

                        <div className="col-12 col-md-6 section-1-content">
                            <span className="d-inline-block small mb-3">
                                ABOUT FITCHECK
                            </span>
                            <h1 className="mb-3 fw-bold display-3">
                                ABOUT US
                            </h1>
                            <p className="mb-3 fs-5 fw-semibold">
                                Style is more than what you wear - it's how you express yourself
                            </p>
                            <p className="lh-lg mb-4">
                                FITCHECK is a modern fashion destination created for those who
                                want to look good, feel confident, and express their unique style.
                            </p>
                            <Link
                                to="/products"
                                className="btn btn-primary explore-btn px-4 py-2"
                            >
                                Explore Our Collection
                                <i className="bi bi-arrow-right ms-2"></i>
                            </Link>
                        </div>

                        <div className="col-12 col-md-6 text-center section-1-image">
                            <img
                                src={photo}
                                alt="FITCHECK Fashion"
                                className="img-fluid rounded"
                            />
                        </div>

                    </div>
                </div>
            </div>
                
            <div className="section-2 container-fluid py-5 px-4 px-md-5">
                <div className="row align-items-center g-5">
                    <div className="col-12 col-md-6">
                        <div className="story-image rounded-3 overflow-hidden">
                            <img src={photo02} alt="" className="img-fluid w-100" style={{objectFit: "cover", height: "500px"}}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="story-content">
                            <span className="small text-success fw-semibold">OUR STORY</span>
                            <h2 className="fw-bold my-4 display-5">Fashion Should Feel Personal.</h2>
                            <p className="text-secondary lh-lg">
                                FITCHECK was built around a simple idea:
                                fashion should feel personal.
                            </p>
                            <p className="text-secondary lh-lg">
                                We bring together modern styles, everyday essentials,
                                and statement pieces to help you find something
                                that feels like you.
                            </p>
                            <p className="text-secondary lh-lg">
                                From timeless basics to trend-inspired looks,
                                FITCHECK makes it easier to discover your next
                                favorite fit.
                            </p>
                            <div className="border border-success text-success rounded-pill px-4 py-2
                            mt-3 small fw-semibold d-inline-block">
                                DISCOVER · STYLE · FIT
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-3 container py-5 px-5">
                <div className="text-center mb-5">
                    <span className=" text-success fw-semibold small">WHAT WE BELIEVE IN</span>
                    <h2 className="fw-bold display-5 my-3">OUR VALUES</h2>
                    <p className="text-secondary">What makes FITCHECK different.</p>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">

                    <div className="col">
                        <div className="card text-center rounded-3 shadow-sm p-3">
                            <i className="bi bi-gem fs-1 mb-3 d-block"></i>
                            <h4 className="fw-bold mb-3">Quality</h4>
                            <p className="lh-lg mb-0">We believe great style starts with quality pieces made to last.</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-center rounded-3 shadow-sm p-3">
                            <i className="bi bi-stars fs-1 mb-3 d-block"></i>
                            <h4 className="fw-bold mb-3">Style</h4>
                            <p className="lh-lg mb-0">We bring you modern looks that help you express your personality.</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-center rounded-3 shadow-sm p-3">
                            <i className="bi bi-heart fs-1 mb-3 d-block"></i>
                            <h4 className="fw-bold mb-3">Comfort</h4>
                            <p className="lh-lg mb-0">Looking good should always feel good. Comfort comes first.</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-center rounded-3 shadow-sm p-3">
                            <i className="bi bi-lightning-charge fs-1 mb-3 d-block"></i>
                            <h4 className="fw-bold mb-3">Confidence</h4>
                            <p className="lh-lg mb-0">Wear what makes you feel confident and unapologetically you.</p>
                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}
export default About;