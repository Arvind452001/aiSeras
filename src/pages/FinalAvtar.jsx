"use client";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const FinalAvtar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔹 Check login from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // 🔹 Avatar image logic
  useEffect(() => {
    const fromState = location?.state?.imageUrl;
    const createdFromStorage =
      localStorage.getItem("createdAvatarImageUrl") || "";
    const uploadedFromStorage = localStorage.getItem("uploadedImageUrl") || "";
    setImageUrl(fromState || createdFromStorage || uploadedFromStorage || "");
  }, [location]);

  const avatarId = String(
    location?.state?.avatarId ?? localStorage.getItem("createdAvatarId") ?? ""
  );

  return (
    <div>
      {/* ================= HEADER ================= */}
      <section className="header-section">
        <header className="header">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between">
              {/* Logo */}
              <div>
                <Link to="/">
                  <img
                    src="/src/assets/assets/img/logo/logo.png"
                    alt="logo"
                    style={{ width: 150 }}
                  />
                </Link>
              </div>

              {/* Menu */}
              <ul className="menu-main d-flex gap-4 mt-3">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
              </ul>

              {/* Right Buttons */}
              <div className="d-flex align-items-center gap-3">
                {isLoggedIn ? (
                  <>
                    {/* <Link to="/account" className="cmn--btn">
                      <span>Account</span>
                    </Link> */}
                    <button
                      style={{
                        padding: "4px 10px",
                        borderRadius: "12px", // 👈 rounded working
                        backgroundColor: "#EE4B2B",
                        color: "#000",
                      }}
                      onClick={() => {
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        navigate("/signin");
                      }}
                    >
                      LogOut
                    </button>
                  </>
                ) : (
                  <Link
                    to="/signup"
                    style={{
                      padding: "4px 10px",
                      backgroundColor: "#3388ff",
                      borderRadius: "12px",
                      color: "#000",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#22c55e")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#3388ff")
                    }
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>
      </section>

      {/* ================= BODY ================= */}
      <section className="pt-120 pb-120">
        <div className="container text-center">
          <h1>Your Avatar Final Look</h1>
          <p>This is how you look</p>

          {avatarId && <p>Avatar ID: {avatarId}</p>}

          <div className="d-flex justify-content-center my-4">
            <img
              src={imageUrl || "/placeholder.jpg"}
              alt="Avatar"
              style={{
                maxWidth: 400,
                width: "100%",
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          <Link
            to="/chat"
            state={{ avatarId, avatarImageUrl: imageUrl }}
            className="btn btn-primary mb-3 w-25"
          >
            Next
          </Link>

          <br />

          <button
            className="btn btn-outline-light w-25"
            onClick={() => navigate("/customize")}
          >
            Edit
          </button>

          {!imageUrl && (
            <p style={{ color: "#ffb4b4", marginTop: 10 }}>
              No uploaded image found. Please upload one.
            </p>
          )}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer__section">
        <div className="container text-center">
          <p>© 2025 Aiseras. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FinalAvtar;
