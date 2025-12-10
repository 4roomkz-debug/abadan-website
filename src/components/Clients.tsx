"use client";

export default function Clients() {
  const clients = [
    { name: "Самрук-Казына", logo: "/images/clients/samruk.png" },
    { name: "КазМунайГаз", logo: "/images/clients/kmg.png" },
    { name: "Kaspi Bank", logo: "/images/clients/kaspi.png" },
    { name: "Kcell", logo: "/images/clients/kcell.png" },
    { name: "КТЖ", logo: "/images/clients/ktj.png" },
    { name: "inDrive", logo: "/images/clients/indrive.png" },
    { name: "Kazminerals", logo: "/images/clients/kazminerals.png" },
    { name: "Рахат", logo: "/images/clients/rakhat.png" },
    { name: "Santo", logo: "/images/clients/santo.png" },
    { name: "Атамекен", logo: "/images/clients/atameken.png" },
    { name: "КазРосГаз", logo: "/images/clients/kazrosgaz.png" },
    { name: "ПетроКазахстан", logo: "/images/clients/petro.png" },
    { name: "Кашаган", logo: "/images/clients/kashagan.png" },
    { name: "ММГ", logo: "/images/clients/mmg.png" },
    { name: "Байтерек", logo: "/images/clients/baiterek.png" },
    { name: "КБМ", logo: "/images/clients/kbm.png" },
    { name: "КомМунай", logo: "/images/clients/kommunay.png" },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#FAFAFA]">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#18181B]">
              Нам <span className="text-[#D4AF37]">доверяют</span>
            </h2>
            <p className="text-xl text-[#71717A] max-w-2xl mx-auto">
              Ведущие компании Казахстана и СНГ
            </p>
          </div>

          {/* Logos grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
            {clients.map((client, index) => (
              <div
                key={index}
                className="group relative aspect-[3/2] rounded-xl bg-white border border-[#E4E4E7] hover:border-[#D4AF37]/50 hover:shadow-lg transition-all duration-300 flex items-center justify-center p-4 sm:p-5"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}

            {/* "And more" card */}
            <div className="relative aspect-[3/2] rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center p-4 sm:p-5 text-center">
              <p className="text-[#050508] font-bold text-sm sm:text-base leading-tight">
                +340<br />
                <span className="font-medium text-xs sm:text-sm opacity-80">компаний</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>
    </section>
  );
}
