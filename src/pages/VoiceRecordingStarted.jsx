"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import Header1 from "../components/Header1"
import Footer from "../components/Footer"

export default function VoiceRecordingStarted() {
  const [seconds, setSeconds] = useState(0)
  const [isRecording, setIsRecording] = useState(true)

  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(180deg, #0f0c29, #302b63, #24243e)" }}>
      <Header1 />

      <section style={{ paddingTop: "8rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-5 fw-bold text-white mb-2">Sit Back and Relaxes</h1>
              <p className="text-secondary mb-4">Let Us Capture your Voice</p>

              {/* Timer Display */}
              <div className="position-relative d-inline-block mb-4">
                <div
                  className="rounded-circle border border-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: "250px",
                    height: "250px",
                    borderColor: "#a855f7",
                    background: "linear-gradient(135deg, rgba(88,28,135,0.5), rgba(30,58,138,0.5))",
                  }}
                >
                  <span className="display-4 fw-bold text-white">{formatTime(seconds)}</span>
                </div>
                {/* Animated ring */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 rounded-circle border border-4"
                  style={{ borderColor: "#c084fc", animation: "pulse 2s infinite" }}
                />
              </div>

              <p className="text-secondary mb-4">Click ON Mic Above and start recording your voice</p>

              <Link to="/voice-recording-completed">
                <Button onClick={() => setIsRecording(false)} className="px-5">
                  Stop
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
