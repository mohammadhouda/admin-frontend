export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 120"
      className={className}
    >
      <defs>
        <linearGradient id="hopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      <g transform="translate(16, 18)">
        <path d="M 12 42 C 12 24, 28 12, 42 12 C 50 12, 56 16, 60 22"
          stroke="url(#iconGrad)" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M 72 42 C 72 60, 56 72, 42 72 C 34 72, 28 68, 24 62"
          stroke="url(#iconGrad)" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M 56 20 C 64 14, 76 18, 76 30"
          stroke="#0EA5E9" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M 28 64 C 20 70, 8 66, 8 54"
          stroke="#8B5CF6" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />

        <circle cx="42" cy="42" r="5" fill="url(#iconGrad)" opacity="0.9" />
        <circle cx="42" cy="42" r="2" fill="white" opacity="0.8" />
      </g>

      <text x="118" y="72" fontSize="48" fontWeight="700" fill="#1E293B">
        hope
      </text>
      <text x="247" y="72" fontSize="48" fontWeight="700" fill="url(#linkGrad)">
        link
      </text>

      <text x="120" y="96" fontSize="13" fill="#94A3B8" letterSpacing="3.5">
        CONNECTING WHAT MATTERS
      </text>
    </svg>
  );
}