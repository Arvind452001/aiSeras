"use client"

import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { fetchUserHistory } from "../utils/mediaApi"
import img2 from '../assets/images/happy-face.png'
import chatbotIcon from "../images/chatbot.png"  
const History = () => {
  const [ops, setOps] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [total, setTotal] = useState(0)
  const [limit] = useState(50)
  const [offset, setOffset] = useState(0)

  const userId = useMemo(() => {
    try {
      const storedId = localStorage.getItem("user_id")
      if (storedId) {
        const parsed = Number(storedId)
        return Number.isNaN(parsed) ? storedId : parsed
      }
      const u = localStorage.getItem("user")
      return u ? JSON.parse(u)?.id || 2 : 2
    } catch {
      return 2
    }
  }, [])

  async function loadHistory(nextOffset = 0) {
    try {
      setLoading(true)
      setError("")
      const data = await fetchUserHistory({ user_id: userId, limit, offset: nextOffset })
      if (nextOffset === 0) {
        setOps(data?.operations || [])
      } else {
        setOps((prev) => [...prev, ...(data?.operations || [])])
      }
      setTotal(data?.total_count || 0)
      setOffset(nextOffset)
    } catch (e) {
      console.error("[v0] history load error:", e)
      setError("Failed to load history. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHistory(0)
  }, [userId])

  const canLoadMore = ops.length < total

  return (
    <>
      <style>{`
        .history-page .greeting { font-size: 18px; color: #ccc; }
        .history-page table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        .history-page th, .history-page td { text-align: left; padding: 16px; border-bottom: 1px solid #1e1e1e; vertical-align: middle; }
        .history-page th { color: #ccc; }
        .status-badge { font-weight: 600; padding: 4px 10px; border-radius: 999px; font-size: 12px; display: inline-block; }
        .status-complete { color: #10b981; background: rgba(16,185,129,.12); border: 1px solid rgba(16,185,129,.25); }
        .status-pending { color: #f59e0b; background: rgba(245,158,11,.12); border: 1px solid rgba(245,158,11,.25); }
        .status-failed  { color: #ef4444; background: rgba(239,68,68,.12); border: 1px solid rgba(239,68,68,.25); }
        .actions { display: flex; align-items: center; gap: 10px; }
        .btn-ghost { background: transparent; border: 1px solid #2b2b2b; color: #ddd; padding: 6px 10px; border-radius: 6px; text-decoration: none; font-size: 14px; }
        .btn-ghost[disabled] { opacity: .6; cursor: not-allowed; }
        .thumb { width: 72px; height: 72px; border-radius: 8px; object-fit: cover; border: 1px solid #2b2b2b; background: #111; }
        .thumb-audio { width: 72px; height: 72px; border-radius: 8px; border: 1px solid #2b2b2b; display: flex; align-items: center; justify-content: center; color: #bbb; font-size: 12px; background:#111; }
        .thumb-video { width: 96px; height: 64px; border-radius: 6px; border: 1px solid #2b2b2b; object-fit: cover; background:#000; }
      `}</style>

      <Header />

      <main className="history-page">
        <section className="pt-120 pb-120 mt-5 mb-5">
          <div className="container">
            <div className="row align-items-center pt-80 justify-content-center">
              <div className="col-lg-12 mb-4">
                <h4 className="text-white mb-1">Hello,</h4>
               <h2 className="text-white">
                           Richard <img src={`${img2}`} style={{ width: 60 }} />
                         </h2>
                <p className="greeting">Here are your generated assets. View or download them anytime.</p>
              </div>

              <div className="col-lg-12">
                {error && <div style={{ color: "#ef4444", marginBottom: 12 }}>{error}</div>}

                <table aria-label="Generated media history">
                  <thead>
                    <tr>
                      <th scope="col">Preview</th>
                      <th scope="col">Title</th>
                      <th scope="col">Type</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && ops.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ color: "#aaa" }}>
                          Loading...
                        </td>
                      </tr>
                    ) : ops.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ color: "#aaa" }}>
                          No items found.
                        </td>
                      </tr>
                    ) : (
                      ops.map((op) => {
                        const meta = op?.metadata || {}
                        const mediaKind = meta?.media_kind || (op?.operation_type === "avatar_created" ? "image" : "")
                        const isComplete =
                          meta?.video_status === 3 ||
                          meta?.is_ready === true ||
                          /completed/i.test(meta?.status_text || op?.status_text || "")
                        const statusText =
                          meta?.status_text || op?.status_text || (isComplete ? "completed" : "processing")
                        const created = op?.created_at ? new Date(op.created_at).toLocaleString() : "-"
                        const url = meta?.url || meta?.image_url || ""
                        const thumbCandidate =
                          meta?.thumbnail_url ||
                          meta?.image_url ||
                          (op?.operation_type === "avatar_created" ? meta?.image_url : "") ||
                          ""
                        const hasThumbImage = Boolean(thumbCandidate)

                        return (
                          <tr key={op?.id}>
                            <td>
                              {mediaKind === "image" && (thumbCandidate || url) ? (
                                <img
                                  src={thumbCandidate || url || "/placeholder.svg"}
                                  alt={op?.title || "Image"}
                                  className="thumb"
                                />
                              ) : mediaKind === "video" ? (
                                hasThumbImage ? (
                                  <img
                                    src={thumbCandidate || "/placeholder.svg"}
                                    alt={op?.title || "Video thumbnail"}
                                    className="thumb"
                                  />
                                ) : url ? (
                                  <video
                                    className="thumb-video"
                                    muted
                                    loop
                                    playsInline
                                    onMouseOver={(e) => e.currentTarget.play()}
                                    onMouseOut={(e) => e.currentTarget.pause()}
                                    src={url}
                                  />
                                ) : (
                                  <div className="thumb-audio">N/A</div>
                                )
                              ) : mediaKind === "audio" ? (
                                <div className="thumb-audio">AUDIO</div>
                              ) : (
                                <div className="thumb-audio">N/A</div>
                              )}
                            </td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{op?.title || "Generated"}</div>
                              <small style={{ color: "#aaa" }}>{op?.description || ""}</small>
                            </td>
                            <td style={{ textTransform: "capitalize" }}>{mediaKind || op?.operation_type || "-"}</td>
                            <td>
                              <span
                                className={`status-badge ${
                                  /fail|error/i.test(statusText)
                                    ? "status-failed"
                                    : isComplete
                                      ? "status-complete"
                                      : "status-pending"
                                }`}
                              >
                                {statusText}
                              </span>
                            </td>
                            <td>{created}</td>
                            <td className="actions">
                              <a
                                href={url || "#"}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-ghost"
                                aria-disabled={!url}
                                onClick={(e) => {
                                  if (!url) e.preventDefault()
                                }}
                              >
                                View
                              </a>
                              <a
                                href={url || "#"}
                                download
                                className="btn-ghost"
                                aria-disabled={!url}
                                onClick={(e) => {
                                  if (!url) e.preventDefault()
                                }}
                              >
                                Download
                              </a>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>

                {ops.length > 0 && (
                  <div className="mt-4" style={{ display: "flex", gap: 12 }}>
                    <button
                      className="btn-ghost"
                      onClick={() => loadHistory(0)}
                      disabled={loading}
                      aria-label="Refresh history"
                    >
                      {loading ? "Refreshing..." : "Refresh"}
                    </button>
                    {canLoadMore && (
                      <button
                        className="btn-ghost"
                        onClick={() => loadHistory(offset + limit)}
                        disabled={loading}
                        aria-label="Load more"
                      >
                        {loading ? "Loading..." : "Load more"}
                      </button>
                    )}
                    <Link to="/face-recognition" className="btn-ghost" aria-label="Create new">
                      Let’s Create One
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default History
