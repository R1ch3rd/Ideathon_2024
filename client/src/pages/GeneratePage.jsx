import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../lib/api";
import { ResultCard, Dots, btnPrimary, btnGhost } from "../components/ResultCard";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null); // base64 string
  const [caption, setCaption] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState({ gen: false, cap: false, sum: false });
  const [error, setError] = useState("");

  const set = (k, v) => setLoading((s) => ({ ...s, [k]: v }));

  const generate = async () => {
    if (!prompt.trim()) return;
    setError(""); setImage(null); setCaption(""); setSummary("");
    set("gen", true);
    try {
      const res = await axios.post(`${API_BASE}/generate-image/`, new URLSearchParams({ prompt }));
      setImage(res.data);
    } catch (e) {
      setError(e.response?.data?.detail || "Generation failed. Try again in a moment.");
    } finally {
      set("gen", false);
    }
  };

  const imageBlob = async () => {
    const r = await fetch(`data:image/png;base64,${image}`);
    return r.blob();
  };

  const run = async (kind) => {
    if (!image) return;
    const key = kind === "caption" ? "cap" : "sum";
    set(key, true); setError("");
    try {
      const fd = new FormData();
      fd.append("file", await imageBlob(), "generated.png");
      const path = kind === "caption" ? "generate-caption" : "generate-summary";
      const res = await axios.post(`${API_BASE}/${path}/`, fd);
      kind === "caption" ? setCaption(res.data.caption) : setSummary(res.data.summary);
    } catch (e) {
      setError(e.response?.data?.detail || "Request failed.");
    } finally {
      set(key, false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-display font-semibold text-3xl text-ink mb-2">Generate</h1>
      <p className="text-ink-muted mb-8 max-w-2xl">
        Describe an image and generate it. Detailed prompts produce better results.
        First generation can take up to a minute.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="a serene mountain lake at sunset, painterly digital art…"
            rows={4}
            className="w-full p-3 bg-surface border border-surface-border rounded-lg text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
          <button onClick={generate} disabled={loading.gen || !prompt.trim()} className={`${btnPrimary} w-full mt-3`}>
            {loading.gen ? <>Generating <Dots /></> : "Generate image"}
          </button>

          {image && (
            <div className="flex gap-2 mt-4">
              <button onClick={() => run("caption")} disabled={loading.cap} className={`${btnGhost} flex-1`}>
                {loading.cap ? <Dots /> : "Caption"}
              </button>
              <button onClick={() => run("summary")} disabled={loading.sum} className={`${btnGhost} flex-1`}>
                {loading.sum ? <Dots /> : "Summarize"}
              </button>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-blush">{error}</p>}
          {caption && <ResultCard label="Caption" tone="sage">{caption}</ResultCard>}
          {summary && <ResultCard label="Summary" tone="butter">{summary}</ResultCard>}
        </div>

        <div className="min-h-[280px] flex items-center justify-center bg-surface border border-surface-border rounded-xl overflow-hidden">
          {loading.gen ? (
            <div className="text-ink-faint text-sm flex items-center gap-2">Rendering <Dots /></div>
          ) : image ? (
            <img src={`data:image/png;base64,${image}`} alt="Generated" className="w-full h-auto" />
          ) : (
            <p className="text-ink-faint text-sm px-6 text-center">Your generated image appears here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
