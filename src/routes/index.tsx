import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import barbershopInterior from "@/assets/barbershop-interior.jpg";
import { getPlaceData } from "@/lib/place-reviews.functions";

const placeQueryOptions = queryOptions({
  queryKey: ["place", "zr-barberia"],
  queryFn: () => getPlaceData(),
  staleTime: 1000 * 60 * 60, // 1h client cache
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Peluquería & Barbería Zr — Alcalá de Henares" },
      {
        name: "description",
        content:
          "Barbería de Zouhir en C. Libreros 40, Alcalá de Henares. 5,0★ en Google con 72 reseñas. Corte, barba y afeitado clásico. Reserva tu cita.",
      },
      { property: "og:title", content: "Peluquería & Barbería Zr — Alcalá de Henares" },
      {
        property: "og:description",
        content:
          "Barbería boutique en el corazón de Alcalá. Cortes personalizados, ambiente cuidado y trato impecable.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Oswald:wght@500;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          name: "Peluquería & Barbería Zr",
          image: "/og-image.jpg",
          telephone: "+34632519926",
          address: {
            "@type": "PostalAddress",
            streetAddress: "C. Libreros, 40",
            postalCode: "28801",
            addressLocality: "Alcalá de Henares",
            addressRegion: "Madrid",
            addressCountry: "ES",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "72",
          },
        }),
      },
    ],
  }),
  component: Index,
  loader: ({ context }) => context.queryClient.ensureQueryData(placeQueryOptions),
});

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatRating(r: number) {
  return r.toFixed(1).replace(".", ",");
}

const BOOKSY_URL =
  "https://booksy.com/es-es/169727_peluqueria-barberia-zr_barberia_53184_alcala-de-henares";

function openBooksy(e: React.MouseEvent<HTMLAnchorElement>) {
  // Forzar apertura en el navegador real (escapa de iframes/WebViews embebidos)
  e.preventDefault();
  const w = window.open(BOOKSY_URL, "_blank", "noopener,noreferrer");
  if (!w) {
    // Fallback si el navegador bloquea window.open
    window.top!.location.href = BOOKSY_URL;
  }
}

