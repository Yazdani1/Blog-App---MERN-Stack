
export const getMypost = () => {
 return fetch("/auth/mypost", {
    method: "GET",
    headers: {
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
