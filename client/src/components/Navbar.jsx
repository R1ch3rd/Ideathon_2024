import { NavLink } from "react-router-dom";

const link = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm transition-colors ${
    isActive ? "text-ink font-medium" : "text-ink-muted hover:text-ink"
  }`;

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 bg-cream/85 backdrop-blur border-b border-surface-border">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 bg-accent-btn rounded-lg flex items-center justify-center text-white font-mono text-sm font-semibold">
            PP
          </span>
          <span className="text-lg font-display font-semibold text-ink">PixelPerfect</span>
        </NavLink>
        <div className="flex items-center gap-1">
          <NavLink to="/" className={link} end>Home</NavLink>
          <NavLink to="/generate" className={link}>Generate</NavLink>
          <NavLink to="/analyze" className={link}>Analyze</NavLink>
        </div>
      </div>
    </nav>
  );
}
