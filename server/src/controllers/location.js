import fetch from 'node-fetch';

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
        let url = `https://nominatim.openstreetmap.org/search?q=${name},${district_name}&state=${state_name}&country=India&postalcode=${center.pincode}&limit=1&format=json`
        console.log(url)
        let response = await fetch(url, {
            method: 'GET',
            //mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(user)
        })
        let res = await response.json()
        console.log(res)
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
    console.log(3)

    try {
        getLatLong(newCenter).then((res) => {
            //assign latlong values
            if (!res[0])
                return null;

            newCenter.location.lat = res[0].lat
            newCenter.location.long = res[0].lon

            const center = new Center(newCenter)

            try {
                center.save((error, data) => {
                    if (error) {
                        console.error(error);
                    }
                    if (data) {
                        return data
                    }
                });
            } catch (e) {
                console.error(e);
            }
        })
    } catch (e) {
        console.error(e);
    }
}

export const processCenters = async (req) => {
    console.log(2)

    try {
        let districtData = await District
            .findOne({ district_id: req.query.district_id })
            .lean()
            .exec();

        const doc = [];

        if (!districtData) {
            var center = req.body.sessions[0]
            var newDistrict = {
                district_id: req.query.district_id,
                district_name: center.district_name,
                state_id: req.query.state_id,
                state_name: center.state_name,
                centers: []
            }
            //console.log(req.body.sessions)
            const district = new District(newDistrict)

            try {
                district.save((error, data) => {
                    if (error) {
                        console.error(error);
                    }
                    if (data) {
                        districtData = data
                    }
                });
            } catch (e) {
                console.error(e);
            }

            if (req.body.sessions[0]) {
                await req.body.sessions.forEach((center, idx) => {

                    addCenter(center)
                        .then((newCenter) => {
                            if (newCenter != null) {
                                doc = [...doc, newCenter]
                                districtData.centers = doc
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                })
                console.log(districtData)
                console.log(doc)
                return districtData
            }
            else return null
        }

        if (req.body.length() != 0) {
            await req.body.forEach((center, idx) => {

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
            console.log(districtData)
            console.log(doc)
            return districtData
        }
        console.log(districtData)
        console.log(doc)
        //res.status(200).json({ data: doc });
    } catch (e) {
        console.error(e);
        //res.status(400).end();
    }

}

export const getLocationByDistrict = async (req, res) => {
    console.log(1)

    try {

        await processCenters(req).then(async (districtData) => {

            if (districtData && districtData.centers.length()) {
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
