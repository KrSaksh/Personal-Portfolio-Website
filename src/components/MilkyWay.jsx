/**
 * MilkyWay — fixed full-page canvas background.
 * Renders entirely in CSS/Canvas 2D (no Three.js overhead) so it doesn't
 * interfere with the R3F canvases in Hero and Projects.
 */
import { useEffect, useRef } from 'react';

export default function MilkyWay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Pre-generate stars once ──────────────────────────────────────────────
    const STAR_COUNT = 2800;
    const stars = Array.from({ length: STAR_COUNT }, () => {
      // Milky Way band: concentrate stars along a diagonal band
      const inBand = Math.random() < 0.55;
      let x, y;
      if (inBand) {
        // Band runs diagonally across the screen
        const t = Math.random();
        const bandX = t * 1.4 - 0.2;           // -0.2 → 1.2 (wider than screen)
        const bandY = 0.15 + t * 0.7;           // top-left to bottom-right
        const spread = 0.18;
        x = (bandX + (Math.random() - 0.5) * spread);
        y = (bandY + (Math.random() - 0.5) * spread * 0.5);
      } else {
        x = Math.random();
        y = Math.random();
      }
      const size   = Math.random() < 0.04 ? 1.8 + Math.random() * 1.4   // bright stars
                   : Math.random() < 0.2  ? 0.9 + Math.random() * 0.6   // medium
                   :                        0.2 + Math.random() * 0.4;   // dim
      // Star colour: mostly white/blue-white, some warm
      const hue    = Math.random() < 0.7 ? 210 + Math.random() * 40
                   : Math.random() < 0.5 ? 30  + Math.random() * 20
                   :                       280 + Math.random() * 30;
      const sat    = 20 + Math.random() * 60;
      const lum    = 70 + Math.random() * 30;
      const alpha  = inBand ? 0.4 + Math.random() * 0.6 : 0.2 + Math.random() * 0.8;
      const twinkleSpeed = 0.3 + Math.random() * 1.2;
      const twinklePhase = Math.random() * Math.PI * 2;
      return { x, y, size, hue, sat, lum, alpha, twinkleSpeed, twinklePhase };
    });

    // ── Nebula blobs ─────────────────────────────────────────────────────────
    const nebulae = [
      { x: 0.15, y: 0.25, r: 0.22, color: '123,47,255',  a: 0.045 },
      { x: 0.75, y: 0.55, r: 0.18, color: '0,180,255',   a: 0.035 },
      { x: 0.45, y: 0.75, r: 0.25, color: '255,80,120',  a: 0.03  },
      { x: 0.85, y: 0.15, r: 0.14, color: '80,255,180',  a: 0.025 },
      { x: 0.3,  y: 0.6,  r: 0.16, color: '255,160,40',  a: 0.02  },
    ];

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      t += 0.008;

      // Background
      ctx.fillStyle = '#020408';
      ctx.fillRect(0, 0, W, H);

      // Milky Way band glow
      const bandGrad = ctx.createLinearGradient(0, H * 0.1, W, H * 0.9);
      bandGrad.addColorStop(0,   'rgba(60,80,160,0)');
      bandGrad.addColorStop(0.3, 'rgba(60,80,160,0.06)');
      bandGrad.addColorStop(0.5, 'rgba(80,100,200,0.10)');
      bandGrad.addColorStop(0.7, 'rgba(60,80,160,0.06)');
      bandGrad.addColorStop(1,   'rgba(60,80,160,0)');
      ctx.fillStyle = bandGrad;
      ctx.fillRect(0, 0, W, H);

      // Nebulae
      nebulae.forEach(n => {
        const grd = ctx.createRadialGradient(n.x * W, n.y * H, 0, n.x * W, n.y * H, n.r * W);
        grd.addColorStop(0,   `rgba(${n.color},${n.a})`);
        grd.addColorStop(0.5, `rgba(${n.color},${n.a * 0.4})`);
        grd.addColorStop(1,   `rgba(${n.color},0)`);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      });

      // Stars
      stars.forEach(s => {
        const twinkle = 0.6 + 0.4 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        const a = s.alpha * twinkle;
        const sx = s.x * W;
        const sy = s.y * H;

        // Glow for brighter stars
        if (s.size > 1.2) {
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.size * 3);
          grd.addColorStop(0,   `hsla(${s.hue},${s.sat}%,${s.lum}%,${a * 0.6})`);
          grd.addColorStop(1,   `hsla(${s.hue},${s.sat}%,${s.lum}%,0)`);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(sx, sy, s.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core
        ctx.fillStyle = `hsla(${s.hue},${s.sat}%,${s.lum}%,${a})`;
        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross diffraction spike for very bright stars
        if (s.size > 2) {
          ctx.strokeStyle = `hsla(${s.hue},${s.sat}%,${s.lum}%,${a * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(sx - s.size * 4, sy);
          ctx.lineTo(sx + s.size * 4, sy);
          ctx.moveTo(sx, sy - s.size * 4);
          ctx.lineTo(sx, sy + s.size * 4);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
