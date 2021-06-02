import Center from '../models/center.js';
import District from '../models/district.js';
import State from '../models/state.js';

export const addCenter = (center, callback) => {
    const newCenter = {
        center_id: center.center_id,
        name: center.name,
        address: center.address,
        state_name: center.state_name,
        district_name: center.district_name,
        block_name: center.block_name,
        pincode: center.pincode,
        lat: center.lat,
        long: center.long,
    }
    console.log(3)

    try {
        console.log(3.2)
        let savedCenter = center.save().then((data) => {
            console.log(savedCenter, data)
            callback(data)
        })
    } catch (e) {
        console.error(e);
    }

}