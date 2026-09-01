import React from "react";

export function EthIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="16"
        cy="16"
        r="16"
        fill="#627EEA"
        fillOpacity="0.2"
        stroke="#627EEA"
        strokeWidth="1.5"
      />
      <path d="M16 4L15.8 4.7V20.2L16 20.4L23 16.3L16 4Z" fill="#627EEA" />
      <path d="M16 4L9 16.3L16 20.4V4Z" fill="#8DA2FB" />
      <path d="M16 21.6L15.9 21.7V27.7L16 28L23 17.5L16 21.6Z" fill="#627EEA" />
      <path d="M16 28V21.6L9 17.5L16 28Z" fill="#8DA2FB" />
      <path d="M16 20.4L23 16.3L16 13.1V20.4Z" fill="#4560C9" />
      <path d="M9 16.3L16 20.4V13.1L9 16.3Z" fill="#627EEA" />
    </svg>
  );
}

export function UsdtIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="16"
        cy="16"
        r="16"
        fill="#26A17B"
        fillOpacity="0.2"
        stroke="#26A17B"
        strokeWidth="1.5"
      />
      <path
        d="M17.9 14.5C17.9 14.4 17.8 14.3 17.5 14.3H14.5C14.2 14.3 14.1 14.4 14.1 14.5C14.1 15.6 15 16.5 16 16.5C17 16.5 17.9 15.6 17.9 14.5ZM16 7C10.5 7 6 7.7 6 8.6C6 9.4 9.8 10.1 14.5 10.2V12.1C9.6 12.3 6 13.3 6 14.5C6 15.7 9.6 16.7 14.5 16.9V24.5H17.5V16.9C22.4 16.7 26 15.7 26 14.5C26 13.3 22.4 12.3 17.5 12.1V10.2C22.2 10.1 26 9.4 26 8.6C26 7.7 21.5 7 16 7Z"
        fill="#26A17B"
      />
    </svg>
  );
}

export function UsdcIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="16"
        cy="16"
        r="16"
        fill="#2775CA"
        fillOpacity="0.2"
        stroke="#2775CA"
        strokeWidth="1.5"
      />
      <path
        d="M16 6C10.5 6 6 10.5 6 16C6 21.5 10.5 26 16 26C21.5 26 26 21.5 26 16C26 10.5 21.5 6 16 6ZM16 24C11.6 24 8 20.4 8 16C8 11.6 11.6 8 16 8C20.4 8 24 11.6 24 16C24 20.4 20.4 24 16 24ZM16.8 14.7C16.8 13.9 16.2 13.4 15.1 13.4H13.6V16.1H15.2C16.2 16.1 16.8 15.5 16.8 14.7ZM15.4 18.9C16.6 18.9 17.3 18.3 17.3 17.3C17.3 16.4 16.6 15.9 15.3 15.9H13.6V18.9H15.4ZM11.5 11.8H15.3C17.5 11.8 18.9 12.9 18.9 14.6C18.9 15.7 18.2 16.5 17.2 16.9C18.4 17.3 19.4 18.2 19.4 19.6C19.4 21.5 17.8 22.8 15.4 22.8H11.5V11.8Z"
        fill="#2775CA"
      />
    </svg>
  );
}

export function SolIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="16"
        cy="16"
        r="16"
        fill="#9945FF"
        fillOpacity="0.2"
        stroke="#14F195"
        strokeWidth="1.5"
      />
      <path d="M8.5 21.5L11.5 18.5H23.5L20.5 21.5H8.5Z" fill="url(#sol-g1)" />
      <path d="M8.5 10.5L11.5 7.5H23.5L20.5 10.5H8.5Z" fill="url(#sol-g2)" />
      <path d="M20.5 16L23.5 13H11.5L8.5 16H20.5Z" fill="url(#sol-g3)" />
      <defs>
        <linearGradient
          id="sol-g1"
          x1="8.5"
          y1="20"
          x2="23.5"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient id="sol-g2" x1="8.5" y1="9" x2="23.5" y2="9" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="sol-g3"
          x1="8.5"
          y1="14.5"
          x2="23.5"
          y2="14.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function BnbIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="16"
        cy="16"
        r="16"
        fill="#F3BA2F"
        fillOpacity="0.2"
        stroke="#F3BA2F"
        strokeWidth="1.5"
      />
      <path
        d="M16 7L19.5 10.5L16 14L12.5 10.5L16 7ZM21.5 12.5L25 16L21.5 19.5L18 16L21.5 12.5ZM10.5 12.5L14 16L10.5 19.5L7 16L10.5 12.5ZM16 18L19.5 21.5L16 25L12.5 21.5L16 18ZM16 14.5L17.5 16L16 17.5L14.5 16L16 14.5Z"
        fill="#F3BA2F"
      />
    </svg>
  );
}

