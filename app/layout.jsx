import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.daplink.online'), // ✅ Fixes image links for social cards
  title: {
    default: 'DapLink | Secure Your Priority Username',
    template: '%s | DapLink',
  },
  description: 'Join the official wishlist for DapLink. The professional link-in-bio platform with zero limits. Reserve your unique handle and get early access to premium themes.',
  
  keywords: [
    'link in bio', 
    'portfolio builder', 
    'creator tools', 
    'daplink', 
    'waitlist', 
    'username reservation',
    'developer portfolio'
  ],
  
  authors: [{ name: 'DapLink Team' }],
  
  // 📱 How it looks on Discord, LinkedIn, Facebook
  openGraph: {
    title: 'DapLink - The Professional Link-in-Bio',
    description: 'Stop using basic link tools. Join the DapLink wishlist to secure your custom username and get early access.',
    url: 'https://www.daplink.online',
    siteName: 'DapLink',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png', // You need to add this image to your public folder!
        width: 1200,
        height: 630,
        alt: 'DapLink Wishlist Preview',
      },
    ],
  },
  
  // 🐦 How it looks on Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: 'DapLink | Reserve Your Handle',
    description: 'The next-gen link-in-bio is coming. Secure your username now.',
    images: ['/opengraph-image.png'], // Same image as above
  },
  
  // 🤖 SEO Crawlers
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
