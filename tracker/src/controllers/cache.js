import redis from 'redis';
import rejson from 'redis-rejson';
import User from '../models/user.js';
import { notifier } from './notifier.js';

rejson(redis);

//const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient();

export const updateCentersCache = (centers) => {
    // if (centers.length)
    //     console.log(centers[0].state_name)

    centers.forEach(center => {

        let id = '$' + center.center_id.toString()

        try {
            client.json_set('centers', id, JSON.stringify(center), (err) => {
                if (err)
                    console.log(err);
                //console.log(center.state_name)
            });
        } catch (e) {
            console.error(e);
        }

    });
}

const notify = (notifierData, center, session) => {

    var content = center.name + ' | ' + session.vaccine + '(' + session.min_age_limit + '+) | ' + 'Dose1: ' + session.available_capacity_dose1 + ' | Dose2: ' + session.available_capacity_dose2 + ' | ' + session.date

    if (notifierData) {
        notifierData.users.forEach((id) => {
            try {
                User.findById(id, function (err, doc) {
                    if (err)
                        console.log(err)
                    if (doc)
                        notifier(doc, content, center, session)
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

export const checkNewSession = (notifiers) => {
    console.log('checkNewSession', notifiers.length)

    var i = 1
    notifiers.forEach((notifier) => {

        let id = '$' + notifier._id.toString()
        //console.log(id)
        try {
            client.json_get('centers', id, (error, value) => {
                if (!error && value != null) {
                    let center = JSON.parse(value)
                    center.sessions.forEach(session => {
                        //let session_id = '$' + session.session_id
                        if (session.available_capacity > 9) {
                            client.json_get('sessions', `["${session.session_id}"]`, (err, data) => {
                                if (err) {
                                    //console.log(err);
                                    //if (data == null) {

                                    notify(notifier, center, session)

                                    client.json_set('sessions', `["${session.session_id}"]`, JSON.stringify(session), (e) => {
                                        if (e)
                                            console.log(e);
                                        console.log("new session at ", center.name, session.session_id)
                                    })
                                    //}
                                }
                            })
                        }
                    })
                }
            });
        } catch (e) {
            console.error(e);
        }

    });
}