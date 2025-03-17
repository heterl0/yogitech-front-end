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
      name: "YourSiteName", // Replace with your site name
      logo: {
        "@type": "ImageObject",
        url: "https://yourwebsite.com/logo.png", // Replace with your site logo
      },
    },
    articleBody: post.content,
    wordCount: post.content.split(" ").length,
    commentCount: post.votes.length,
    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue: (
    //     post.votes.reduce((sum, vote) => sum + vote.vote_value, 0) /
    //       post.votes.length || 0
    //   ).toFixed(1),
    //   reviewCount: post.votes.length,
    // },
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ViewAction",
      userInteractionCount: post.view_count,
    },
    timeRequired: `PT${Math.ceil(post.reading_time)}M`,
  };
};
