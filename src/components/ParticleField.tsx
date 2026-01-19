"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  brightness: number;
  type: "dot" | "line" | "glow";
  length?: number;
  angle?: number;
  speed: number;
  pulsePhase: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cyberpunk color palette from the Midjourney images
    const colors = {
      cyan: ["#00ffff", "#00e5ff", "#00bcd4", "#0097a7"],
      magenta: ["#ff00ff", "#ff0080", "#e91e63", "#c2185b"],
      blue: ["#2196f3", "#1976d2", "#0d47a1"],
      white: ["#ffffff", "#e0e0e0"],
    };

    const allColors = [...colors.cyan, ...colors.magenta, ...colors.blue];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const width = canvas.width;
      const height = canvas.height;

      // Dense floating dots (like data points)
      const dotCount = Math.floor((width * height) / 4000);
      for (let i = 0; i < dotCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 3 + 1,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          color: allColors[Math.floor(Math.random() * allColors.length)],
          brightness: Math.random() * 0.7 + 0.3,
          type: "dot",
          speed: Math.random() * 0.5 + 0.2,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Horizontal streaming lines (like data streams)
      const lineCount = Math.floor((width * height) / 20000);
      for (let i = 0; i < lineCount; i++) {
        const isHorizontal = Math.random() > 0.3;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 2 + 1,
          vx: isHorizontal ? (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1) : 0,
          vy: isHorizontal ? 0 : (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
          size: Math.random() * 1.5 + 0.5,
          color: Math.random() > 0.5 ? colors.cyan[0] : colors.magenta[0],
          brightness: Math.random() * 0.5 + 0.5,
          type: "line",
          length: Math.random() * 80 + 20,
          angle: isHorizontal ? 0 : Math.PI / 2,
          speed: Math.random() * 0.3 + 0.2,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Glowing orbs (larger, softer particles)
      const glowCount = Math.floor((width * height) / 50000);
      for (let i = 0; i < glowCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 2 + 2,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 20 + 10,
          color: Math.random() > 0.5 ? colors.cyan[0] : colors.magenta[0],
          brightness: Math.random() * 0.15 + 0.05,
          type: "glow",
          speed: Math.random() * 0.3 + 0.1,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      particlesRef.current = particles;
    };

    resizeCanvas();
    createParticles();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      frameRef.current++;
      const time = frameRef.current * 0.01;

      // Clear with fade effect for trails
      ctx.fillStyle = "rgba(10, 10, 10, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Sort by z-depth for proper layering
      particles.sort((a, b) => a.z - b.z);

      for (const p of particles) {
        // Pulsing brightness
        const pulse = Math.sin(time * 2 + p.pulsePhase) * 0.3 + 0.7;
        const currentBrightness = p.brightness * pulse;

        if (p.type === "dot") {
          // Mouse interaction - particles scatter from cursor
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.vx -= (dx / dist) * force * 0.8;
            p.vy -= (dy / dist) * force * 0.8;
          }

          // Update position
          p.x += p.vx;
          p.y += p.vy;

          // Damping
          p.vx *= 0.98;
          p.vy *= 0.98;

          // Add slight drift
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;

          // Wrap around edges
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          // Draw dot with glow
          const size = p.size * (1 / p.z);
          
          // Outer glow
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 4);
          gradient.addColorStop(0, p.color + Math.floor(currentBrightness * 80).toString(16).padStart(2, '0'));
          gradient.addColorStop(0.5, p.color + "20");
          gradient.addColorStop(1, "transparent");
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentBrightness;
          ctx.fill();
          ctx.globalAlpha = 1;

        } else if (p.type === "line") {
          // Streaming lines
          p.x += p.vx * p.speed;
          p.y += p.vy * p.speed;

          // Wrap around
          if (p.x < -100) p.x = canvas.width + 100;
          if (p.x > canvas.width + 100) p.x = -100;
          if (p.y < -100) p.y = canvas.height + 100;
          if (p.y > canvas.height + 100) p.y = -100;

          // Draw streaming line with gradient
          const length = p.length || 50;
          const endX = p.x - Math.cos(p.angle || 0) * length;
          const endY = p.y - Math.sin(p.angle || 0) * length;

          const gradient = ctx.createLinearGradient(p.x, p.y, endX, endY);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(0.3, p.color + "80");
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = p.size;
          ctx.globalAlpha = currentBrightness;
          ctx.stroke();
          ctx.globalAlpha = 1;

          // Bright head
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = currentBrightness * 0.8;
          ctx.fill();
          ctx.globalAlpha = 1;

        } else if (p.type === "glow") {
          // Large ambient glows
          p.x += p.vx;
          p.y += p.vy;

          // Soft boundary bounce
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          // Draw large soft glow
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, p.color + "40");
          gradient.addColorStop(0.5, p.color + "15");
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.globalAlpha = currentBrightness * pulse;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // Add occasional bright flashes (data bursts)
      if (Math.random() > 0.98) {
        const flashX = Math.random() * canvas.width;
        const flashY = Math.random() * canvas.height;
        const flashColor = Math.random() > 0.5 ? colors.cyan[0] : colors.magenta[0];
        
        const gradient = ctx.createRadialGradient(flashX, flashY, 0, flashX, flashY, 50);
        gradient.addColorStop(0, flashColor + "60");
        gradient.addColorStop(0.5, flashColor + "20");
        gradient.addColorStop(1, "transparent");
        
        ctx.beginPath();
        ctx.arc(flashX, flashY, 50, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0d0d1a 50%, #0a0a0a 100%)" }}
      aria-hidden="true"
    />
  );
}
