import axios from 'axios';

class DeviceModel {
    constructor() {
        this.api_url = 'http://127.0.0.1:8000/api/devices';
    }

    async getAllDevices() {
        const res = await axios.get(this.api_url);
        return res.data;
    }
}

export default DeviceModel;