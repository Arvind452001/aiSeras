"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import Header1 from "../components/Header1";
import Footer from "../components/Footer";
import { Mic } from "lucide-react";

export default function VoiceRecordingStarted() {
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");

  console.log("isRecording", isRecording);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const navigate = useNavigate();

  // ⏱ Start timer
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  // ⏹ Stop timer
  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  // 🎙 Start recording ONLY on mic click
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      startTimer();
    } catch (err) {
      console.error(err);
      setError("Microphone permission denied or not found");
    }
  };

  // ⛔ Stop recording
  const handleStop = () => {
    if (!mediaRecorderRef.current) return;

    stopTimer();
    setIsRecording(false);

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const audioFile = new File([audioBlob], "voice.webm", {
        type: "audio/webm",
      });

      // ✅ Save for next page
      window.recordedVoiceFile = audioFile;
      // console.log("audioFile", audioFile);
      navigate("/voice-recording-completed");
    };

    mediaRecorderRef.current.stop();
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs
      .toString()
      .padStart(2, "0")}`;
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
              <h1 className="display-5 fw-bold text-white mb-2">
                Sit Back and Relax
              </h1>

              <p className="text-secondary mb-4">Let Us Capture your Voice</p>

              {/* 🎙 Mic / Timer Circle */}
              <div className="position-relative d-inline-block mb-4">
                <div
                  className="rounded-circle border border-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "250px",
                    height: "250px",
                    borderColor: "#a855f7",
                    cursor: isRecording ? "default" : "pointer",
                    background:
                      "linear-gradient(135deg, rgba(88,28,135,0.5), rgba(30,58,138,0.5))",
                  }}
                  onClick={!isRecording ? startRecording : undefined}
                >
                  {!isRecording ? (
                    <Mic size={64} color="#fff" />
                  ) : (
                    <span className="display-4 fw-bold text-white">
                      {formatTime(seconds)}
                    </span>
                  )}
                </div>
              </div>

              {error && <p className="text-danger mb-3">{error}</p>}

              <p className="text-secondary mb-4">
                {isRecording
                  ? "Recording in progress..."
                  : "Tap the mic to start recording"}
              </p>

              <Button
                onClick={handleStop}
                className="px-5"
                disabled={!isRecording}
              >
                Stop
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
