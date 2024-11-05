import Head from 'next/head';

const CanonicalLink = ({ url }) => {
  const canonicalUrl = `https://standard-carpets.com/${url}`;

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
};

export default CanonicalLink;
