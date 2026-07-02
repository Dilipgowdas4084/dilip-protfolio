import { useEffect, useRef } from 'react';

interface ParticleSphereProps {
  isDarkMode: boolean;
}

interface Particle {
  ox: number;
  oy: number;
  oz: number;
  speed: number;
  phase: number;
  colorSeed: number;
  sizeSeed: number;
}

export default function ParticleSphere({ isDarkMode }: ParticleSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const count = 420;
    let radius = Math.min(container.clientWidth, container.clientHeight) * 0.3;
    let time = 0;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      ctx.scale(dpr, dpr);
      radius = Math.min(container.clientWidth, container.clientHeight) * 0.32;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particles.push({
        ox: x, oy: y, oz: z,
        speed: 0.0002 + Math.random() * 0.0004,
        phase: Math.random() * Math.PI * 2,
        colorSeed: Math.random(),
        sizeSeed: Math.random(),
      });
    }

    let mouse = { x: 0, y: 0, active: false, rx: 0, ry: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      mouse.rx = mouse.x - container.clientWidth / 2;
      mouse.ry = mouse.y - container.clientHeight / 2;
    };
    const onMouseLeave = () => { mouse.active = false; };
    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    let angleX = 0.001;
    let angleY = 0.0015;
    let targetAngleX = 0.001;
    let targetAngleY = 0.0015;

    // Color palettes
    const DARK_COLORS = [
      [99, 102, 241],   // indigo
      [129, 140, 248],  // indigo-light
      [167, 139, 250],  // violet
      [56, 189, 248],   // sky
      [52, 211, 153],   // emerald (accent)
    ];

    const LIGHT_COLORS = [
      [99, 102, 241],   // indigo
      [79, 70, 229],    // indigo-dark
      [167, 139, 250],  // violet
      [14, 165, 233],   // sky
      [16, 185, 129],   // emerald
    ];

    const animate = () => {
      time += 0.008;
      const w = container.clientWidth;
      const h = container.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Ambient inner glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.1);
      if (isDarkMode) {
        glowGrad.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
        glowGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.02)');
        glowGrad.addColorStop(1, 'transparent');
      } else {
        glowGrad.addColorStop(0, 'rgba(99, 102, 241, 0.04)');
        glowGrad.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      // Equatorial ring
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 1.05, radius * 0.18, Math.PI * 0.15, 0, Math.PI * 2);
      ctx.strokeStyle = isDarkMode ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.06)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Rotation
      if (mouse.active) {
        targetAngleY = mouse.rx * 0.00008;
        targetAngleX = -mouse.ry * 0.00008;
      } else {
        targetAngleY = 0.0012;
        targetAngleX = 0.0007;
      }

      angleY += (targetAngleY - angleY) * 0.04;
      angleX += (targetAngleX - angleX) * 0.04;

      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);
      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);

      type ProjectedPoint = { px: number; py: number; scale: number; z2: number; brightness: number; colorSeed: number; sizeSeed: number };
      const projected: ProjectedPoint[] = [];

      for (let p of particles) {
        p.phase += 0.008;
        const flexR = radius * (0.97 + 0.03 * Math.sin(p.phase + p.colorSeed * Math.PI * 2));
        const mag = Math.sqrt(p.ox * p.ox + p.oy * p.oy + p.oz * p.oz);
        const scale0 = flexR / mag;
        const ox = p.ox * scale0;
        const oy = p.oy * scale0;
        const oz = p.oz * scale0;

        // Rotate X
        const y1 = oy * cosX - oz * sinX;
        const z1 = oy * sinX + oz * cosX;
        // Rotate Y
        let x2 = ox * cosY - z1 * sinY;
        let y2 = y1;
        const z2 = ox * sinY + z1 * cosY;

        // Mouse magnetic pull
        if (mouse.active) {
          const dx = x2 + cx - mouse.x;
          const dy = y2 + cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const force = (160 - dist) * 0.07;
            ctx.beginPath();
            ctx.moveTo(x2 + cx, y2 + cy);
            ctx.lineTo(mouse.x, mouse.y);
            const alpha = 0.1 * (1 - dist / 160);
            ctx.strokeStyle = `rgba(99,102,241, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            x2 -= (dx / dist) * force;
            y2 -= (dy / dist) * force;
          }
        }

        const fov = 450;
        const sc = fov / (fov + z2);
        const px = cx + x2 * sc;
        const py = cy + y2 * sc;
        const zBright = (fov - z2) / (fov * 1.6);
        const brightness = Math.max(0.08, Math.min(1.0, zBright));

        projected.push({ px, py, scale: sc, z2, brightness, colorSeed: p.colorSeed, sizeSeed: p.sizeSeed });
      }

      // Sort by depth for proper layering
      projected.sort((a, b) => a.z2 - b.z2);

      // Draw edges
      const maxDist = 40;
      for (let i = 0; i < projected.length; i += 2) {
        const a = projected[i];
        if (a.scale < 0.55) continue;
        const lookahead = Math.min(projected.length, i + 9);
        for (let j = i + 1; j < lookahead; j++) {
          const b = projected[j];
          if (a.colorSeed > 0.65 && b.colorSeed > 0.65) continue;
          const dx = a.px - b.px;
          const dy = a.py - b.py;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const avgAlpha = ((a.brightness + b.brightness) / 2) * (1 - d / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.strokeStyle = isDarkMode
              ? `rgba(99,102,241, ${avgAlpha})`
              : `rgba(79,70,229, ${avgAlpha * 0.8})`;
            ctx.lineWidth = (1 - d / maxDist) * 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      const colors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;
      for (const pt of projected) {
        const size = Math.max(0.8, pt.scale * 1.5 + pt.sizeSeed * 0.8);
        const colorIdx = Math.floor(pt.colorSeed * colors.length);
        const [r, g, b] = colors[Math.min(colorIdx, colors.length - 1)];

        ctx.beginPath();
        ctx.arc(pt.px, pt.py, size, 0, Math.PI * 2);

        if (pt.colorSeed > 0.82) {
          // Highlighted glow nodes
          ctx.fillStyle = `rgba(${r},${g},${b}, ${pt.brightness * 0.95})`;
          ctx.shadowBlur = isDarkMode ? 10 : 5;
          ctx.shadowColor = `rgba(${r},${g},${b}, 0.5)`;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (pt.colorSeed < 0.2) {
          ctx.fillStyle = `rgba(${r},${g},${b}, ${pt.brightness * 0.7})`;
          ctx.fill();
        } else {
          ctx.fillStyle = isDarkMode
            ? `rgba(220,224,255, ${pt.brightness * 0.65})`
            : `rgba(50,50,80, ${pt.brightness * 0.55})`;
          ctx.fill();
        }
      }

      // Core center pulse
      const pulseR = 3 + Math.sin(time * 3) * 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99,102,241,0.5)';
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(99,102,241,0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      resizeObserver.disconnect();
    };
  }, [isDarkMode]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
    </div>
  );
}
