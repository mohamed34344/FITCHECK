function BannerManagement({
    banners,
    editBannerId,
    setEditBannerId,
    bannerTitle,
    setBannerTitle,
    bannerSubtitle,
    setBannerSubtitle,
    bannerImage,
    setBannerImage,
    handleSaveBanner,
    handleEditBannerClick,
    handleDeleteBanner,
}) {
    return (
        <div className="row g-4">
            <div className="col-12 col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                    <h5 className="fw-bold mb-3">
                        {editBannerId !== null
                            ? "Edit Homepage Banner"
                            : "Add Homepage Banner"}
                    </h5>

                    <form onSubmit={handleSaveBanner}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Banner Title *
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. Summer Sale 50% Off"
                                value={bannerTitle}
                                onChange={(e) =>
                                    setBannerTitle(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Subtitle
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Short description..."
                                value={bannerSubtitle}
                                onChange={(e) =>
                                    setBannerSubtitle(e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">
                                Image URL
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="https://..."
                                value={bannerImage}
                                onChange={(e) =>
                                    setBannerImage(e.target.value)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            {editBannerId !== null
                                ? "Update Banner"
                                : "Add Banner"}
                        </button>

                        {editBannerId !== null && (
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100 mt-2"
                                onClick={() => {
                                    setEditBannerId(null);
                                    setBannerTitle("");
                                    setBannerSubtitle("");
                                    setBannerImage("");
                                }}
                            >
                                Cancel Edit
                            </button>
                        )}
                    </form>
                </div>
            </div>

            <div className="col-12 col-lg-8">
                <div className="card border-0 shadow-sm rounded-4 p-4">
                    <h5 className="fw-bold mb-3">
                        Active Homepage Banners ({banners.length})
                    </h5>

                    <div className="row g-3">
                        {banners.map((b) => (
                            <div key={b.id} className="col-12">
                                <div className="border rounded-4 p-3 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <img
                                            src={b.image}
                                            alt={b.title}
                                            style={{
                                                width: "65px",
                                                height: "65px",
                                                objectFit: "contain",
                                                flexShrink: 0,
                                            }}
                                            className="border rounded p-1 bg-white"
                                        />

                                        <div>
                                            <h6 className="fw-bold text-primary mb-1">
                                                {b.title}
                                            </h6>

                                            <p className="small text-muted mb-0">
                                                {b.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2 align-self-end align-self-sm-center">
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() =>
                                                handleEditBannerClick(b)
                                            }
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>

                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() =>
                                                handleDeleteBanner(b.id)
                                            }
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerManagement;