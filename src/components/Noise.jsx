export function Noise({ size = 0.5, density = 100, color = 'rgba(0, 0, 0, 0.2)' }) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 200;
  canvas.height = 200;
  
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const shouldDraw = Math.random() * 100 < density;
    if (shouldDraw) {
      data[i] = 0; // R
      data[i + 1] = 0; // G
      data[i + 2] = 0; // B
      data[i + 3] = Math.random() * 255; // A (random alpha for variation)
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

export default function NoiseOverlay({ size = 0.5, density = 100, color = 'rgba(0, 0, 0, 1)' }) {
  const noiseDataUrl = Noise({ size, density, color });
  
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${noiseDataUrl})`,
        backgroundSize: `${size * 100}px ${size * 100}px`,
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
      }}
    />
  );
}
