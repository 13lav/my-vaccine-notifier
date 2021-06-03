import Center from '../models/center.js';
import Tracker from '../models/tracker.js';
import Session from '../models/session.js';
import Mailer from '../models/mailer.js';
import sendMail from '../utils/mailer.js';
// import District from '../models/district.js';
// import State from '../models/state.js';

const addCenter = (center, callback) => {
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

const getNewSessions = (center, mailer) => {
    var newSession
    center.sessions.forEach((session) => {
        newSession = {
            session_id: session.session_id,
            date: session.date,
            available_capacity: session.available_capacity,
            min_age_limit: session.min_age_limit,
            vaccine: session.vaccine,
            available_capacity_dose1: session.available_capacity_dose1,
            available_capacity_dose2: session.available_capacity_dose2
        }
        //const doc = await Session.update().exec();
        var query = { 'session_id': session.session_id };
        Session.update(query, newSession, { upsert: true, new: true }, function (err, doc) {
            if (err)
                console.log(err);

            var now = new Date();
            // convert date to a string in UTC timezone format:
            //console.log(now.toUTCString());
            if (doc.upserted) {
                console.log('---', center.name, session.session_id)
                console.log(center.pincode, "--", session.min_age_limit, session.vaccine, session.available_capacity, now.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }))
                var content = '---' + center.name + session.session_id + ' ' + center.pincode + "--" + session.min_age_limit + session.vaccine + session.available_capacity + now.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
                if (mailer) {
                    mailer.emails.forEach((email) => {
                        console.log(email);
                        sendMail(email, content)
                    })
                }
                else {
                    console.log('not in mail list')
                }
            }
        });
    })
}
/*
{'updatedExisting': False, u'nModified': 0, u'ok': 1.0, u'upserted': ObjectId('60b7aba4eed06de080f4c827'), u'n': 1}
199
{'updatedExisting': True, u'nModified': 1, u'ok': 1.0, u'n': 1}
200 
{ n: 1, nModified: 1, ok: 1 }
 */
export const updateTrackerDB = (centers) => {
    //console.log('No. of Centers', centers.length)
    centers.forEach(center => {
        var query = { 'center_id': center.center_id };
        var newCenter = {
            _id: center.center_id,
            emails: ['johndoefri13@gmail.com']
        }
        try {
            Mailer.findById(center.center_id, function (err, doc) {
                if (err)
                    console.log(err);
                //console.log(doc.center_id, doc.district_name, doc.state_name);

                getNewSessions(center, doc);
            });
        } catch (e) {
            console.error(e);
        }
        //console.log(center.center_id, center.district_name, center.pincode);
        //getNewSessions(center);
    });
}
