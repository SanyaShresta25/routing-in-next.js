// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        pathname: '/**',
        port: ''
      } as RemotePattern,
    ],
  },
};

export default withNextIntl(nextConfig);
