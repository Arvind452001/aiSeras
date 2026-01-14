import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import img1 from "../assets/assets/img/logo/logo.png"

const Header1 = () => {
  const navigate = useNavigate()

  // 🔹 state
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)

  // 🔹 ref for outside click
  const popupRef = useRef(null)

  // 🔹 close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogoutPopup(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // 🔹 logout logic
  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setShowLogoutPopup(false)
    navigate("/signin")
  }

  return (
    <div>
      {/* ================= HEADER ================= */}
      <section className="header-section">
        <div className="header-testting-wrap">
          <header className="header">
            <div className="container-fluid">
              <div className="header-testting-inner d-flex align-items-center justify-content-between">

                {/* Logo */}
                <div className="header-item item-left">
                  <Link to="/landing" className="logo d-xl-block">
                    <img src={img1} alt="logo" style={{ width: 150 }} />
                  </Link>
                </div>

                {/* Right Side */}
                <div className="header-item item-righ d-flex align-items-center">
                  <div
                    className="menu__components position-relative"
                    ref={popupRef}
                  >
                    {/* PROFILE CARD */}
                    <div
                      className="d-flex gap-3 p-2 align-items-center"
                      style={{
                        border: "1px solid #3E70A1",
                        borderRadius: 10,
                        cursor: "pointer",
                      }}
                      onClick={() => setShowLogoutPopup(prev => !prev)}
                    >
                      <img
                        src="https://www.bootdey.com/img/Content/avatar/avatar2.png"
                        alt="avatar"
                        style={{ width: 40, borderRadius: "100%" }}
                      />
                      <div>
                        <span style={{ fontSize: 14, color:"#ba185e" }}>Richard Jhons</span>
                        <br />
                        <span style={{ fontSize: 14 }}>
                          <strong style={{ color: "#C30EFF" }}>
                            Credit:
                          </strong>{" "}
                          $125
                        </span>
                      </div>
                    </div>

                    {/* LOGOUT POPUP */}
                    {showLogoutPopup && (
                      <div
                        style={{
                          position: "absolute",
                          top: "110%",
                          right: 0,
                          background: "#111",
                          borderRadius: 8,
                          minWidth: 160,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                          zIndex: 9999,
                        }}
                      >
                        <Link
                          to="/profile"
                          className="d-block px-3 py-2 text-white"
                          style={{ textDecoration: "none" }}
                          onClick={() => setShowLogoutPopup(false)}
                        >
                          Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-100 text-start px-3 py-2"
                          style={{
                            background: "none",
                            border: "none",
                            color: "#ff4d4f",
                            cursor: "pointer",
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </header>
        </div>
      </section>
    </div>
  )
}

export default Header1
