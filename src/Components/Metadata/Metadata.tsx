import Head from "next/head";
interface IMetaTagProps {
  image: string;
  pageDescription: string;
  pageTitle: string;
  pageUrl: string;
}
const MetaTag = ({
  image,
  pageDescription,
  pageTitle,
  pageUrl,
}: IMetaTagProps) => {
  return (
    <Head>
      {/* <!-- Primary Meta Tags --> */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <link rel="icon" href="/favicon.ico" />
      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription}></meta>
      <meta name="twitter:image" content={image} />
    </Head>
  );
};
export default MetaTag;