export function BtcIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="16"
        cy="16"
        r="16"
        fill="#F7931A"
        fillOpacity="0.2"
        stroke="#F7931A"
        strokeWidth="1.5"
      />
      <path
        d="M21.5 14C21.9 12.5 21 11.2 19.2 10.7L19.8 8.4L18.4 8L17.8 10.3C17.4 10.2 17 10.1 16.6 10L17.2 7.7L15.8 7.3L15.2 9.6C14.9 9.5 14.6 9.5 14.3 9.4L14.3 9.3L12.3 8.8L11.9 10.4C11.9 10.4 13 10.7 13 10.7C13.6 10.8 13.7 11.2 13.7 11.4L13.1 13.8L13.1 13.9C13.1 14 13.1 14 13 14C12.9 14.1 12.8 14.1 12.7 14.1L11.4 13.8L10.7 15.4L12.6 15.9C12.9 16 13.3 16.1 13.6 16.2L13 18.6L14.4 19L15 16.6C15.4 16.7 15.8 16.8 16.2 16.9L15.6 19.3L17 19.7L17.6 17.3C20 17.7 21.8 17.3 22.3 15.3C22.7 13.7 22.2 12.8 21.1 12.3C21.8 12 22.3 11.3 22.1 10.3C21.5 14 21.5 14 21.5 14ZM19 16.6C18.6 18.2 15.9 17.3 15 17.1L15.7 14.3C16.6 14.5 19.4 15 19 16.6ZM19.6 12.9C19.2 14.4 16.9 13.6 16.2 13.4L16.8 11C17.5 11.2 19.9 11.5 19.6 12.9Z"
        fill="#F7931A"
      />
    </svg>
  );
}

export function MaticIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="16"
        cy="16"
        r="16"
        fill="#8247E5"
        fillOpacity="0.2"
        stroke="#8247E5"
        strokeWidth="1.5"
      />
      <path
        d="M20.5 13.5L16.5 11.2L12.5 13.5V18.1L16.5 20.4L20.5 18.1V13.5ZM16.5 18.8L13.7 17.2V14.4L16.5 16L19.3 14.4V17.2L16.5 18.8Z"
        fill="#8247E5"
      />
    </svg>
  );
}

export function CustomCoinIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="16"
        cy="16"
        r="16"
        fill="#38BDF8"
        fillOpacity="0.2"
        stroke="#38BDF8"
        strokeWidth="1.5"
      />
      <path
        d="M16 8L18.2 13.8L24 16L18.2 18.2L16 24L13.8 18.2L8 16L13.8 13.8L16 8Z"
        fill="#38BDF8"
      />
    </svg>
  );
}

export function getCoinLogo(symbol: string, className = "size-5 shrink-0") {
  const s = (symbol || "").toUpperCase();
  if (s === "ETH") return <EthIcon className={className} />;
  if (s === "USDT") return <UsdtIcon className={className} />;
  if (s === "USDC") return <UsdcIcon className={className} />;
  if (s === "SOL") return <SolIcon className={className} />;
  if (s === "BNB") return <BnbIcon className={className} />;
  if (s === "BTC") return <BtcIcon className={className} />;
  if (s === "MATIC" || s === "POL") return <MaticIcon className={className} />;
  return <CustomCoinIcon className={className} />;
}
