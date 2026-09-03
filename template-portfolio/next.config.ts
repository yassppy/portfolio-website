import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Comprimir respuestas HTTP automáticamente
  compress: true,

  // Deshabilitar el header X-Powered-By (seguridad + menos bytes)
  poweredByHeader: false,

  images: {
    // Formatos modernos: AVIF primero (mejor compresión), luego WebP como fallback
    formats: ["image/avif", "image/webp"],

    // Calidades permitidas (el componente GalleryImage usa 80 en index=0, rest lazy)
    qualities: [75, 80],

    // Tamaños de dispositivo para srcset responsivo
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 96, 128, 256],

    // Tiempo de cache de imágenes optimizadas: 7 días
    minimumCacheTTL: 604800,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
      },
    ],
  },

  // Cabeceras de cache para assets estáticos del proyecto
  async headers() {
    return [
      {
        // Imágenes de proyectos — cache permanente (son assets versionados)
        source: "/projects/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
