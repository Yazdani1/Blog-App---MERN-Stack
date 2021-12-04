export const addexperience = (experience, userID) => {
  return fetch("/auth/add-experience", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
    },
    body: JSON.stringify(experience, userID),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
