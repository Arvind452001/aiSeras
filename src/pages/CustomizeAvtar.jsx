


// "use client"

// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import logo from "../assets/assets/img/logo/logo.png"
// import { uploadUserImage, createUserAvatar } from "../utils/mediaApi"

// const CustomizeAvtar = () => {
//   const navigate = useNavigate()
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [previewUrl, setPreviewUrl] = useState("")
//   const [uploading, setUploading] = useState(false)
//   const [error, setError] = useState("")

//   async function handleUpload() {
//     try {
//       setError("")
//       if (!selectedFile) {
//         setError("Please select an image first.")
//         return
//       }
//       setUploading(true)

//       // 1) upload image (user_id=2)
//       const uploadRes = await uploadUserImage(selectedFile)
//       if (!uploadRes?.success || !uploadRes?.image_url) {
//         throw new Error(uploadRes?.message || "Upload failed")
//       }
//       const uploadedImageUrl = uploadRes.image_url
//       localStorage.setItem("uploadedImageUrl", uploadedImageUrl)

//       // 2) create avatar using uploaded image_url
//       const createRes = await createUserAvatar(uploadedImageUrl)
//       if (!createRes?.success || !createRes?.image_url) {
//         throw new Error(createRes?.message || "Avatar creation failed")
//       }
//       const createdAvatarUrl = createRes.image_url
//       const avatarId = createRes.avatar_id

//       // persist for /final
//       localStorage.setItem("createdAvatarImageUrl", createdAvatarUrl)
//       if (avatarId) localStorage.setItem("createdAvatarId", String(avatarId))

//       // 3) navigate to /final with state
//       navigate("/final", { state: { imageUrl: createdAvatarUrl, avatarId } })
//     } catch (e) {
//       setError(e.message || "Something went wrong")
//     } finally {
//       setUploading(false)
//     }
//   }

//   function handleFileChange(e) {
//     const file = e.target.files?.[0]
//     if (file) {
//       setSelectedFile(file)
//       setPreviewUrl(URL.createObjectURL(file))
//     }
//   }

