"use client";

import { useState } from "react";

export default function PropertyGallery({ images, title }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="gallery-main gallery-empty">
        <span>🏠 No photos yet</span>
      </div>
    );
  }

  const current = images[active];

  return (
    <div>
      <div className="gallery-main">
        <img src={current.src} alt={current.caption || title} />
        {current.caption && <span className="gallery-caption">{current.caption}</span>}
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((img, i) => (
            <button
              key={img.src}
              className={`gallery-thumb${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}${img.caption ? `: ${img.caption}` : ""}`}
            >
              <img src={img.src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
