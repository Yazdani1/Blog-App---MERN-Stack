export const getFavouritePost = () => {
  return fetch("/auth/get-favouritepost", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeFavouritePost = (postID) => {
  return fetch("/auth/update-favouritepost"+postID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postFavourite = (postID,userID) => {
  return fetch("/auth/save-favouritepost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
    },
    body: JSON.stringify(postID,userID),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
