import axios from 'axios';

class DeviceModel {
    constructor() {
        this.api_url = 'http://127.0.0.1:8000/api/devices';
        this.root_url = 'http://127.0.0.1:8000/api';
    }

    async getAllDevices(data = {}) {
        const res = await axios.get(this.api_url,{ params: data });
        return res.data;
    }
    
    async getDeviceCalendar(id) {
        const res = await axios.get(this.root_url + '/device-calendar/' + id);
        return res.data;
    }

}

export default new DeviceModel;