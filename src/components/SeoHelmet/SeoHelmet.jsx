import { Helmet } from "react-helmet-async";

const SeoHelmet = ({
  title = "Juba Store | متجر جوبا - مواد كيميائية وطبية",
  description = "متجر جوبا: مورد موثوق للمواد الكيميائية، المستلزمات الطبية، والأدوية. جودة معتمدة بأسعار تنافسية. Juba Store: Trusted supplier of laboratory chemicals, medical supplies & pharmaceuticals with competitive pricing.",
  keywords = "Juba Store, متجر جوبا, مواد كيميائية, مستلزمات طبية, أدوية, كيماويات معملية, مستلزمات مختبرات, منتجات صيدلانية, كيماويات صناعية, معدات طبية, كيماويات تحليلية, منتجات طبية, Juba Chemicals, Medical supplies, Laboratory reagents, Pharmaceuticals, Industrial chemicals, Analytical chemistry, Medical equipment, صيدلية, كيماويات بحثية",
  image = "https://juba.com/images/chemical-store-og.jpg",
  url = "https://juba.com",
  type = "website",
  locale = "en",
}) => {
  return (
    <Helmet>
      {/* <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} /> */}
      
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Juba Chemicals" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Juba Chemical Store" />
      <meta property="og:locale" content={locale === 'ar' ? 'ar_AR' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@Juba_Chemicals" />
    </Helmet>
  );
};

export default SeoHelmet;