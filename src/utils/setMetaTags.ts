export function setMetaTags(pageTitle:string, pageDescription:string, pageUrl:string, image:string) {
    // Set the title tag
    document.title = pageTitle;
  
    // Set meta tags for title and description
    let titleMetaTag = document.querySelector('meta[name="title"]');
    if (!titleMetaTag) {
      titleMetaTag = document.createElement('meta');
      titleMetaTag.setAttribute('name', 'title');
      document.head.appendChild(titleMetaTag);
    }
    titleMetaTag.setAttribute('content', pageTitle);
  
    let descriptionMetaTag = document.querySelector('meta[name="description"]');
    if (!descriptionMetaTag) {
      descriptionMetaTag = document.createElement('meta');
      descriptionMetaTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionMetaTag);
    }
    descriptionMetaTag.setAttribute('content', pageDescription);
  
    // Set link tag for favicon
    let faviconLinkTag = document.querySelector('link[rel="icon"]');
    if (!faviconLinkTag) {
      faviconLinkTag = document.createElement('link');
      faviconLinkTag.setAttribute('rel', 'icon');
      document.head.appendChild(faviconLinkTag);
    }
    faviconLinkTag.setAttribute('href', '/favicon.ico');
  
    // Set Open Graph meta tags
    let ogTypeMetaTag = document.querySelector('meta[property="og:type"]');
    if (!ogTypeMetaTag) {
      ogTypeMetaTag = document.createElement('meta');
      ogTypeMetaTag.setAttribute('property', 'og:type');
      document.head.appendChild(ogTypeMetaTag);
    }
    ogTypeMetaTag.setAttribute('content', 'website');
  
    let ogUrlMetaTag = document.querySelector('meta[property="og:url"]');
    if (!ogUrlMetaTag) {
      ogUrlMetaTag = document.createElement('meta');
      ogUrlMetaTag.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlMetaTag);
    }
    ogUrlMetaTag.setAttribute('content', pageUrl);
  
    let ogTitleMetaTag = document.querySelector('meta[property="og:title"]');
    if (!ogTitleMetaTag) {
      ogTitleMetaTag = document.createElement('meta');
      ogTitleMetaTag.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleMetaTag);
    }
    ogTitleMetaTag.setAttribute('content', pageTitle);
  
    let ogDescriptionMetaTag = document.querySelector('meta[property="og:description"]');
    if (!ogDescriptionMetaTag) {
      ogDescriptionMetaTag = document.createElement('meta');
      ogDescriptionMetaTag.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescriptionMetaTag);
    }
    ogDescriptionMetaTag.setAttribute('content', pageDescription);
  
    let ogImageMetaTag = document.querySelector('meta[property="og:image"]');
    if (!ogImageMetaTag) {
      ogImageMetaTag = document.createElement('meta');
      ogImageMetaTag.setAttribute('property', 'og:image');
      document.head.appendChild(ogImageMetaTag);
    }
    ogImageMetaTag.setAttribute('content', image);
  
    // Set Twitter meta tags
    let twitterCardMetaTag = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCardMetaTag) {
      twitterCardMetaTag = document.createElement('meta');
      twitterCardMetaTag.setAttribute('name', 'twitter:card');
      document.head.appendChild(twitterCardMetaTag);
    }
    twitterCardMetaTag.setAttribute('content', 'summary_large_image');
  
    let twitterUrlMetaTag = document.querySelector('meta[name="twitter:url"]');
    if (!twitterUrlMetaTag) {
      twitterUrlMetaTag = document.createElement('meta');
      twitterUrlMetaTag.setAttribute('name', 'twitter:url');
      document.head.appendChild(twitterUrlMetaTag);
    }
    twitterUrlMetaTag.setAttribute('content', pageUrl);
  
    let twitterTitleMetaTag = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitleMetaTag) {
      twitterTitleMetaTag = document.createElement('meta');
      twitterTitleMetaTag.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitleMetaTag);
    }
    twitterTitleMetaTag.setAttribute('content', pageTitle);
  
    let twitterDescriptionMetaTag = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescriptionMetaTag) {
      twitterDescriptionMetaTag = document.createElement('meta');
      twitterDescriptionMetaTag.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescriptionMetaTag);
    }
    twitterDescriptionMetaTag.setAttribute('content', pageDescription);
  
    let twitterImageMetaTag = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImageMetaTag) {
      twitterImageMetaTag = document.createElement('meta');
      twitterImageMetaTag.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImageMetaTag);
    }
    twitterImageMetaTag.setAttribute('content', image);
  }
  