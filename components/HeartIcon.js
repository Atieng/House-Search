export default function HeartIcon({ size = 18, filled = false, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth={filled ? 0 : 2}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 21s-6.7-4.35-9.3-8.1C.8 10.2 1.4 6.6 4.4 5.1c2.3-1.1 4.7-.2 6 1.6l1.6 2.1 1.6-2.1c1.3-1.8 3.7-2.7 6-1.6 3 1.5 3.6 5.1 1.7 7.8C18.7 16.65 12 21 12 21Z" />
    </svg>
  );
}
