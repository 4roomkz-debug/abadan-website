/**
 * Секция "Нам доверяют" с логотипами клиентов
 * Для использования в AbadanKz
 *
 * Требования:
 * - Next.js с App Router
 * - Framer Motion: npm install framer-motion
 * - Tailwind CSS
 * - Логотипы клиентов в папке public/images/clients/
 */

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// ============================================
// Компонент нейросети на фоне
// ============================================

interface NeuralBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  opacity?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

function NeuralBackground({
  particleCount = 60,
  connectionDistance = 180,
  opacity = 0.25,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Brand colors (Abadan & Company)
    const colors = {
      teal: '#00767D',
      tealLight: '#009BA3',
      gold: '#F0BB1E',
      goldLight: '#F5CA3B',
    };

    const colorArray = [colors.teal, colors.tealLight, colors.gold, colors.goldLight];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 2 + Math.random() * 2,
        color: colorArray[Math.floor(Math.random() * colorArray.length)],
      }));
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > rect.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(rect.width, particle.x));
        }
        if (particle.y < 0 || particle.y > rect.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(rect.height, particle.y));
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = opacity * 2.5;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const lineOpacity = (1 - distance / connectionDistance) * opacity * 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = lineOpacity;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particleCount, connectionDistance, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

// ============================================
// Логотипы клиентов
// ============================================

const clientLogos = [
  { name: 'Samruk-Kazyna', logo: '/images/clients/samruk.png' },
  { name: 'КазМунайГаз', logo: '/images/clients/kmg.png' },
  { name: 'Kaspi', logo: '/images/clients/kaspi.png' },
  { name: 'Kcell', logo: '/images/clients/kcell.png' },
  { name: 'КТЖ', logo: '/images/clients/ktj.png' },
  { name: 'InDrive', logo: '/images/clients/indrive.png' },
  { name: 'KAZ Minerals', logo: '/images/clients/kazminerals.png' },
  { name: 'Рахат', logo: '/images/clients/rakhat.png' },
  { name: 'Santo', logo: '/images/clients/santo.png' },
  { name: 'Атамекен', logo: '/images/clients/atameken.png' },
  { name: 'КазРосГаз', logo: '/images/clients/kazrosgaz.png' },
  { name: 'OMV Petrom', logo: '/images/clients/petro.png' },
];

// ============================================
// Основной компонент секции
// ============================================

export function ClientsSection() {
  // Дублируем логотипы для бесшовной прокрутки
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="relative py-16 md:py-24 bg-[#2D3A3C] overflow-hidden">
      {/* Анимированный фон с нейросетью */}
      <NeuralBackground
        particleCount={60}
        connectionDistance={180}
        opacity={0.25}
      />

      {/* Контент */}
      <div className="relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-12 px-4">
          <span className="inline-block px-4 py-2 bg-[#00767D]/20 text-[#009BA3] rounded-full text-sm font-medium mb-4">
            Нам доверяют
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Среди наших клиентов
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ведущие компании Казахстана, которые выбрали нас для развития своих команд
          </p>
        </div>

        {/* Прокручивающиеся логотипы */}
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-8"
            animate={{
              x: [0, -160 * clientLogos.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 25,
                ease: 'linear',
              },
            }}
          >
            {duplicatedLogos.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-xl min-w-[140px] h-20"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={100}
                  height={50}
                  className="object-contain max-h-10"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Статистика */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center px-4">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-[#00767D] mb-2">359</div>
            <div className="text-gray-400">компаний</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-[#F0BB1E] mb-2">50 000+</div>
            <div className="text-gray-400">обученных</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-[#009BA3] mb-2">200+</div>
            <div className="text-gray-400">экспертов</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Использование:
// ============================================
//
// import { ClientsSection } from './ClientsSection';
//
// export default function Page() {
//   return (
//     <main>
//       {/* ... другие секции ... */}
//       <ClientsSection />
//       {/* ... другие секции ... */}
//     </main>
//   );
// }
//
// Не забудьте скопировать логотипы в public/images/clients/
