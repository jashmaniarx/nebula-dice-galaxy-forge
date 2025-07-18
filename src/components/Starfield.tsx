import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  color: string;
}

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      const stars: Star[] = [];
      const colors = ['#9C27B0', '#00BCD4', '#FFEB3B', '#E0E0E0'];
      
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      starsRef.current = stars;
    };

    const createShootingStar = () => {
      const colors = ['#9C27B0', '#00BCD4', '#FFEB3B'];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.3), // Top third of screen
        length: Math.random() * 80 + 20,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        angle: Math.random() * 45 + 15, // 15-60 degrees
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw regular stars
      starsRef.current.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -star.size;
          star.x = Math.random() * canvas.width;
        }
        
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = star.color;
        ctx.shadowBlur = star.size * 3;
        ctx.shadowColor = star.color;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      // Create new shooting stars occasionally
      if (Math.random() < 0.003) {
        shootingStarsRef.current.push(createShootingStar());
      }
      
      // Update and draw shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        const radians = (star.angle * Math.PI) / 180;
        const dx = Math.cos(radians) * star.speed;
        const dy = Math.sin(radians) * star.speed;
        
        star.x += dx;
        star.y += dy;
        star.opacity -= 0.01;
        
        if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
          return false;
        }
        
        // Draw shooting star trail
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.strokeStyle = star.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = star.color;
        
        const tailX = star.x - Math.cos(radians) * star.length;
        const tailY = star.y - Math.sin(radians) * star.length;
        
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();
        ctx.restore();
        
        return true;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default Starfield;