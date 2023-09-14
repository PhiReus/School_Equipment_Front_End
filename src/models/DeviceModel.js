import axios from 'axios';

class DeviceModel {
    constructor() {
        this.api_url = 'http://127.0.0.1:8000/api/devices';
    }

    async getAllDevices(data = {}) {
        const res = await axios.get(this.api_url,{ params: data });
        return res.data;
    }
}

export default new DeviceModel;