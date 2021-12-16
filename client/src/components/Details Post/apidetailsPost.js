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
