import axios from "axios";

export default {
  // pull in all users to be sorted
  getUsers: function() {

    return axios.get("https://randomuser.me/api/?results=200&nat=us");
  }
};