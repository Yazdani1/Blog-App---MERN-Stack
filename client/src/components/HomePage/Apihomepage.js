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

//like feature

export const addlikePost = (postId) => {
  return fetch("/auth/like", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
    },
    body: JSON.stringify({
      postId,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//unlike feature

export const addunlikePost = (postId) => {
  return fetch("/auth/unlike", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
    },
    body: JSON.stringify({
      postId,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//latest post feature

export const latestPost = () => {
  return fetch("/auth/latestpost", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
