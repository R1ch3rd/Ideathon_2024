import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../lib/api";
import { ResultCard, Dots, btnPrimary, btnGhost } from "../components/ResultCard";

export default function AnalyzePage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [enhanced, setEnhanced] = useState(null);
  const [caption, setCaption] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState({ enh: false, cap: false, sum: false });
  const [error, setError] = useState("");

  const set = (k, v) => setLoading((s) => ({ ...s, [k]: v }));

  const onFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) { setError("Please choose an image file."); return; }
    if (f.size > 4 * 1024 * 1024) { setError("Image must be under 4 MB."); return; }
    setError(""); setEnhanced(null); setCaption(""); setSummary("");
    setFile(f); setPreview(URL.createObjectURL(f));
  };

  const run = async (kind) => {
    if (!file) return;
    const key = { enhance: "enh", caption: "cap", summary: "sum" }[kind];
    set(key, true); setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (kind === "enhance") {
        const res = await axios.post(`${API_BASE}/enhance_image/`, fd, { responseType: "arraybuffer" });
        setEnhanced(URL.createObjectURL(new Blob([res.data], { type: "image/png" })));
      } else {
        const path = kind === "caption" ? "generate-caption" : "generate-summary";
        const res = await axios.post(`${API_BASE}/${path}/`, fd);
        kind === "caption" ? setCaption(res.data.caption) : setSummary(res.data.summary);
      }
    } catch (e) {
      setError(e.response?.data?.detail || "Request failed.");
    } finally {
      set(key, false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-display font-semibold text-3xl text-ink mb-2">Analyze</h1>
      <p className="text-ink-muted mb-8 max-w-2xl">
        Upload a photo, then sharpen it, generate a caption, or produce an
        AI-written summary of its contents.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block">
            <span className="sr-only">Choose image</span>
            <input
              type="file"
              accept="image/*"
              onChange={onFile}
              className="block w-full text-sm text-ink-muted file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-accent-btn file:text-white file:cursor-pointer hover:file:bg-accent"
            />
          </label>

          {file && (
            <div className="flex flex-wrap gap-2 mt-4">
              <button onClick={() => run("enhance")} disabled={loading.enh} className={btnPrimary}>
                {loading.enh ? <Dots /> : "Enhance"}
              </button>
              <button onClick={() => run("caption")} disabled={loading.cap} className={btnGhost}>
                {loading.cap ? <Dots /> : "Caption"}
              </button>
              <button onClick={() => run("summary")} disabled={loading.sum} className={btnGhost}>
                {loading.sum ? <Dots /> : "Summarize"}
              </button>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-blush">{error}</p>}
          {caption && <ResultCard label="Caption" tone="sage">{caption}</ResultCard>}
          {summary && <ResultCard label="Summary" tone="butter">{summary}</ResultCard>}
        </div>

        <div className="space-y-4">
          <div className="min-h-[220px] flex items-center justify-center bg-surface border border-surface-border rounded-xl overflow-hidden">
            {preview ? (
              <img src={preview} alt="Uploaded" className="w-full h-auto" />
            ) : (
              <p className="text-ink-faint text-sm px-6 text-center">Your uploaded image appears here.</p>
            )}
          </div>
          {enhanced && (
            <div>
              <p className="text-xs font-mono uppercase tracking-wide text-ink-faint mb-1">Enhanced</p>
              <img src={enhanced} alt="Enhanced" className="w-full h-auto rounded-xl border border-surface-border" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
