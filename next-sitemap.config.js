/** @type {import('next-sitemap').IConfig} */

const SITE_URL = "https://epicarosario.com.ar";

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,

  additionalPaths: async (config) => {
    // ⚡ Import dinámico porque next-sitemap corre en Node
    const db = require("./lib/prismajs"); // apunta al cliente Prisma JS

    // Traer todas las publicaciones
    const publicaciones = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 15,
    });

    return publicaciones.map((p) => ({
      loc: `/${p.slug}`,
      lastmod: p.updatedAt.toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    }));
  },
};