import React from 'react';

/**
 * LOGO COMPONENT
 * Update this file to change the logo across the entire website.
 * You can replace the SVG below with an <img> tag or another SVG.
 */
export const Logo = ({ className = "w-6 h-6" }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Circular sticker backing accent */}
      <circle cx="50" cy="50" r="46" fill="black" stroke="rgba(222, 219, 200, 0.2)" strokeWidth="3" />
      {/* Custom styled italic Serif 'S' */}
      <text
        x="51%"
        y="54%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="'Instrument Serif', serif"
        fontStyle="italic"
        fontWeight="bold"
        fontSize="65"
        fill="#DEDBC8"
      >
        S
      </text>
    </svg>
  );
};

export default Logo;
