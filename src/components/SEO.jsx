import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({ 
  title = 'Ronaldo Chiavegatti - Desenvolvedor Full Stack',
  description = 'Desenvolvedor Full Stack apaixonado por criar experiências web bonitas e funcionais. Confira meu portfólio e entre em contato!',
  image = '/og-image.jpg',
  url = 'https://seu-dominio.com'
}) => {
  return (
    <Helmet>
      {/* Título e Meta Tags Básicas */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Meta Tags Adicionais */}
      <meta name="theme-color" content="#6B46C1" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
    </Helmet>
  );
}; 