"use client";

import Image from "next/image";

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
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 section-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2D3A3C]">
              Наши <span className="text-gradient-primary">тренинги</span>
            </h2>
            <p className="text-xl text-[#546569] mt-4">
              Реальные моменты с обучения
            </p>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {photos.map((photo, index) => (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-2xl scroll-fade-in scroll-delay-${(index % 3) + 1} ${
                  index === 0 || index === 5 ? 'row-span-1 md:row-span-2' : ''
                }`}
              >
                <div className={`relative ${index === 0 || index === 5 ? 'h-64 md:h-full' : 'h-48 md:h-64'}`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium text-sm md:text-base">{photo.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00767D]/15 to-transparent"></div>
    </section>
  );
}
