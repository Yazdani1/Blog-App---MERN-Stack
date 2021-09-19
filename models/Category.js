const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var mongoSchema = mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.Schema("Category", mongoSchema);



//To post data in vue js


// <template>
//   <div class="container">
//     <div class="row">
//       <form>
//         <div class="form-group">
//           <label for="exampleInputEmail1" class="form-label">Title</label>
//           <input type="text" v-model="Blog.title" class="form-control" />
//         </div>
//         <div class="form-group">
//           <label for="exampleInputPassword1" class="form-label"
//             >Description</label
//           >
//           <input type="text" v-model="Blog.des" class="form-control" />
//         </div>

//         <router-link to="/data">
//           <button type="submit" class="btn btn-primary btn" @click="addPost">
//             Submit
//           </button>
//         </router-link>
//       </form>
//     </div>
//   </div>
// </template>

// <script>
// /*eslint-disable */
// import axios from "axios";

// export default {
//   data() {
//     return {
//       name: "CreatePost",
//       // headers: {'Content-Type':'application/x-www-form-urlencoded'},
//       Blog: { title: "", des: "" },
//     };
//   },
//   methods: {
//     async addPost() {
//       // const newPost = {
//       //     title: this.Blog.title,
//       //     des: this.Blog.des
//       // }
//       // console.log(newPost);

//       await axios
//         .post("http://localhost:8000/post", this.Blog)
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     },
//   },
// };
// </script>

// <style scoped>
// .form {
//   height: 300px;
//   width: 30%;
//   margin: 50px;
//   padding: 10px;
// }
// .btn {
//   margin-top: 20px;
// }
// </style>


//to update the data



/* 

<template>
  <div class="container">
    <div class="row">
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1" class="form-label">{{
            Blog.title
          }}</label>
          <input type="text" v-model="Blog.title" class="form-control" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1" class="form-label"
            >Description</label
          >
          <input type="text" v-model="Blog.des" class="form-control" />
        </div>

        <router-link to="/data">
          <button
            type="submit"
            class="btn btn-primary btn"
            v-on:click="updatePost()"
          >
            Update Post
          </button>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "CreatePost",
      // headers: {'Content-Type':'application/x-www-form-urlencoded'},
      Blog: { title: "", des: "" },
    };
  },

  //toupdate the data

  methods: {
    async updatePost() {
      await axios
        .put("http://localhost:8000/edit/" + this.$route.params.id, this.Blog)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  //to show data to the update input field

  async mounted() {
    const result = await axios.get(
      "http://localhost:8000/edtDatatofield/" + this.$route.params.id
    );
    this.Blog = result.data;
  },
};
</script>

<style scoped></style>




*/


//To get the data
/* 

<template>
  <div>
    <div class="container">
      <div class="row">
        <div
          class="col-md-4"
          v-for="(blogspost, index) in post"
          :key="blogspost._id"
        >
          <div class="first">
            <h1>{{ index + 1 }}</h1>
            <h1>{{ blogspost.title }}</h1>

            <p>{{ blogspost.des }}</p>
            <h3>{{ blogspost.date }}</h3>
            <button
              class="btn btn-danger"
              v-on:click="deleteData(blogspost._id)"
            >
              Delete
            </button>
            <router-link :to="'/update/' + blogspost._id">
              <button class="editbtn btn btn-success">
                Edit
              </button>
            </router-link>
            <router-link :to="'/details/' + blogspost._id">
              <button class="editbtn btn btn-info">
                View Details
              </button>
            </router-link>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-danger dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
// import axios from "axios";

// export default {
//   name: "blog",
//   data() {
//     return {
//       post: [],
//     };
//   },
//   mounted() {
//     this.getallBlogPosts();
//   },
//   methods: {
//     deleteData(id) {
//       axios.delete("http://localhost:8000/delete/" + id).then((res) => {
//         this.getallBlogPosts();
//       });
//     },

//     async getallBlogPosts() {
//      await axios.get("http://localhost:8000/allData").then((res) => {
//         this.post = res.data;
//         console.log(res.data);
//       });
//     },
//   },
// };
// </script>

// <style scoped>
// .first {
//   background-color: rgb(10, 5, 82);
//   color: whitesmoke;
//   margin: 10px;
//   padding: 10px;
// }

// .editbtn {
//   margin-left: 20px;
// }
// </style>


// */












