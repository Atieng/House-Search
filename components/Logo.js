export default function Logo({ size = 34, showWordmark = true, light = false }) {
  return (
    <div className="logo">
      <span className="logo-mark" aria-hidden="true">
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hs-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#6E9FFF" />
              <stop offset="1" stopColor="#0B2447" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="11" fill="url(#hs-grad)" />
          {/* roof */}
          <path d="M20 9L31 18.5V31C31 31.5523 30.5523 32 30 32H10C9.44772 32 9 31.5523 9 31V18.5L20 9Z" fill="white" fillOpacity="0.95" />
          {/* door */}
          <path d="M17 32V23C17 22.4477 17.4477 22 18 22H22C22.5523 22 23 22.4477 23 23V32H17Z" fill="#0B2447" />
          {/* magnifier accent for "search" */}
          <circle cx="27.5" cy="27.5" r="4.5" fill="#F2A93B" stroke="white" strokeWidth="1.5" />
          <line x1="30.8" y1="30.8" x2="33.5" y2="33.5" stroke="#F2A93B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      {showWordmark && (
        <span style={light ? { color: "#fff" } : undefined}>
          House <span className="h-accent">Search</span>
        </span>
      )}
    </div>
  );
}
