import { SITE } from '../config/site';
import type { Propiedad } from './tokko';
import { precioDe } from './tokko';

export const abs = (path: string) => new URL(path, SITE.url).toString();

export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': abs('/#inmobiliaria'),
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: abs('/logo-dark.png'),
    image: abs('/logo-dark.png'),
    telephone: '+' + SITE.whatsapp,
    email: SITE.email,
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: ['Salsipuedes', 'Río Ceballos', 'Unquillo', 'Sierras Chicas', 'Córdoba'].map((n) => ({ '@type': 'Place', name: n })),
    openingHoursSpecification: SITE.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [SITE.social.instagram, SITE.social.facebook].filter(Boolean),
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href) })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function propiedadJsonLd(p: Propiedad, url: string) {
  const precio = precioDe(p);
  const tipoSchema =
    p.tipoSlug === 'casas' || p.tipoSlug === 'duplex' || p.tipoSlug === 'cabanas' || p.tipoSlug === 'quintas'
      ? 'SingleFamilyResidence'
      : p.tipoSlug === 'departamentos' || p.tipoSlug === 'ph'
        ? 'Apartment'
        : p.tipoSlug === 'terrenos'
          ? 'Landform'
          : 'Place';
  const lugar: Record<string, unknown> = {
    '@type': tipoSchema,
    name: p.titulo,
    address: { '@type': 'PostalAddress', addressLocality: p.localidad, addressRegion: 'Córdoba', addressCountry: 'AR' },
  };
  if (p.dormitorios && tipoSchema !== 'Landform' && tipoSchema !== 'Place') lugar.numberOfBedrooms = p.dormitorios;
  if (p.banos && tipoSchema !== 'Landform' && tipoSchema !== 'Place') lugar.numberOfBathroomsTotal = p.banos;
  if (p.supCubierta) lugar.floorSize = { '@type': 'QuantitativeValue', value: p.supCubierta, unitCode: 'MTK' };

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: p.titulo,
    url,
    description: p.descripcion.slice(0, 500),
    image: p.fotos.slice(0, 6).map((f) => f.url),
    about: lugar,
    provider: { '@id': abs('/#inmobiliaria') },
  };
  if (precio?.valor && precio.moneda) {
    data.offers = {
      '@type': 'Offer',
      price: precio.valor,
      priceCurrency: precio.moneda,
      availability: 'https://schema.org/InStock',
      businessFunction: precio.operacion === 'venta' ? 'http://purl.org/goodrelations/v1#Sell' : 'http://purl.org/goodrelations/v1#LeaseOut',
    };
  }
  return data;
}
