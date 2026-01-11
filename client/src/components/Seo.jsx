import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title} | NextSa Tech</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default Seo;