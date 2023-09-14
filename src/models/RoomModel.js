import axios from 'axios';


class RoomModel {
      constructor() {
        this.api_url = 'http://127.0.0.1:8000/api/rooms';
    }

    async getRoom() {
        const res = await axios.get(this.api_url);
        return res.data;
    }
}

export default new RoomModel;