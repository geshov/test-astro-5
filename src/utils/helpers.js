import { getImage } from "astro:assets";

export const sortPosts = (posts) => {
  posts.sort((a, b) => {
    if (a.data.date < b.data.date) return 1;
    else if (a.data.date > b.data.date) return -1;
    else return 0;
  });

  return posts;
};

export const getThumbnail = async (post, loading = "lazy") => {
  const { default: src } = await import(
    `../../content/blog/${post.id}/thumbnail.jpg`
  );

  return await getImage({
    src: src,
    widths: [1000, 800, 600, 400],
    loading: loading,
  });
};
