"use client";

import { useEffect, useRef, useCallback } from 'react';

interface Planet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  radius: number;
  orbitPhase: number;
  orbitSpeed: number;
  orbitRadius: number;
  centerX: number;
  centerY: number;
}

interface GridPoint {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
}

export default function GravityGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, vx: 0, vy: 0 });
  const lastMouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(0);
  const animationRef = useRef<number>(0);
  const planetsRef = useRef<Planet[]>([]);
  const gridRef = useRef<GridPoint[][]>([]);
  const timeRef = useRef(0);
  const ripplesRef = useRef<{ x: number; y: number; time: number; strength: number }[]>([]);

  // Initialize planets with orbital paths
  const initPlanets = useCallback((width: number, height: number) => {
    const planets: Planet[] = [
      {
        x: 0, y: 0,
        vx: 0, vy: 0,
        mass: 2.5,
        radius: 60,
        orbitPhase: Math.random() * Math.PI * 2,
        orbitSpeed: 0.002,
        orbitRadius: Math.min(width, height) * 0.35,
        centerX: width * 0.3,
        centerY: height * 0.4,
      },
      {
        x: 0, y: 0,
        vx: 0, vy: 0,
        mass: 1.8,
        radius: 45,
        orbitPhase: Math.random() * Math.PI * 2,
        orbitSpeed: 0.0025,
        orbitRadius: Math.min(width, height) * 0.4,
        centerX: width * 0.7,
        centerY: height * 0.6,
      },
      {
        x: 0, y: 0,
        vx: 0, vy: 0,
        mass: 1.2,
        radius: 30,
        orbitPhase: Math.random() * Math.PI * 2,
        orbitSpeed: 0.003,
        orbitRadius: Math.min(width, height) * 0.25,
        centerX: width * 0.5,
        centerY: height * 0.3,
      },
    ];

    // Initialize positions
    planets.forEach(p => {
      p.x = p.centerX + Math.cos(p.orbitPhase) * p.orbitRadius;
      p.y = p.centerY + Math.sin(p.orbitPhase) * p.orbitRadius;
    });

    return planets;
  }, []);

  // Initialize grid
  const initGrid = useCallback((width: number, height: number, spacing: number) => {
    const grid: GridPoint[][] = [];
    const cols = Math.ceil(width / spacing) + 2;
    const rows = Math.ceil(height / spacing) + 2;

    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        const x = j * spacing - spacing;
        const y = i * spacing - spacing;
        grid[i][j] = { baseX: x, baseY: y, x, y };
      }
    }

    return grid;
  }, []);

  // Calculate gravitational displacement
  const calculateDisplacement = useCallback((
    px: number,
    py: number,
    planets: Planet[],
    mouseX: number,
    mouseY: number,
    mouseVx: number,
    mouseVy: number,
    ripples: { x: number; y: number; time: number; strength: number }[],
    time: number
  ) => {
    let dx = 0;
    let dy = 0;

    // Planet gravity
    for (const planet of planets) {
      const distX = planet.x - px;
      const distY = planet.y - py;
      const dist = Math.sqrt(distX * distX + distY * distY);
      const minDist = planet.radius * 0.3;
      const effectiveDist = Math.max(dist, minDist);

      // Inverse square law with smooth falloff - MUCH stronger
      const strength = (planet.mass * 15000) / (effectiveDist ** 1.5);
      const falloff = Math.exp(-dist / 600);

      let planetDx = (distX / effectiveDist) * strength * falloff;
      let planetDy = (distY / effectiveDist) * strength * falloff;

      // Cap displacement to never exceed distance to planet (prevents overshoot)
      const maxDisplacement = dist * 0.9; // Cap at 90% of distance
      const displacementMag = Math.sqrt(planetDx * planetDx + planetDy * planetDy);
      if (displacementMag > maxDisplacement && displacementMag > 0) {
        const scale = maxDisplacement / displacementMag;
        planetDx *= scale;
        planetDy *= scale;
      }

      dx += planetDx;
      dy += planetDy;

      // Trailing wake effect (grid stretches behind moving planets)
      const wake = planet.orbitSpeed * planet.orbitRadius * 0.3;
      const wakeAngle = planet.orbitPhase + Math.PI; // Behind the planet
      const wakeDirX = Math.cos(wakeAngle);
      const wakeDirY = Math.sin(wakeAngle);
      const wakeStrength = falloff * wake * 1.5;
      dx += wakeDirX * wakeStrength;
      dy += wakeDirY * wakeStrength;
    }

    // Mouse gravity (micro-mass) - MUCH stronger
    const mouseDistX = mouseX - px;
    const mouseDistY = mouseY - py;
    const mouseDist = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);
    const mouseRadius = 300;

    if (mouseDist < mouseRadius) {
      const mouseStrength = (3.0 * 2000) / (mouseDist ** 1.5);
      const mouseFalloff = 1 - (mouseDist / mouseRadius);

      let mouseDx = (mouseDistX / Math.max(mouseDist, 30)) * mouseStrength * mouseFalloff;
      let mouseDy = (mouseDistY / Math.max(mouseDist, 30)) * mouseStrength * mouseFalloff;

      // Cap displacement to never exceed distance to cursor (prevents overshoot)
      const maxMouseDisplacement = mouseDist * 0.9; // Cap at 90% of distance
      const mouseDisplacementMag = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
      if (mouseDisplacementMag > maxMouseDisplacement && mouseDisplacementMag > 0) {
        const scale = maxMouseDisplacement / mouseDisplacementMag;
        mouseDx *= scale;
        mouseDy *= scale;
      }

      dx += mouseDx;
      dy += mouseDy;

      // Velocity-based ripple effect
      const velocityMag = Math.sqrt(mouseVx * mouseVx + mouseVy * mouseVy);
      if (velocityMag > 0.001) {
        const rippleStrength = velocityMag * mouseFalloff * 40;
        dx += mouseVx * rippleStrength;
        dy += mouseVy * rippleStrength;
      }
    }

    // Ripple effects
    for (const ripple of ripples) {
      const rippleDistX = ripple.x - px;
      const rippleDistY = ripple.y - py;
      const rippleDist = Math.sqrt(rippleDistX * rippleDistX + rippleDistY * rippleDistY);
      const rippleAge = time - ripple.time;
      const rippleWaveRadius = rippleAge * 300;
      const rippleWidth = 80;

      if (Math.abs(rippleDist - rippleWaveRadius) < rippleWidth) {
        const wavePhase = (rippleDist - rippleWaveRadius) / rippleWidth * Math.PI;
        const waveStrength = Math.sin(wavePhase) * ripple.strength * Math.exp(-rippleAge * 2);

        if (rippleDist > 0) {
          dx += (rippleDistX / rippleDist) * waveStrength * 0.5;
          dy += (rippleDistY / rippleDist) * waveStrength * 0.5;
        }
      }
    }

    // Ambient breathing (very subtle)
    const breathe = Math.sin(time * 0.15) * 0.5;
    dx += breathe;
    dy += breathe * 0.7;

    return { dx, dy };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const gridSpacing = 40;

    // Resize handler
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);

      planetsRef.current = initPlanets(width, height);
      gridRef.current = initGrid(width, height, gridSpacing);
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse handler
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;

      mouseRef.current.vx = (newX - lastMouseRef.current.x * width) * 0.01;
      mouseRef.current.vy = (newY - lastMouseRef.current.y * height) * 0.01;
      mouseRef.current.x = newX / width;
      mouseRef.current.y = newY / height;

      lastMouseRef.current.x = mouseRef.current.x;
      lastMouseRef.current.y = mouseRef.current.y;

      // Create ripples on fast movement
      const velocity = Math.sqrt(
        mouseRef.current.vx * mouseRef.current.vx +
        mouseRef.current.vy * mouseRef.current.vy
      );
      if (velocity > 0.15 && ripplesRef.current.length < 5) {
        ripplesRef.current.push({
          x: newX,
          y: newY,
          time: timeRef.current,
          strength: Math.min(velocity * 20, 30),
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll handler
    const handleScroll = () => {
      scrollRef.current = window.pageYOffset;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop
    const render = (timestamp: number) => {
      const time = timestamp / 1000;
      timeRef.current = time;
      const deltaTime = 1 / 60;

      // Clear with deep space color
      ctx.fillStyle = '#020408';
      ctx.fillRect(0, 0, width, height);

      // Update planet positions (orbital motion)
      for (const planet of planetsRef.current) {
        planet.orbitPhase += planet.orbitSpeed * deltaTime * 60;
        const prevX = planet.x;
        const prevY = planet.y;

        planet.x = planet.centerX + Math.cos(planet.orbitPhase) * planet.orbitRadius;
        planet.y = planet.centerY + Math.sin(planet.orbitPhase) * planet.orbitRadius;

        planet.vx = planet.x - prevX;
        planet.vy = planet.y - prevY;
      }

      // Clean old ripples
      ripplesRef.current = ripplesRef.current.filter(r => time - r.time < 2);

      // Update grid points
      const grid = gridRef.current;
      const mouseX = mouseRef.current.x * width;
      const mouseY = mouseRef.current.y * height;

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          const point = grid[i][j];
          const { dx, dy } = calculateDisplacement(
            point.baseX,
            point.baseY,
            planetsRef.current,
            mouseX,
            mouseY,
            mouseRef.current.vx,
            mouseRef.current.vy,
            ripplesRef.current,
            time
          );

          // Smooth interpolation
          point.x = point.baseX + dx;
          point.y = point.baseY + dy;
        }
      }

      // Draw grid lines
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Calculate grid opacity with breathing
      const baseOpacity = 0.18 + Math.sin(time * 0.05) * 0.03;

      // Draw horizontal lines
      for (let i = 0; i < grid.length; i++) {
        ctx.beginPath();
        for (let j = 0; j < grid[i].length; j++) {
          const point = grid[i][j];

          // Calculate local distortion for color intensity
          const distortion = Math.sqrt(
            Math.pow(point.x - point.baseX, 2) +
            Math.pow(point.y - point.baseY, 2)
          );
          const intensity = Math.min(distortion / 50, 1);

          // Color - whiter base with slight blue tint, maize at high distortion
          const r = Math.floor(180 + intensity * 60);
          const g = Math.floor(190 + intensity * 40);
          const b = Math.floor(210 - intensity * 50);
          const alpha = baseOpacity + intensity * 0.2;

          if (j === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            // Gradient stroke
            const prevPoint = grid[i][j - 1];
            const gradient = ctx.createLinearGradient(
              prevPoint.x, prevPoint.y,
              point.x, point.y
            );

            const prevDistortion = Math.sqrt(
              Math.pow(prevPoint.x - prevPoint.baseX, 2) +
              Math.pow(prevPoint.y - prevPoint.baseY, 2)
            );
            const prevIntensity = Math.min(prevDistortion / 50, 1);

            const prevR = Math.floor(180 + prevIntensity * 60);
            const prevG = Math.floor(190 + prevIntensity * 40);
            const prevB = Math.floor(210 - prevIntensity * 50);
            const prevAlpha = baseOpacity + prevIntensity * 0.2;

            gradient.addColorStop(0, `rgba(${prevR}, ${prevG}, ${prevB}, ${prevAlpha})`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${alpha})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1 + intensity * 0.5;
            ctx.beginPath();
            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
          }
        }
      }

      // Draw vertical lines
      for (let j = 0; j < grid[0].length; j++) {
        for (let i = 1; i < grid.length; i++) {
          const point = grid[i][j];
          const prevPoint = grid[i - 1][j];

          const distortion = Math.sqrt(
            Math.pow(point.x - point.baseX, 2) +
            Math.pow(point.y - point.baseY, 2)
          );
          const intensity = Math.min(distortion / 50, 1);

          const prevDistortion = Math.sqrt(
            Math.pow(prevPoint.x - prevPoint.baseX, 2) +
            Math.pow(prevPoint.y - prevPoint.baseY, 2)
          );
          const prevIntensity = Math.min(prevDistortion / 50, 1);

          const r = Math.floor(180 + intensity * 60);
          const g = Math.floor(190 + intensity * 40);
          const b = Math.floor(210 - intensity * 50);
          const alpha = baseOpacity + intensity * 0.2;

          const prevR = Math.floor(180 + prevIntensity * 60);
          const prevG = Math.floor(190 + prevIntensity * 40);
          const prevB = Math.floor(210 - prevIntensity * 50);
          const prevAlpha = baseOpacity + prevIntensity * 0.2;

          const gradient = ctx.createLinearGradient(
            prevPoint.x, prevPoint.y,
            point.x, point.y
          );
          gradient.addColorStop(0, `rgba(${prevR}, ${prevG}, ${prevB}, ${prevAlpha})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${alpha})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1 + intensity * 0.5;
          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        }
      }

      // Draw planets
      for (const planet of planetsRef.current) {
        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          planet.x, planet.y, planet.radius * 0.8,
          planet.x, planet.y, planet.radius * 2.5
        );
        glowGradient.addColorStop(0, 'rgba(18, 59, 109, 0.15)');
        glowGradient.addColorStop(0.5, 'rgba(11, 30, 58, 0.08)');
        glowGradient.addColorStop(1, 'rgba(2, 4, 8, 0)');

        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Planet body
        const bodyGradient = ctx.createRadialGradient(
          planet.x - planet.radius * 0.3,
          planet.y - planet.radius * 0.3,
          0,
          planet.x,
          planet.y,
          planet.radius
        );
        bodyGradient.addColorStop(0, '#0a1628');
        bodyGradient.addColorStop(0.7, '#050c18');
        bodyGradient.addColorStop(1, '#020408');

        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = bodyGradient;
        ctx.fill();

        // Maize rim lighting
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        const rimGradient = ctx.createRadialGradient(
          planet.x + planet.radius * 0.5,
          planet.y + planet.radius * 0.5,
          planet.radius * 0.5,
          planet.x,
          planet.y,
          planet.radius * 1.1
        );
        rimGradient.addColorStop(0, 'rgba(140, 123, 26, 0)');
        rimGradient.addColorStop(0.8, 'rgba(140, 123, 26, 0.1)');
        rimGradient.addColorStop(1, 'rgba(60, 49, 0, 0.2)');
        ctx.fillStyle = rimGradient;
        ctx.fill();

        // Subtle surface texture (noise effect)
        ctx.globalAlpha = 0.03;
        for (let k = 0; k < 20; k++) {
          const angle = (k / 20) * Math.PI * 2 + time * 0.1;
          const dist = planet.radius * (0.3 + Math.sin(k * 3 + time) * 0.2);
          const tx = planet.x + Math.cos(angle) * dist;
          const ty = planet.y + Math.sin(angle) * dist;
          const size = 2 + Math.sin(k * 5) * 1;

          ctx.beginPath();
          ctx.arc(tx, ty, size, 0, Math.PI * 2);
          ctx.fillStyle = '#1a3a5c';
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // Draw cursor lensing effect
      const cursorRadius = 180;
      const cursorGradient = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, cursorRadius
      );
      cursorGradient.addColorStop(0, 'rgba(18, 59, 109, 0.12)');
      cursorGradient.addColorStop(0.3, 'rgba(11, 30, 58, 0.06)');
      cursorGradient.addColorStop(1, 'rgba(2, 4, 8, 0)');

      ctx.beginPath();
      ctx.arc(mouseX, mouseY, cursorRadius, 0, Math.PI * 2);
      ctx.fillStyle = cursorGradient;
      ctx.fill();

      // Vignette
      const vignetteGradient = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.3,
        width / 2, height / 2, Math.max(width, height) * 0.8
      );
      vignetteGradient.addColorStop(0, 'rgba(2, 4, 8, 0)');
      vignetteGradient.addColorStop(1, 'rgba(2, 4, 8, 0.4)');

      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, width, height);

      // Dust particles (very subtle)
      ctx.globalAlpha = 0.04;
      for (let i = 0; i < 40; i++) {
        const dustX = ((i * 137.5 + time * 5) % width);
        const dustY = ((i * 89.3 + time * 3) % height);
        const dustSize = 1 + (i % 3);

        ctx.beginPath();
        ctx.arc(dustX, dustY, dustSize, 0, Math.PI * 2);
        ctx.fillStyle = '#4a6fa5';
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initPlanets, initGrid, calculateDisplacement]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
}
