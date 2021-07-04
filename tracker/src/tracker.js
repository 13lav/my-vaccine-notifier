import fetch from 'node-fetch';
import states from './data/states.js'
//import { updateTrackerDB } from './controllers/center.js'
import { updateCentersCache } from './controllers/cache.js'
import { checkNewSession } from './controllers/cache.js'
import Notifier from './models/notifier.js';
import Center from './models/center.js';

import redis from 'redis';
import rejson from 'redis-rejson';

rejson(redis);
const client = redis.createClient();

var centers = [];

const getCenters = async (id) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;

    try {
        let response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${today}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'User-Agent': 'PostmanRuntime/7.26.8',
                // 'Accept': '*/*',
                // 'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
            },
        })
        let res = await response.json()
        //console.log(res)
        return res
    } catch (err) {
        console.log('Fetch Error -', id)
    }
}
var numDistricts
const getByState = async (states, callback) => {
    await states.forEach(async (state) => {
        numDistricts += state.districts.length
        //console.log(numDistricts)
        try {
            await state.districts.forEach(async (district) => {
                await getCenters(district.district_id).then(async (data) => {
                    try {
                        //console.log(district.district_id, '  centers - ', data.centers.length)
                        await data.centers.forEach((center) => {
                            centers = [...centers, center]
                        })
                    } catch (err) {
                        console.log('No centers at Dist. No.', district.district_id, 'in', state.state_name)
                    }
                })
                callback()
                centers = []
            })
        } catch (err) {
            console.log(err)
        }
    })
}

const fetchCenters = async (callback) => {
    centers = [];   //clear centers list
    var districtFetched = 0
    var count = 0
    try {
        await getByState(states, () => {
            districtFetched++
            if (centers.length)
                updateCentersCache(centers, () => {
                    count++
                    //console.log(count, '===', numDistricts)
                    if (count === numDistricts)
                        callback()
                })
            else numDistricts--
            //console.log(districtFetched, '. cache called', centers[0].state_name)
            //updateTrackerDB(centers)

            // if (districtFetched === numDistricts)
            //     callback(numDistricts)

        })
    } catch (err) {
        console.log(err)
    }
}

const tracker = (seconds) => {

    function callAgain() {


        var now = new Date();
        var dateTime = now.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
        console.log(dateTime, '- called')

        var notifiers = [];

        Notifier.find({}, function (err, data) {
            if (err)
                console.log(err)
            else notifiers = data
            //console.log(notifiers.length)
            //checkNewSession(notifiers)
        })
        numDistricts = 0
        try {
            fetchCenters(() => {
                //console.log('Centers Fetching & Update Complete !!!')
                checkNewSession(notifiers, dateTime)
            })
        } catch (err) {
            console.log(err)
        }

        setTimeout(callAgain, 1000 * seconds);
    }

    callAgain();

}

export const updateCenters = (seconds) => {

    function callAgain() {

        client.json_get('centers', '.', (error, object) => {
            if (error)
                console.log(error)
            else {

                let centers = JSON.parse(object)

                var now = new Date();
                var dateTime = now.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })

                console.log('Updating CentersDB', Object.keys(centers).length, dateTime)

                var bulkCenters = []

                for (var center in centers) {

                    let upsertDoc = {
                        updateOne: {
                            filter: { _id: centers[center].center_id },
                            update: centers[center],
                            upsert: true,
                        }
                    };
                    bulkCenters.push(upsertDoc);
                }

                Center.bulkWrite(bulkCenters)
                    .then(bulkWriteOpResult => console.log('BULK update OK:', bulkWriteOpResult))
                    .catch(console.error.bind(console, 'BULK update error:'))

                const time = (60 * 1000 * seconds)
                setTimeout(callAgain, time);
            }
        })

    }

    callAgain()

}
export default tracker;
