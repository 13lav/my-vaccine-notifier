import Center from '../models/center.js';
import User from '../models/user.js';
import Session from '../models/session.js';
import Notifier from '../models/notifier.js';
import { notifier } from './notifier.js';

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
        vaccine: center.sessions[0].vaccine,
        min_age_limit: center.sessions[0].min_age_limit,
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

const getNewSessions = (center, notifierData) => {

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

        if (session.available_capacity > 9)
            Session.update(query, newSession, { upsert: true, new: true }, function (err, doc) {
                if (err)
                    console.log(err);

                var now = new Date();

                if (doc.upserted) {
                    console.log('---', center.name, session.session_id)
                    console.log(session.date, center.state_name, center.pincode, "--", session.min_age_limit, session.vaccine, session.available_capacity, now.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }))
                    var content = center.name + ' ' + center.pincode + ' ' + session.min_age_limit + ' ' + session.vaccine + ' ' + session.available_capacity
                    if (notifierData) {
                        notifierData.users.forEach((id) => {
                            try {
                                User.findById(id, function (err, doc) {
                                    if (err)
                                        console.log(err)
                                    if (doc)
                                        notifier(doc, content)
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
            Notifier.findById(center.center_id, function (err, doc) {
                if (err)
                    console.log(err);
		if (doc)
                    getNewSessions(center, doc);
            });
            addCenter(center)
        } catch (e) {
            console.error(e);
        }
    });
}
