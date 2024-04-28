import RSS from 'rss';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '@/constants';
import { getBlogPostList } from '@/helpers/file-helpers';

export async function GET() {
  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
  });

  const blogPosts = await getBlogPostList();

  blogPosts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.abstract,
      date: post.publishedOn,
      url: `http://alfiechen.dev/${post.slug}`,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
