
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


export const deletePost=(id)=> {
  return fetch("/auth/delete/" + id, {
    method: "DELETE",
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

  //getMypost();
}
