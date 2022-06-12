const ROBOTS_SITE_URL = process.env.ROBOTS_SITE_URL

module.exports = {
  siteUrl: ROBOTS_SITE_URL || 'https://example.com',
  priority: 1.0,
  generateRobotsTxt: true, // (optional)
  exclude: [
    '/server-sitemap.xml',
    '/refresh',
    '/order-received',
    '/comparison',
    '/checkout',
    '/testing'
  ], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      `${ROBOTS_SITE_URL}categories-sitemap.xml`, // <==== Add here
      `${ROBOTS_SITE_URL}products-sitemap.xml`, // <==== Add here
    ],
  },
  // Default transformation function
  transform: async (config, path) => {

    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  // ...other options
}