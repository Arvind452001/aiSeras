import { useState } from "react"
import { Link } from "react-router-dom"
import Header1 from "../components/Header1"
import Footer from "../components/Footer"
import { Button } from "../components/Button"
import { Modal } from "../components/Modal"
import { Check } from "lucide-react"

export default function VoiceRecordingCompleted() {
  const [selectedVoice, setSelectedVoice] = useState("male")
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
const createdFromStorage = localStorage.getItem("createdAvatarImageUrl") || "";
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

              <h1 className="display-6 fw-bold text-white mb-2">
                Captured Successfully
              </h1>

              <p className="text-secondary mb-4">
                Let Us Capture your Voice
              </p>

              {/* Success Indicator */}
              <div className="d-flex justify-content-center mb-4">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 250,
                    height: 250,
                    border: "4px solid #22c55e",
                    background:
                      "linear-gradient(135deg, rgba(34,197,94,0.25), rgba(59,130,246,0.25))",
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center bg-success"
                    style={{ width: 96, height: 96 }}
                  >
                    <Check size={48} color="#fff" />
                  </div>
                </div>
              </div>

              <p className="text-secondary mb-4">Select Voice Type</p>

              {/* Voice Selection – Image + Text */}
              <div className="d-flex justify-content-center gap-4 mb-5">

                {/* Male */}
                <div
                  onClick={() => setSelectedVoice("male")}
                  className={`d-flex flex-column align-items-center cursor-pointer ${
                    selectedVoice === "male" ? "border border-2 border-primary p-1 rounded-squre" : ""
                  }`}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE9ML0QbGwOiQvUlDh1_E4PSKmHPyTRxjuaQ&s"
                    alt="Male"
                    className="rounded-circle mb-2"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                  <span className="text-white fw-medium">Male</span>
                </div>

                {/* Female */}
                <div
                  onClick={() => setSelectedVoice("female")}
                  className={`d-flex flex-column align-items-center cursor-pointer ${
                    selectedVoice === "female" ? "border border-2 border-primary p-1 rounded-squre" : ""
                  }`}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubOqXHc2HoKH3DNq9wdTh_AgYj-3n33qXjw&s"
                    alt="Female"
                    className="rounded-circle mb-2"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                  <span className="text-white fw-medium">Female</span>
                </div>

              </div>

              {/* Process Button */}
              <Button
                onClick={() => setConfirmModalOpen(true)}
                className="rounded-pill"
                style={{ width: "220px", height: "45px" }}
              >
                Process
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* Confirm Voice Modal */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        // title="Confirm Voice"
      >
        <h3 className="text-white mb-4 text-center ">
            Confirm Voice
          </h3>
        <div className="text-center">

          <div className="mb-3 p-3 rounded-3 border border-primary d-inline-block">
            <img
              src={createdFromStorage}
              alt="Avatar"
              width={100}
              height={100}
            />
          </div>

          <p className="text-white small mb-4">
            Continue with {selectedVoice} Voice
          </p>

          <Link to="/final">
            <Button className="w-80 rounded-pill">
              Confirm
            </Button>
          </Link>

        </div>
      </Modal>

      <Footer />
    </div>
  )
}
