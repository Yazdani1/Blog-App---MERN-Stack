//similar posts API

export const getSimilarposts = () => {
  return fetch("/auth/more-posts", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//details page latest posts

export const getLatestposts = () => {
  return fetch("/auth/detailspage-latestposts", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//details posts

export const getDetailsposts = (id) => {
  return fetch("/auth/details/" + id, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
