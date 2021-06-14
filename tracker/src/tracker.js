import fetch from 'node-fetch';
import states from './data/states.js'
import { updateTrackerDB } from './controllers/center.js'

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
        console.log(err)
    }
}

const getByState = async (states, callback) => {
    //await states.forEach(async (state) => {
    try {
        await states[8].districts.forEach(async (district) => {
            await getCenters(district.district_id).then(async (data) => {
                try {
                    //console.log(district.district_id, '  centers - ', data.centers.length)
                    await data.centers.forEach((center) => {
                        centers = [...centers, center]
                    })
                } catch (err) {
                    console.log(err)
                }
            })
            callback()
            centers = []
        })
    } catch (err) {
        console.log(err)
    }
    //})
}

const tracker = (seconds) => {
    function callAgain() {
        var now = new Date();
        console.log('Called at - ', now.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }))
        centers = [];   //clear centers list
        try {
            getByState(states, () => {
                //console.log('db called')
                updateTrackerDB(centers)
            })
        } catch (err) {
            console.log(err)
        }
        setTimeout(callAgain, 1000 * seconds);
    }

    callAgain();
}

export default tracker;
