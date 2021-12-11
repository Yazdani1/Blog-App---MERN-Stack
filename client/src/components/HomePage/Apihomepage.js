export const getUserList = () => {
  return fetch("/auth/allusers", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//get allposts for homepage..

export const getallPosts = () => {
  return fetch("/auth/getpost", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
