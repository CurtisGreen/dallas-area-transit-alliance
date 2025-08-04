type PostTag = {
  name: string; // 'Strong Towns'
  slug: string; // 'strong-towns
};

type PublishedByLine = {
  name: string; //'Hexel Colorado',
  handle: string; // 'hexelco',
  previous_name: string; // 'Dallas Urbanists STLC',
  photo_url: string; // 'https://substack-post-media.s3.amazonaws.com/public/images/279b7723-b694-4539-ad41-deadac732bd8_1120x1120.jpeg',
  bio: string; // 'Creator of Dallas Urbanists STLC and car-free advocate for walkability, cycling, public transit, and housing.',
  profile_set_up_at: string; //'2025-03-13T03:11:45.009Z',
  reader_installed_at: string; //'2025-05-12T19:38:45.316Z',
};

type Article = {
  title: string; //"Day One of Strong Towns National Gathering 2025";
  slug: string; //"day-one-of-strong-towns-national";
  post_date: string; // "Jun 11";
  canonical_url: string; // "https://dallasurbanists.substack.com/p/day-one-of-strong-towns-national";
  reactions: object; //{ "❤": 10 };
  subtitle: string; // "Urbanists from Dallas, TX traveled to Providence, RI for annual gathering of Strong Towns advocates. Here's how our first day went!";
  cover_image: string; //"https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2a5e96cb-6edd-4bd6-8a0a-6d55a2c97ff2_1600x900.png";
  description: string; //"Dallas urbanists met hundreds of fellow advocates at Strong Towns National Gathering in Providence, Rhode Island. Here's how our first day went!";
  truncated_body_text: string; //"Yesterday was the first day of Strong Towns National Gathering, an annual conference that brings together volunteer advocates, urban planners, and public officials from across the U.S. to share ideas, lessons, and strategies for building stronger communities.";
  wordcount: number;
  postTags: PostTag[];
  publishedBylines: PublishedByLine[];
  reaction_count: number;
  comment_count: number;
};

export const getSubstackArticles = async (name: string, count: number) => {
  const url = `https://substackapi.com/api/feeds/${name}.substack.com?limit=${count}&sort=new`;
  const data = await fetch(url);
  const articles: Article[] = await data.json();
  return articles;
};
