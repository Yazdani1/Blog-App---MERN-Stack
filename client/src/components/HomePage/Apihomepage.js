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
