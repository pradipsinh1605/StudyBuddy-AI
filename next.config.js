/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Security Headers — Hacker થી protect કરે
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // XSS attacks રોકે
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Clickjacking રોકે
          { key: "X-Frame-Options", value: "DENY" },
          // MIME sniffing રોકે
          { key: "X-Content-Type-Options", value: "nosniff" },
          // HTTPS enforce કરે
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Referrer info control
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          // Permissions policy
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://*.supabase.co https://api.dify.ai",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // ✅ Performance optimizations
  compress: true,
  poweredByHeader: false, // "X-Powered-By: Next.js" hide કરે (security)
  
  // ✅ Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },

  // ✅ Strict mode for catching bugs early
  reactStrictMode: true,
};

module.exports = nextConfig;
