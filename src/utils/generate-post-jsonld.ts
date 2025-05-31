import { IPost } from "@/types/blog";

export const generatePostJsonLd = (post: IPost) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
    headline: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    keywords: post.seo_keywords,
    image: post.image_url,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.owner.profile.first_name + " " + post.owner.profile.last_name,
    },
    publisher: {
      "@type": "Organization",
      name: "Zenaiyoga", // Replace with your site name
      logo: {
        "@type": "ImageObject",
        url: "https://www.zenaiyoga.com/logo/logo.png", // Replace with your site logo
      },
    },
    articleBody: post.content,
    wordCount: post.content.split(" ").length,
    commentCount: post.votes.length,
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ViewAction",
      userInteractionCount: post.view_count,
    },
    timeRequired: `PT${Math.ceil(post.reading_time)}M`,
  };
};