//   return (
//     <>
//       <style
//         dangerouslySetInnerHTML={{
//           __html:
//             "\n        body {\n background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);\n            color: white;\n           \n            font-family: Arial, sans-serif;\n            margin: 0;\n            padding: 0;\n        }\n        .container {\n            max-width: 100%;\n            margin: auto;\n            padding: 20px;\n        }\n        h1 {\n            margin-bottom: 10px;\n        }\n        .avatar-container {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            flex-direction: column;\n        }\n        .avatar {\n            width: 120px;\n            height: 120px;\n            border-radius: 50%;\n            border: 4px solid white;\n        }\n        .avatar-container img {\n        width: 150px;\n        height: 150px;\n        border-radius: 50%;\n        border: 4px solid #ffcc00;\n        box-shadow: 0 0 10px #ffcc00;\n    }\n\n    .avatars {\n        display: flex;\n        justify-content: center;\n        gap: 15px;\n        \n    }\n\n    .avatar-option {\n        width: 80px;\n        height: 80px;\n        border-radius: 10px;\n        cursor: pointer;\n        transition: all 0.3s ease-in-out;\n        border: 3px solid transparent;\n    }\n\n    .avatar-option.active {\n        border: 3px solid #ffcc00; /* Yellow border */\n        box-shadow: 0 0 10px #ffcc00;\n        transform: scale(1.1);\n    }\n        .avatar-option:hover {\n            transform: scale(1.1);\n        }\n       \n    ",
//         }}
//       />
//       <section className="header-section">
//         <div className="header-testting-wrap">
//           <header className="header">
//             <div className="container-fluid">
//               <div className="header-testting-inner d-flex align-items-center justify-content-between">
//                 {/* Logo */}
//                 <div className="header-item item-left">
//                   <div className="logo-menu">
//                     <Link to={"/landing"} className="logo d-xl-block">
//                       <img src={`${logo}`} alt="logo" style={{ width: 150 }} />
//                     </Link>
//                   </div>
//                 </div>
//                 {/* Menu Start */}
//                 <div className="header-item">
//                   <div className="menu-overlay" />
//                   <nav className="menu">
//                     {/* Mobile Menu Head */}
//                     <div className="mobile-menu-head">
//                       <div className="go-back">
//                         <i className="material-symbols-outlined">arrow_back_ios</i>
//                       </div>
//                       <div className="current-menu-title" />
//                       <div className="mobile-menu-close">×</div>
//                     </div>
//                   </nav>
//                 </div>
//                 {/* Menu End */}
//                 <div className="header-item item-righ d-flex align-items-center justify-content-center">
//                   <div className="menu__components">
//                     <div className="d-flex gap-3 p-2" style={{ border: "1px solid #3E70A1", borderRadius: 10 }}>
//                       <a href="profile.html">
//                         <img
//                           src="https://www.bootdey.com/img/Content/avatar/avatar2.png"
//                           style={{ width: 40, borderRadius: "100%" }}
//                         />
//                       </a>
//                       <a href="profile.html">
//                         <span style={{ fontSize: 14 }}>Richard Jhons</span>
//                         <br />
//                         <span style={{ fontSize: 14 }}>
//                           <strong style={{ color: "#C30EFF" }}>Credit:</strong> $125
//                         </span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </header>
//         </div>
//       </section>
//       <section className="pt-120 pb-120 mt-5 mb-5">
//         {/*Container*/}
//         <div className="container">
//           <div className="row align-items-center pt-80 justify-content-center">
//             <div className="col-lg-8 text-center">
//               <h1 className="mb-5">Customized Your Avatar</h1>
//               <div className="avatar-container mb-5">
//                 <img src={previewUrl || "/placeholder.jpg"} alt="Avatar preview" className="avatar" id="mainAvatar" />
//               </div>
//               <div className="mt-4 mb-4">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="form-control"
//                   style={{ maxWidth: 420, margin: "0 auto" }}
//                 />
//                 <p className="mt-2" style={{ fontSize: 14, opacity: 0.8 }}>
//                   Choose an image to upload. Supported: any typical image format.
//                 </p>
//               </div>
//               <button className="btn btn-custom mb-3 w-50" onClick={handleUpload} disabled={uploading}>
//                 {uploading ? "Processing..." : "Upload & Create Avatar"}
//               </button>
//               {error ? (
//                 <div className="mt-3" style={{ color: "#ffb4b4" }}>
//                   {error}
//                 </div>
//               ) : null}
//               <div className="mt-3">
//                 <Link to="/landing" className="text-white" style={{ textDecoration: "underline" }}>
//                   Back to Home
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Footer Here */}
//       <footer className="footer__section footer__section__five">
//         <div className="container">
//           <div className="footer__wrapper">
//             <div className="footer__top">
//               <div className="row g-5">
//                 <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
//                   <div className="footer__widget">
//                     <div className="widget__head">
//                       <a href="index.html" className="footer__logo">
//                         <img src="assets/img/logo/logo.png" alt="logo" style={{ width: 150 }} />
//                       </a>
//                     </div>
//                     <p className="pb__20">
//                       Artificial Intelligence (AI) and Machine Learning (ML) are closely related technologies that
//                       enable computers to learn from data and make predictions
//                     </p>
//                   </div>
//                 </div>
//                 <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
//                   <div className="footer__widget">
//                     <div className="widget__head">
//                       <h4>Explore</h4>
//                     </div>
//                     <div className="widget__link">
//                       <a href="#" className="link">
//                         Resources
//                       </a>
//                       <a href="#" className="link">
//                         Blog
//                       </a>
//                       <a href="#" className="link">
//                         Documents
//                       </a>
//                       <a href="#" className="link">
//                         Help Center
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
//                   <div className="footer__widget">
//                     <div className="widget__head">
//                       <h4>Menu</h4>
//                     </div>
//                     <div className="widget__link">
//                       <a href="#" className="link">
//                         Home
//                       </a>
//                       <a href="#" className="link">
//                         About Us
//                       </a>
//                       <a href="#" className="link">
//                         Services
//                       </a>
//                       <a href="#" className="link">
//                         Contact Us
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
//                   <div className="footer__widget">
//                     <div className="widget__head">
//                       <h4>Office Location</h4>
//                     </div>
//                     <div className="widget__link">
//                       <a href="javascript:void(0)" className="footer__contact__items">
//                         <span className="icon iconthree">
//                           <span className="material-symbols-outlined">pin_drop</span>
//                         </span>
//                         <span className="fcontact__content">Westheimer Rd. Santa Ana, Illinois</span>
//                       </a>
//                       <a href="javascript:void(0)" className="footer__contact__items">
//                         <span className="icon">
//                           <i className="material-symbols-outlined">add_call</i>
//                         </span>
//                         <span className="fcontact__content">(XXX) XXX-XXXX</span>
//                       </a>
//                       <a href="javascript:void(0)" className="footer__contact__items">
//                         <span className="icon icontwo">
//                           <i className="material-symbols-outlined">mark_as_unread</i>
//                         </span>
//                         <span className="fcontact__content">
//                           <span className="__cf_email__" data-cfemail="03667b626e736f6643667b626e736f662d606c6e">
//                             [email&nbsp;protected]
//                           </span>
//                         </span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="footer__bottom footer__bottom__two">
//               <ul className="footer__bottom__link">
//                 <li>
//                   <a href="support.html">Terms</a>
//                 </li>
//                 <li>
//                   <a href="support.html">Privacy</a>
//                 </li>
//                 <li>
//                   <a href="support.html">Cookies</a>
//                 </li>
//               </ul>
//               <p>© 2025 By Aiseras. All Rights Reserved.</p>
//               <ul className="social">
//                 <li>
//                   <a href="javascript:void(0)" className="social__item">
//                     <span className="icon">
//                       <img src="assets/img/svg-icon/facebook.svg" alt="svg" />
//                     </span>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="javascript:void(0)" className="social__item social__itemtwo">
//                     <span className="icon">
//                       <img src="assets/img/svg-icon/instagram.svg" alt="svg" />
//                     </span>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="javascript:void(0)" className="social__item social__itemthree">
//                     <span className="icon">
//                       <img src="assets/img/svg-icon/twitter.svg" alt="svg" />
//                     </span>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="javascript:void(0)" className="social__item social__itemfour">
//                     <span className="icon">
//                       <img src="assets/img/svg-icon/linkedin.svg" alt="svg" />
//                     </span>
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </footer>
//       {/* Footer End */}
//       {/*Jquery 3 6 0 Min Js*/}
//       {/*Bootstrap bundle Js*/}
//       {/*Viewport Jquery Js*/}
//       {/*Odometer min Js*/}
//       {/*Magnifiw Popup Js*/}
//       {/*Wow min Js*/}
//       {/*Owl carousel min Js*/}
//       {/*Prijm Js*/}
//       {/*main Js*/}
//     </>
//   )
// }

