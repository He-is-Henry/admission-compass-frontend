export default function loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#013468",
        gap: "24px",
      }}
    >
      <svg
        className="compass-spin"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
      >
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="60 104"
          strokeLinecap="round"
        />
        <polygon points="28,10 31,26 28,28" fill="white" />
        <polygon points="28,46 25,30 28,28" fill="rgba(255,255,255,0.4)" />
        <polygon points="10,28 26,25 28,28" fill="rgba(255,255,255,0.4)" />
        <polygon points="46,28 30,31 28,28" fill="rgba(255,255,255,0.6)" />
        <circle cx="28" cy="28" r="3" fill="white" />
      </svg>
      <p
        style={{
          color: "rgba(255,255,255,0.7)",
          fontFamily: "Poppins, sans-serif",
          fontSize: "15px",
          letterSpacing: "0.04em",
        }}
      >
        Finding your path...
      </p>
    </div>
  );
}
