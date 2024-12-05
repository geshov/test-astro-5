export const sortPosts = (posts) => {
  posts.sort((a, b) => {
    if (a.data.date < b.data.date) return 1;
    else if (a.data.date > b.data.date) return -1;
    else return 0;
  });

  return posts;
};
