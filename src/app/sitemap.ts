import { MetadataRoute } from 'next';
import { dataService } from '@/lib/data-service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajeetkumar.dev';

  const posts = await dataService.getBlogPosts({ includePrivate: false, includeDrafts: false });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/education`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/experience`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/skills`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/research`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/certifications`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
