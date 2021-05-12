import states from '../data/states'

const state = '';
const stateId = 0;
const centers = [];
const districts = [];
const pins = [];
var districtsFailed = []

const getSessions = async (id) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;

    try {
        let response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${today}`, {
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
        districtsFailed = [...districtsFailed, id]
    }
}

const fetchData = async (districts) => {

    await districts.forEach((district) => {
        getSessions(district.district_id).then((sessions) => {

            try {
                console.log(district.district_id, sessions.sessions)
                sessions.sessions.forEach((session) => {
                    centers = [...centers, session]
                })
            }
            catch (err) {
                console.log(err)
            }
        })
    })
}

const getDistricts = async (id) => {
    try {
        let response = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let res = await response.json()
        console.log(res)
        /*
                fetchData(res.districts).then(function () {
                    console.log('done')
                })
        */
        return res
    } catch (err) {
        console.log(err)
    }
}
/*
const handleSelectState = (event) => {
    setState(event.target.value);
    console.log(event.target)
    var newStateId
    values.states.forEach((state, idx) => {
        if (state.state_name === event.target.value)
            newStateId = state.state_id
    })
    setStateId(newStateId)
    console.log(stateId, newStateId)
    getDistricts(newStateId)
    setValues({ ...values, selectedState: event.target.value })
};
*/
const getByState = async (states) => {
    await states.forEach(async (state) => {
        await getDistricts(state.state_id).then(async (districts) => {
            try {
                await districts.districts.forEach(async (district) => {
                    await getSessions(district.district_id).then(async (sessions) => {
                        try {
                            console.log(district.district_id, sessions.sessions)
                            await sessions.sessions.forEach((session) => {
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
    })
}

const getPins = async (arr) => {
    await arr.forEach((item) => {
        if (updatedPins.indexOf(item.pincode) === -1) {
            updatedPins.push(item.pincode);
            console.log('new ', item.pincode)
        }
    })
}

const clickSubmit = async () => {
    console.log(state)
    console.log(stateId)
    console.log(centers)
    console.log(districts)
    console.log(pins)
}
