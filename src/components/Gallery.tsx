"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export default function Gallery() {
  const photos = [
    {
      src: "/images/photos/20241112_055734231_iOS.jpg",
      alt: "Тренинг в конференц-зале",
      caption: "Тайм-менеджмент"
    },
    {
      src: "/images/photos/20241113_070529201_iOS.jpg",
      alt: "Тренинг по мотивации",
      caption: "Пирамида мотивации"
    },
    {
      src: "/images/photos/20241114_094652781_iOS.jpg",
      alt: "Групповая работа на тренинге",
      caption: "Командная работа"
    },
    {
      src: "/images/photos/20241115_115834038_iOS.jpg",
      alt: "Выпускники с сертификатами",
      caption: "Вручение сертификатов"
    },
    {
      src: "/images/photos/20241203_115345219_iOS.jpg",
      alt: "Тренинг в креативном пространстве",
      caption: "Soft skills"
    },
    {
      src: "/images/photos/20241004_130415000_iOS.jpg",
      alt: "Корпоративный тренинг Sensata",
      caption: "Корпоративный тренинг"
    },
    {
      src: "/images/photos/20241113_114950139_iOS.jpg",
      alt: "Группа с тренером",
      caption: "Бизнес-тренинг"
    },
    {
      src: "/images/photos/IMG_1227.JPG",
      alt: "Тренинг Polpharma",
      caption: "Корпоративное обучение"
    },
    {
      src: "/images/photos/IMG_6890.JPG",
      alt: "Тренинг Лидерство",
      caption: "Лидерство"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Get visible slides (3 on desktop, 1 on mobile)
  const getVisiblePhotos = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % photos.length;
      result.push({ ...photos[index], index });
    }
    return result;
  };

  return (
    <section className="relative py-24 sm:py-32 section-subtle overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 scroll-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2D3A3C]">
              Наши <span className="text-gradient-primary">тренинги</span>
            </h2>
            <p className="text-xl text-[#546569] mt-4">
              Реальные моменты с обучения
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Navigation buttons */}
            <button
              onClick={() => { prevSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 5000); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#2D3A3C] hover:bg-white hover:scale-110 transition-all duration-300 -ml-4 md:ml-0"
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => { nextSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 5000); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#2D3A3C] hover:bg-white hover:scale-110 transition-all duration-300 -mr-4 md:mr-0"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slides container */}
            <div className="overflow-hidden mx-8 md:mx-16">
              <div className="flex gap-6 transition-transform duration-500 ease-out">
                {/* Mobile: 1 slide */}
                <div className="md:hidden w-full flex-shrink-0">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                    <Image
                      src={photos[currentIndex].src}
                      alt={photos[currentIndex].alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white font-semibold text-lg">{photos[currentIndex].caption}</p>
                    </div>
                  </div>
                </div>

                {/* Desktop: 3 slides */}
                <div className="hidden md:flex gap-6 w-full">
                  {getVisiblePhotos().map((photo, idx) => (
                    <div
                      key={photo.index}
                      className={`flex-1 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group transition-all duration-500 ${
                        idx === 1 ? 'scale-105 z-10' : 'scale-95 opacity-80'
                      }`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-semibold">{photo.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#00767D] w-8'
                      : 'bg-[#00767D]/30 hover:bg-[#00767D]/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00767D]/15 to-transparent"></div>
    </section>
  );
}
