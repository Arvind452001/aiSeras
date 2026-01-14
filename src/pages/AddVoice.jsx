"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from "../components/Modal"
import { Button } from "../components/Button"
import Footer from "../components/Footer"
import Header1 from "../components/Header1"
import PrevButton from "../components/PrevButton"

export default function AddVoice() {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(180deg, #0f0c29, #302b63, #24243e)",
      }}
    >
      <Header1 />

      <section style={{ paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">

              {/* Prev Button (scrolls with page) */}
              <div className="d-flex justify-content-start mb-4">
                <PrevButton className="btn-dark" />
              </div>

              <h1 className="display-5 text-white mb-2">
                Help Us Record Your Voice
              </h1>

              <p className="text-secondary mb-4">
                This is how you looks like
              </p>

              {/* Voice Recording Image */}
              <div className="mb-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbCBuNeW2Sd41BKK2OpgY3KewDBlOJOa1Z5g&s"
                  alt="Voice Recording"
                  className="d-block mx-auto rounded-3"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>

              <p className="text-secondary mb-4">
                Click ON Mic Above and start recording your voice
              </p>

              {/* Upload Voice */}
              <div className="d-flex flex-column align-items-center gap-3 mb-4">
                <div
                  className="rounded-3 p-3 position-relative bg-dark"
                  style={{ width: "280px" }}
                >
                  <i
                    className="bi bi-mic-fill position-absolute start-0 top-50 translate-middle-y ms-4"
                    style={{ color: "#a855f7" }}
                  ></i>
                  <span className="text-white ms-4">
                    Upload Voice Note
                  </span>
                </div>

                <label className="btn btn-link text-secondary text-decoration-none d-flex align-items-center gap-2 rounded-3">
                  <input type="file" className="d-none" accept="audio/*" />
                  <i className="bi bi-upload"></i>
                  Upload Voice
                </label>
              </div>

              <Button
                onClick={() => setConfirmModalOpen(true)}
                className="px-5 rounded-3"
              >
                Record
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Add Voice"
      >
        <p className="text-center text-secondary mb-4">
          A dummy text generator is a tool that produces random text for
          design mockups and content previews.
        </p>

        <Link to="/voice-recording-started">
          <Button className="w-100 rounded-3">
            Confirm
          </Button>
        </Link>
      </Modal>

      <Footer />
    </div>
  )
}
