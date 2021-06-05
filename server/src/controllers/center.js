import Center from '../models/center.js';
import User from '../models/user.js';
//import Tracker from '../models/tracker.js';
import Session from '../models/session.js';
import Mailer from '../models/mailer.js';
import sendMail from '../utils/mailer.js';
// import District from '../models/district.js';
// import State from '../models/state.js';

const addCenter = (center) => {
    var newCenter = {
        _id: center.center_id,
        name: center.name,
        address: center.address,
        state_name: center.state_name,
        district_name: center.district_name,
        block_name: center.block_name,
        pincode: center.pincode,
        lat: center.lat,
        long: center.long,
        fee_type: center.fee_type,
    }
    try {
        Center.findByIdAndUpdate(center.center_id, newCenter, { upsert: true, new: true }, function (err, doc) {
            if (err)
                console.log(err);
        });
    } catch (e) {
        console.error(e);
    }
}

const getNewSessions = (center, mailer) => {

    center.sessions.forEach((session) => {
        var newSession = {
            session_id: session.session_id,
            date: session.date,
            available_capacity: session.available_capacity,
            min_age_limit: session.min_age_limit,
            vaccine: session.vaccine,
            available_capacity_dose1: session.available_capacity_dose1,
            available_capacity_dose2: session.available_capacity_dose2
        }

        var query = { 'session_id': session.session_id };

        Session.update(query, newSession, { upsert: true, new: true }, function (err, doc) {
            if (err)
                console.log(err);

            var now = new Date();

            if (doc.upserted) {
                console.log('---', center.name, session.session_id)
                console.log(session.date, center.pincode, "--", session.min_age_limit, session.vaccine, session.available_capacity, now.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }))
                var content = '---' + center.name + session.session_id + ' ' + center.pincode + "--" + session.min_age_limit + session.vaccine + session.available_capacity + '--' + now.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
                if (mailer) {
                    mailer.users.forEach((id) => {
                        try {
                            User.findById(id, function (err, doc) {
                                if (err)
                                    console.log(err)
                                if (doc)
                                    sendMail(doc, content)
                            });
                        } catch (e) {
                            console.error(e);
                        }
                    })
                }
                else {
                    console.log('not in mail list')
                }
            }
        });
    })
}

export const updateTrackerDB = (centers) => {
    centers.forEach(center => {
        try {
            Mailer.findById(center.center_id, function (err, doc) {
                if (err)
                    console.log(err);
                getNewSessions(center, doc);
            });
            addCenter(center)
        } catch (e) {
            console.error(e);
        }
    });
}

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
            console.log(docs)
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