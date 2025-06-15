import React, { useState, useEffect } from "react";

const iconStyle = { position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", color: "#888" };

export default function InputWithIcon({ icon, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="input-with-icon">
      {React.cloneElement(icon, { size: 16, style: iconStyle })}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onWheel={type === "number" ? (e) => e.target.blur() : undefined}
      />
    </div>
  );
}