function Index() {
  const { data } = useSuspenseQuery(placeQueryOptions);
  const { rating, userRatingCount, reviews } = data;
  return (
    <div className="min-h-screen bg-brand-surface font-sans text-brand-black selection:bg-brand-gold/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brand-surface/80 backdrop-blur-md border-b border-brand-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#top" className="text-2xl font-display font-bold tracking-tighter uppercase">
            ZR <span className="text-brand-gold">Barbería</span>
          </a>
          <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest">
            <a href="#servicios" className="hover:text-brand-gold transition-colors">
              Servicios
            </a>
            <a href="#resenas" className="hover:text-brand-gold transition-colors">
              Reseñas
            </a>
            <a href="#ubicacion" className="hover:text-brand-gold transition-colors">
              Ubicación
            </a>
          </div>
          <a
            href="https://booksy.com/es-es/169727_peluqueria-barberia-zr_barberia_53184_alcala-de-henares"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-all"
          >
            Reservar en Booksy
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-brand-gold" aria-hidden>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <span className="text-xs font-bold tracking-widest uppercase opacity-60">
                {formatRating(rating)} ({userRatingCount} Reseñas en Google)
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold uppercase leading-[0.9] mb-8">
              El Arte del <br />
              <span className="text-brand-gold">Detalle</span> Masculino
            </h1>
            <p className="text-lg text-brand-black/70 max-w-md mb-10 leading-relaxed font-light">
              En Peluquería ZR combinamos la técnica clásica con un ambiente moderno y pulcro en el
              corazón de Alcalá de Henares. Zouhir te recibe con la atención que mereces.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="https://booksy.com/es-es/169727_peluqueria-barberia-zr_barberia_53184_alcala-de-henares"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 text-xs font-bold uppercase tracking-widest bg-brand-gold text-brand-black hover:bg-brand-black hover:text-white transition-all"
              >
                Reservar Online →
              </a>
              <a
                href="tel:+34632519926"
                className="px-6 py-4 text-xs font-bold uppercase tracking-widest border border-brand-black hover:bg-brand-black hover:text-white transition-all"
              >
                Llamar · 632 51 99 26
              </a>
              <div className="flex items-center gap-3 px-4 py-3 bg-white border border-brand-black/5 rounded-sm">
                <div className="size-2 rounded-full bg-green-500 animate-pulse" aria-hidden />
                <span className="text-xs font-medium uppercase">Abierto ahora</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img
              src={barbershopInterior}
              alt="Interior de Peluquería & Barbería Zr en Alcalá de Henares"
              width={1088}
              height={1344}
              className="w-full aspect-[4/5] object-cover outline-1 -outline-offset-1 outline-black/5"
            />
          </div>
        </div>
      </section>

      {/* Key Values */}
      <section className="bg-brand-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <span className="text-brand-gold font-display text-4xl italic">01</span>
            <h3 className="text-xl font-bold uppercase tracking-tight">Higiene Impecable</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Local extremadamente limpio y uso de desinfectantes específicos para la piel tras cada
              servicio.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-brand-gold font-display text-4xl italic">02</span>
            <h3 className="text-xl font-bold uppercase tracking-tight">Escucha Activa</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Cortes personalizados. Te escuchamos y asesoramos para lograr exactamente el estilo
              que buscas.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-brand-gold font-display text-4xl italic">03</span>
            <h3 className="text-xl font-bold uppercase tracking-tight">Puntualidad</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Respetamos tu tiempo. Sistema de cita previa para evitar esperas innecesarias.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-24 px-6 bg-brand-surface border-b border-brand-black/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold uppercase tracking-tighter italic mb-16">
            Servicios <br />& Tarifas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Corte de Cabello",
                desc: "Asesoramiento, lavado, corte a tijera o máquina y acabado con producto premium.",
                price: "15€",
              },
              {
                name: "Arreglo de Barba",
                desc: "Perfilado a navaja, toalla caliente y aceites hidratantes para un acabado impecable.",
                price: "10€",
              },
              {
                name: "Corte + Barba",
                desc: "El ritual completo. Corte personalizado y trabajo de barba en un solo servicio.",
                price: "22€",
              },
              {
                name: "Afeitado Clásico",
                desc: "Afeitado tradicional a navaja con doble toalla caliente y tónico refrescante.",
                price: "15€",
              },
              {
                name: "Corte Infantil",
                desc: "Cortes pacientes y cuidados para los más pequeños de la casa.",
                price: "12€",
              },
              {
                name: "Diseño de Cejas",
                desc: "Perfilado con pinza y navaja para enmarcar tu mirada con precisión.",
                price: "5€",
              },
            ].map((s) => (
              <div
                key={s.name}
                className="p-8 bg-white border border-brand-black/5 flex flex-col justify-between gap-6 hover:border-brand-gold transition-colors"
              >
                <div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-3">
                    {s.name}
                  </h3>
                  <p className="text-sm text-brand-black/60 leading-relaxed">{s.desc}</p>
                </div>
                <div className="flex items-end justify-between pt-4 border-t border-brand-black/5">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-black/40">
                    Desde
                  </span>
                  <span className="font-display text-3xl font-bold text-brand-gold">{s.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="resenas" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl font-display font-bold uppercase tracking-tighter italic">
              Lo que dicen <br />
              nuestros clientes
            </h2>
            <div className="text-right">
              <p className="text-brand-gold font-bold">
                {formatRating(rating)} ★ · {userRatingCount} reseñas en Google
              </p>
              <p className="text-xs font-medium uppercase tracking-widest text-brand-black/40">
                Alcalá de Henares, Madrid
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div
                key={`${r.authorName}-${i}`}
                className="p-8 border border-brand-black/5 bg-brand-surface flex flex-col justify-between"
              >
                <p className="text-sm italic leading-relaxed mb-6">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  {r.authorPhoto ? (
                    <img
                      src={r.authorPhoto}
                      alt={r.authorName}
                      width={40}
                      height={40}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="size-10 rounded-full object-cover bg-brand-black/5"
                    />
                  ) : (
                    <div className="size-10 rounded-full bg-brand-black/5 grid place-items-center text-[10px] font-bold">
                      {getInitials(r.authorName)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold uppercase">{r.authorName}</p>
                    <p className="text-[10px] text-brand-black/40 uppercase tracking-tighter">
                      {r.relativeTime} · {r.rating}/5
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación + Footer */}
      <footer
        id="ubicacion"
        className="py-20 px-6 bg-brand-surface border-t border-brand-black/5"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16">
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-brand-gold">
                Dirección
              </h4>
              <p className="text-xl font-display">
                C. Libreros, 40
                <br />
                28801 Alcalá de Henares, Madrid
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-brand-gold">
                Teléfono
              </h4>
              <a href="tel:+34632519926" className="text-xl font-display hover:text-brand-gold">
                632 51 99 26
              </a>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Peluquer%C3%ADa+%26+Barber%C3%ADa+Zr+Calle+Libreros+40+Alcal%C3%A1+de+Henares"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b-2 border-brand-black pb-1 font-bold uppercase tracking-widest text-sm hover:text-brand-gold hover:border-brand-gold transition-all"
            >
              Ver en Google Maps →
            </a>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              Horario Comercial
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex justify-between border-b border-brand-black/5 pb-2">
                <span>Lunes – Viernes</span>
                <span>10:00–14:00 · 17:00–21:00</span>
              </li>
              <li className="flex justify-between border-b border-brand-black/5 pb-2">
                <span>Sábado</span>
                <span>10:00–14:00 · 17:00–20:00</span>
              </li>
              <li className="flex justify-between text-brand-black/40">
                <span>Domingo</span>
                <span>Cerrado</span>
              </li>
            </ul>
          </div>

          <div className="bg-brand-black text-white p-10 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-brand-gold">
                Reserva ya
              </h4>
              <p className="font-display text-3xl uppercase leading-tight mb-8">
                Tu próximo corte, sin esperas.
              </p>
            </div>
            <div className="space-y-3">
              <a
                href="https://booksy.com/es-es/169727_peluqueria-barberia-zr_barberia_53184_alcala-de-henares"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-brand-gold text-brand-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors"
              >
                Reservar en Booksy →
              </a>
              <a
                href="tel:+34632519926"
                className="block text-center border border-white/20 text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-black transition-colors"
              >
                O llamar
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-brand-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">
            © 2026 ZR Barbería · Alcalá de Henares
          </p>
          <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">
            Especialistas en Corte & Barba
          </p>
        </div>
      </footer>
    </div>
  );
}
