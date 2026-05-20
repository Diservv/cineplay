const AD_DOMAINS = [
  "doubleclick.net",
  "googlesyndication.com",
  "adnxs.com",
  "trafficjunky.net",
  "popads.net",
  "exoclick.com",
  "juicyads.com",
  "adspyglass.com",
  "tsyndicate.com",
  "adskeeper.com",
  "hilltopads.net",
  "propellerads.com",
  "adsterra.com",
  "clickadu.com",
  "popcash.net",
  "adcash.com",
];

self.addEventListener("fetch", (event) => {
  try {
    const url = new URL(event.request.url);
    const isAd = AD_DOMAINS.some((domain) => url.hostname.endsWith(domain));

    if (isAd) {
      event.respondWith(new Response("", { status: 204 }));
    }
  } catch (error) {
    // Ignore malformed or non-standard requests.
  }
});
