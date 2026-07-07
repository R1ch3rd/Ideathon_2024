import { useNavigate } from "react-router-dom";

const features = [
  {
    to: "/generate",
    title: "Generate images",
    body: "Describe anything in a prompt and get a generated image back, then caption or summarize it with AI.",
    cta: "Open generator",
  },
  {
    to: "/analyze",
    title: "Analyze photos",
    body: "Upload an image to sharpen it, generate a ViT-GPT2 caption, or produce a Gemini-written summary.",
    cta: "Open analyzer",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <div className="text-center mb-14">
        <h1 className="font-display font-semibold text-4xl sm:text-5xl text-ink mb-4">
          PixelPerfect
        </h1>
        <p className="text-lg text-ink-muted max-w-2xl mx-auto">
          An AI image studio: generate visuals from text, caption and summarize
          them, and sharpen photos. Built as a hackathon project and portfolio demo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {features.map((f) => (
          <button
            key={f.to}
            onClick={() => navigate(f.to)}
            className="text-left bg-surface p-7 rounded-xl border border-surface-border hover:border-accent transition-colors"
          >
            <h3 className="text-lg font-semibold text-ink mb-2">{f.title}</h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-4">{f.body}</p>
            <span className="text-sm font-medium text-accent-deep">{f.cta} →</span>
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-ink-faint max-w-2xl mx-auto">
        Originally used Stable Diffusion on GPU with a Firebase-backed image
        library. This public demo generates through a free image API and runs
        the models on CPU; the searchable library is disabled.
      </p>
    </div>
  );
}
