export const Savemycomments = (postID) => {
  return fetch("/auth/mycomments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
    },
    body: JSON.stringify({
      postID: postID,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removemycommentsPost = (postID) => {
  return fetch("/auth/remove-mycomments", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
    },
    body: JSON.stringify({
      postID: postID,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
