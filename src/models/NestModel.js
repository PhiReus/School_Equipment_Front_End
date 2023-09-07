import axios from "axios";

class NestModel {
    constructor () {
        this.api_url = 'http://127.0.0.1:8000/api/nests/';
    }
    async all() {
        const res = await axios.get(this.api_url);
        return res.data;
      }
    
      async find(id) {
        const data = await axios.get(this.api_url + id);
        return data.data;
      }
    
      async store(data) {
        const res = await axios.post(this.api_url , data);
        return res;
      }
    
      async update(id, data) {
        const res = await axios.put(this.api_url + id, data);
        return res;
      }
    
      async delete(id) {
        const data = await axios.delete(this.api_url + id);
        return data;
      }
}
export default new NestModel();