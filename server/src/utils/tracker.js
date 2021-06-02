import states from '../../data/states'

const centers = [];

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
                'Content-Type': 'application/json'
            },
        })
        let res = await response.json()
        //console.log(res)
        return res
    } catch (err) {
        console.log(err)
    }
}

const getByState = async (states) => {
    await states.forEach(async (state) => {
        try {
            await state.districts.forEach(async (district) => {
                await getCenters(district.district_id).then(async (data) => {
                    try {
                        console.log(district.district_id, data.centers)
                        await data.centers.forEach((session) => {
                            centers = [...centers, session]
                        })
                    } catch (err) {
                        console.log(err)
                    }
                })
            })
        } catch (err) {
            console.log(err)
        }
    })
}

const tracker = (seconds) => {
    function callAgain() {
        getByState(states).then(() => {
            //send to controller
        })
        setTimeout(callAgain, 1000 * seconds);
    }
    callAgain();
}

export default tracker;
