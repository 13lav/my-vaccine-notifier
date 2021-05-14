import Center from '../models/center';
import District from '../models/district';
import State from '../models/state';

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

    getLatLong().then(() => {
        //assign latlong values
        try {
            const doc = await Center.create(newCenter).exec((err, data) => {
                return doc
            })
        } catch (e) {
            console.error(e);
        }
    })
}

export const processCenters = async (districtId) => {

    try {
        const districtData = await District
            .findOne({ district_id: districtId })
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
                        .then(async (newCenter) => {
                            doc = [...doc, newCenter]
                            districtData.centers.push(newCenter);
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
        const districtData = await processCenters(req.body.district_id).then(() => {

            if (districtData.centers.length) {
                const id = districtData._id
                District.findByIdAndUpdate({ id }, districtData, function (err, result) {
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