// function changeAvatar(event, avatarUrl) {
//   const mainAvatar = document.getElementById("mainAvatar")
//   mainAvatar.src = avatarUrl
//   const avatarOptions = document.querySelectorAll(".avatar-option")
//   avatarOptions.forEach((option) => option.classList.remove("active"))
//   event.target.classList.add("active")
// }

// export default CustomizeAvtar

"use client"

import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { uploadUserImage, createUserAvatar } from "../utils/mediaApi"

// 🔹 Dummy images
import cartoonDummy from "../assets/images/select1.png"
import cloneDummy from "../assets/images/select2.png"
import imageDummy from "../assets/images/select3.png"

// Avatar types + mapping to API style
const avatarTypes = [
  { key: "cartoon", label: "Cartoon Avatar", dummy: cartoonDummy, style: "cartoon" },
  { key: "clone", label: "Clone Avatar", dummy: cloneDummy, style: "clone" },
  { key: "image", label: "Image Avatar", dummy: imageDummy, style: "original" },
]

export default function CustomizeAvatar() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [selectedType, setSelectedType] = useState(null)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [previewMap, setPreviewMap] = useState(() =>
    avatarTypes.reduce((acc, item) => {
      acc[item.key] = item.dummy
      return acc
    }, {})
  )

  // 🔹 Avatar card click
  function handleAvatarClick(type) {
    if (loading) return
    setSelectedType(type)
    fileInputRef.current.click()
  }

  // 🔹 File change
  function handleFileChange(e) {
    const f = e.target.files?.[0]
    if (!f || !selectedType) return
   if (f.size > 1 * 1024 * 1024) {
    setError("Image size must be less than 1 MB")
    return
  }
    setFile(f)
    setPreviewMap((prev) => ({
      ...prev,
      [selectedType]: URL.createObjectURL(f),
    }))
  }

  // 🔹 Create avatar API call
  async function handleCreateAvatar() {
    if (!file || !selectedType) return

    try {
      setLoading(true)
      setError("")

      // 1️⃣ Upload image
      const uploadRes = await uploadUserImage(file)
      console.log("uploadUserImage Error",uploadRes)
      if (!uploadRes?.success) throw new Error("Upload failed")

      // 2️⃣ Map selected type to API style
      const selectedAvatar = avatarTypes.find((a) => a.key === selectedType)
      const style = selectedAvatar?.style || "originalll"

      // 3️⃣ Create avatar
      const createRes = await createUserAvatar(uploadRes.image_url, {
        style,
        name: `${selectedAvatar.label} - My Avatar`,
        description: `Avatar created in ${style} style`,
      })
      console.log("createUserAvatar Error",createRes)
      if (!createRes?.success) throw new Error("Avatar creation failed")

      // 4️⃣ Navigate to final page
      navigate("/final", {
        state: {
          imageUrl: createRes.image_url,
          avatarId: createRes.avatar_id,
          type: selectedType,
        },
      })
    } catch (err) {
      setError(err.message || "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      {/* 🔹 SQUARE OUTER CONTAINER */}
      <div
        style={{
          width: 520,
          height: 400,
          background: "rgba(0,0,0)",
          backdropFilter: "blur(12px)",
          borderRadius: 20,
          padding: 26,
          color: "#fff",
          boxShadow: "0 25px 70px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Header */}
        <div>
          {/* <h2 style={{ textAlign: "center", marginBottom: 3, color: "#fff" }}>
            Create Your Avatar
          </h2> */}
          <p style={{ textAlign: "center", fontSize: 25, opacity: 1 }}>
            Select Avatar Type
          </p>
        </div>

        {/* 🔹 Avatar Cards */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {avatarTypes.map((item) => (
            <div
              key={item.key}
              onClick={() => handleAvatarClick(item.key)}
              style={{
                width: 140,
                cursor: loading ? "not-allowed" : "pointer",
                textAlign: "center",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {/* Image box */}
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 14,
                  overflow: "hidden",
                  border:
                    selectedType === item.key
                      ? "2px solid #ffcc00"
                      : "1.5px solid rgba(255,255,255,0.25)",
                  boxShadow:
                    selectedType === item.key
                      ? "0 0 18px rgba(255,204,0,0.6)"
                      : "none",
                  transition: "all 0.25s ease",
                }}
              >
                <img
                  src={previewMap[item.key]}
                  alt={item.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* 🔹 LABEL BELOW IMAGE */}
              <div
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  opacity: 0.9,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Hidden input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Button */}
        <div style={{ textAlign: "center" }}>
         <button
  onClick={handleCreateAvatar}
  disabled={!file || loading}
  style={{
    padding: "12px 60px", // X-axis length increase
    marginTop: "20px",
    borderRadius: 22,
    background: "linear-gradient(90deg, #8e2de2 0%, #4a00e0 100%)", // purple → blue
    border: "none",
    fontWeight: 600,
    fontSize: 14,
    color: "#fff",
    cursor: !file || loading ? "not-allowed" : "pointer",
    opacity: !file || loading ? 0.6 : 1,
    transition: "transform 0.2s ease",
  }}
>
  {loading ? "Creating Avatar..." : "Create Avatar"}
</button>

        </div>

        {error && (
          <p
            style={{
              color: "#ff9c9c",
              fontSize: 13,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
