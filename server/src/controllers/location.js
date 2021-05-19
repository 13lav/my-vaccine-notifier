import Center from '../models/center.js';
import District from '../models/district.js';
import State from '../models/state.js';

export const getLatLong = async (center) => {

    var name = center.name.split(' ').join('+');
    var address = center.address.split(' ').join('+');
    var state_name = center.state_name.split(' ').join('+');
    var district_name = center.district_name.split(' ').join('+');
    var block_name
    if (center.block_name != "Not Applicable")
        block_name = center.block_name.split(' ').join('+');
    else block_name = ""

    try {
        let response = await fetch(`https://nominatim.openstreetmap.org/search?q=${name},${address}+${block_name}+${district_name}&state=${state_name}&country=India&postalcode=${center.pincode}&limit=1&format=json`, {
            method: 'GET',
            //mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(user)
        })
        let res = await response.json()
        //console.log(res)
        return res
    } catch (err) {
        console.log(err)
        disIDs = [...disIDs, id]
        setDistricts(disIDs)
    }
}

export const addCenter = async (center) => {
    const newCenter = {
        center_id: center.center_id,
        name: center.name,
        address: center.address,
        state_name: center.state_name,
        district_name: center.district_name,
        block_name: center.block_name,
        pincode: center.pincode,
        location: {
            lat: 28,
            long: 72
        }
    }

    getLatLong(newCenter).then((res) => {
        //assign latlong values
        if (res.length() === 0)
            return null;

        newCenter.location.lat = res[0].lat
        newCenter.location.long = res[0].lon

        try {
            const doc = Center.create(newCenter).exec((err, data) => {
                return doc
            })
        } catch (e) {
            console.error(e);
        }
    })
}

export const processCenters = async (req) => {

    try {
        const districtData = await District
            .findOne({ district_id: req.params.district_id })
            .lean()
            .exec();

        if (!districtData) {
            return null;
        }

        const doc = [];
        if (req.body.centers.length() != 0) {
            await req.body.centers.forEach((center, idx) => {

                var obj = districtData.find(obj => obj.center_id === center.center_id);

                if (obj)
                    doc = [...doc, obj];
                else {
                    addCenter(center)
                        .then((newCenter) => {
                            if (newCenter != null) {
                                doc = [...doc, newCenter]
                                districtData.centers.push(newCenter);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
            return districtData
        }

        res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }

}

export const getLocationByDistrict = async (req, res) => {

    try {

        await processCenters(req).then(async (districtData) => {

            if (districtData && districtData.centers.length) {
                const id = districtData._id
                await District.findByIdAndUpdate({ id }, districtData, function (err, result) {
                    if (err) {
                        res.send(err)
                    }
                })
                res.status(200).json({ data: districtData.centers });
            }
            else
                res.status(404).json({ error: 'No centers available' });
        })
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }

}
