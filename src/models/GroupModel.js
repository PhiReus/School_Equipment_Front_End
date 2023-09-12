import axios from "axios";

class GroupModel {
    constructor () {
        this.api_url = 'http://127.0.0.1:8000/api/groups/';
    }
    async all() {
        const res = await axios.get(this.api_url);
        return res.data;
      }
    
      async find(id) {
        const data = await axios.get(this.api_url + id);
        return data.data;
      }
}
export default new GroupModel();