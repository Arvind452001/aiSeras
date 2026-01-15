import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header1 from "../components/Header1";
import Footer from "../components/Footer";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Check } from "lucide-react";

export default function VoiceRecordingCompleted() {
  // ✅ Default = recorded (behind the scenes)
  const [selectedVoice, setSelectedVoice] = useState("recorded");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
console.log("selectedVoice",selectedVoice)
  const createdFromStorage =
    localStorage.getItem("createdAvatarImageUrl") || "";

  // 🎙 Recorded voice from previous screen
  const recordedVoiceFile = window.recordedVoiceFile;
console.log("recordedVoiceFile",recordedVoiceFile)
  const userId = 18;

  const handleConfirm = async () => {
    try {
      // 🔴 Agar recorded selected hai to file mandatory
      if (selectedVoice === "recorded" && !recordedVoiceFile) {
        alert("Recorded voice not found");
        return;
      }

      setLoading(true);

      const voiceName =
        selectedVoice === "recorded" ? "recorded_voice" : selectedVoice;

      const voiceDescription =
        selectedVoice === "recorded"
          ? "User recorded voice"
          : `System ${selectedVoice} voice`;

      const formData = new FormData();

      // ✅ File sirf recorded ke case me bhejo
      if (selectedVoice === "recorded") {
        formData.append("file", recordedVoiceFile);
      }

      const url =
        `https://www.aiseras.com/aiseras/api/upload-voice` +
        `?user_id=${userId}` +
        `&voice_name=${encodeURIComponent(voiceName)}` +
        `&voice_description=${encodeURIComponent(voiceDescription)}`;

        const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_API_TOKEN",
        },
        body: formData,
      });
console.log("formData",response)
      if (!response.ok) {
        throw new Error("Voice upload failed");
      }

      await response.json();

      window.recordedVoiceFile = null;

      setConfirmModalOpen(false);
      navigate("/chat");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Voice upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

              <p className="text-secondary mb-4">Let Us Capture your Voice</p>

              {/* Success Indicator */}
              <div className="d-flex justify-content-center mb-4">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 250,
                    height: 250,
                    border: "4px solid #22c55e",
                  }}
                >
                  <Check size={48} color="#22c55e" />
                </div>
              </div>

              <p className="text-secondary mb-4">Select a voice type. By default, your recorded voice is selected</p>

              {/* ✅ Only Male/Female shown on screen */}
              <div className="d-flex justify-content-center gap-4 mb-5">
                {/* Male */}
                <div
                  onClick={() => setSelectedVoice("male")}
                  className={`d-flex flex-column align-items-center cursor-pointer ${
                    selectedVoice === "male"
                      ? "border border-2 border-primary p-2 rounded"
                      : ""
                  }`}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE9ML0QbGwOiQvUlDh1_E4PSKmHPyTRxjuaQ&s"
                    alt="Male"
                    className="rounded-circle mb-2"
                    style={{ width: 50, height: 50 }}
                  />
                  <span className="text-white fw-medium">Male</span>
                </div>

                {/* Female */}
                <div
                  onClick={() => setSelectedVoice("female")}
                  className={`d-flex flex-column align-items-center cursor-pointer ${
                    selectedVoice === "female"
                      ? "border border-2 border-primary p-2 rounded"
                      : ""
                  }`}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubOqXHc2HoKH3DNq9wdTh_AgYj-3n33qXjw&s"
                    alt="Female"
                    className="rounded-circle mb-2"
                    style={{ width: 50, height: 50 }}
                  />
                  <span className="text-white fw-medium">Female</span>
                </div>
              </div>

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

      {/* Confirm Modal */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
      >
        <h3 className="text-white mb-4 text-center">Confirm Voice</h3>

        <p className="text-white text-center mb-4">
          Continue with <b>{selectedVoice === "recorded" ? "Recorded" : selectedVoice}</b> voice
        </p>

        <Button
          className="w-100 rounded-pill"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm"}
        </Button>
      </Modal>

      <Footer />
    </div>
  );
}
