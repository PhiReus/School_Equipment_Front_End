import axios from 'axios';


class DeviceTypeModel {
      constructor() {
        this.api_url = 'http://127.0.0.1:8000/api/device_types';
    }

    async getDeviceType() {
        const res = await axios.get(this.api_url);
        return res.data;
    }
}

export default DeviceTypeModel;