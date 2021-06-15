import Center from '../models/center.js';

export const getCentersByPin = (req, res) => {
    try {
        Center.find({ pincode: req.params.pincode }, function (err, docs) {
            if (err)
                console.log(err);
            if (docs.length)
                res.status(200).json({ data: docs });
            else
                res.status(404).json({ error: 'No user data available' });
        });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const getCentersByDistrict = (req, res) => {
    try {
        Center.find({ district_name: req.params.district }, function (err, docs) {
            if (err)
                console.log(err);
            if (docs.length)
                res.status(200).json({ data: docs });
            else
                res.status(404).json({ error: 'No user data available' });
        });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}