const states = [
    {
        "state_id": 1,
        "state_name": "Andaman and Nicobar Islands",
        "districts": [
            {
                "district_id": 3,
                "district_name": "Nicobar"
            },
            {
                "district_id": 1,
                "district_name": "North and Middle Andaman"
            },
            {
                "district_id": 2,
                "district_name": "South Andaman"
            }
        ]
    },
    // {
    //     "state_id": 2,
    //     "state_name": "Andhra Pradesh",
    //     "districts": [
    //         {
    //             "district_id": 9,
    //             "district_name": "Anantapur"
    //         },
    //         {
    //             "district_id": 10,
    //             "district_name": "Chittoor"
    //         },
    //         {
    //             "district_id": 11,
    //             "district_name": "East Godavari"
    //         },
    //         {
    //             "district_id": 5,
    //             "district_name": "Guntur"
    //         },
    //         {
    //             "district_id": 4,
    //             "district_name": "Krishna"
    //         },
    //         {
    //             "district_id": 7,
    //             "district_name": "Kurnool"
    //         },
    //         {
    //             "district_id": 12,
    //             "district_name": "Prakasam"
    //         },
    //         {
    //             "district_id": 13,
    //             "district_name": "Sri Potti Sriramulu Nellore"
    //         },
    //         {
    //             "district_id": 14,
    //             "district_name": "Srikakulam"
    //         },
    //         {
    //             "district_id": 8,
    //             "district_name": "Visakhapatnam"
    //         },
    //         {
    //             "district_id": 15,
    //             "district_name": "Vizianagaram"
    //         },
    //         {
    //             "district_id": 16,
    //             "district_name": "West Godavari"
    //         },
    //         {
    //             "district_id": 6,
    //             "district_name": "YSR District, Kadapa (Cuddapah)"
    //         }
    //     ]
    // },
    // {
    //     "state_id": 3,
    //     "state_name": "Arunachal Pradesh",
    //     "districts": [
    //         {
    //             "district_id": 22,
    //             "district_name": "Anjaw"
    //         },
    //         {
    //             "district_id": 20,
    //             "district_name": "Changlang"
    //         },
    //         {
    //             "district_id": 25,
    //             "district_name": "Dibang Valley"
    //         },
    //         {
    //             "district_id": 23,
    //             "district_name": "East Kameng"
    //         },
    //         {
    //             "district_id": 42,
    //             "district_name": "East Siang"
    //         },
    //         {
    //             "district_id": 17,
    //             "district_name": "Itanagar Capital Complex"
    //         },
    //         {
    //             "district_id": 24,
    //             "district_name": "Kamle"
    //         },
    //         {
    //             "district_id": 27,
    //             "district_name": "Kra Daadi"
    //         },
    //         {
    //             "district_id": 21,
    //             "district_name": "Kurung Kumey"
    //         },
    //         {
    //             "district_id": 33,
    //             "district_name": "Lepa Rada"
    //         },
    //         {
    //             "district_id": 29,
    //             "district_name": "Lohit"
    //         },
    //         {
    //             "district_id": 40,
    //             "district_name": "Longding"
    //         },
    //         {
    //             "district_id": 31,
    //             "district_name": "Lower Dibang Valley"
    //         },
    //         {
    //             "district_id": 18,
    //             "district_name": "Lower Siang"
    //         },
    //         {
    //             "district_id": 32,
    //             "district_name": "Lower Subansiri"
    //         },
    //         {
    //             "district_id": 36,
    //             "district_name": "Namsai"
    //         },
    //         {
    //             "district_id": 19,
    //             "district_name": "Pakke Kessang"
    //         },
    //         {
    //             "district_id": 39,
    //             "district_name": "Papum Pare"
    //         },
    //         {
    //             "district_id": 35,
    //             "district_name": "Shi Yomi"
    //         },
    //         {
    //             "district_id": 37,
    //             "district_name": "Siang"
    //         },
    //         {
    //             "district_id": 30,
    //             "district_name": "Tawang"
    //         },
    //         {
    //             "district_id": 26,
    //             "district_name": "Tirap"
    //         },
    //         {
    //             "district_id": 34,
    //             "district_name": "Upper Siang"
    //         },
    //         {
    //             "district_id": 41,
    //             "district_name": "Upper Subansiri"
    //         },
    //         {
    //             "district_id": 28,
    //             "district_name": "West Kameng"
    //         },
    //         {
    //             "district_id": 38,
    //             "district_name": "West Siang"
    //         }
    //     ]
    // },
    // {
    //     "state_id": 4,
    //     "state_name": "Assam",
    //     "districts": [
    //         {
    //             "district_id": 46,
    //             "district_name": "Baksa"
    //         },
    //         {
    //             "district_id": 47,
    //             "district_name": "Barpeta"
    //         },
    //         {
    //             "district_id": 765,
    //             "district_name": "Biswanath"
    //         },
    //         {
    //             "district_id": 57,
    //             "district_name": "Bongaigaon"
    //         },
    //         {
    //             "district_id": 66,
    //             "district_name": "Cachar"
    //         },
    //         {
    //             "district_id": 766,
    //             "district_name": "Charaideo"
    //         },
    //         {
    //             "district_id": 58,
    //             "district_name": "Chirang"
    //         },
    //         {
    //             "district_id": 48,
    //             "district_name": "Darrang"
    //         },
    //         {
    //             "district_id": 62,
    //             "district_name": "Dhemaji"
    //         },
    //         {
    //             "district_id": 59,
    //             "district_name": "Dhubri"
    //         },
    //         {
    //             "district_id": 43,
    //             "district_name": "Dibrugarh"
    //         },
    //         {
    //             "district_id": 67,
    //             "district_name": "Dima Hasao"
    //         },
    //         {
    //             "district_id": 60,
    //             "district_name": "Goalpara"
    //         },
    //         {
    //             "district_id": 53,
    //             "district_name": "Golaghat"
    //         },
    //         {
    //             "district_id": 68,
    //             "district_name": "Hailakandi"
    //         },
    //         {
    //             "district_id": 764,
    //             "district_name": "Hojai"
    //         },
    //         {
    //             "district_id": 54,
    //             "district_name": "Jorhat"
    //         },
    //         {
    //             "district_id": 49,
    //             "district_name": "Kamrup Metropolitan"
    //         },
    //         {
    //             "district_id": 50,
    //             "district_name": "Kamrup Rural"
    //         },
    //         {
    //             "district_id": 51,
    //             "district_name": "Karbi-Anglong"
    //         },
    //         {
    //             "district_id": 69,
    //             "district_name": "Karimganj"
    //         },
    //         {
    //             "district_id": 61,
    //             "district_name": "Kokrajhar"
    //         },
    //         {
    //             "district_id": 63,
    //             "district_name": "Lakhimpur"
    //         },
    //         {
    //             "district_id": 767,
    //             "district_name": "Majuli"
    //         },
    //         {
    //             "district_id": 55,
    //             "district_name": "Morigaon"
    //         },
    //         {
    //             "district_id": 56,
    //             "district_name": "Nagaon"
    //         },
    //         {
    //             "district_id": 52,
    //             "district_name": "Nalbari"
    //         },
    //         {
    //             "district_id": 44,
    //             "district_name": "Sivasagar"
    //         },
    //         {
    //             "district_id": 64,
    //             "district_name": "Sonitpur"
    //         },
    //         {
    //             "district_id": 768,
    //             "district_name": "South Salmara Mankachar"
    //         },
    //         {
    //             "district_id": 45,
    //             "district_name": "Tinsukia"
    //         },
    //         {
    //             "district_id": 65,
    //             "district_name": "Udalguri"
    //         },
    //         {
    //             "district_id": 769,
    //             "district_name": "West Karbi Anglong"
    //         }
    //     ]
    // },
    // {
    //     "state_id": 5,
    //     "state_name": "Bihar",
    //     "districts": [
    //         {
    //             "district_id": 74,
    //             "district_name": "Araria"
    //         },
    //         {
    //             "district_id": 78,
    //             "district_name": "Arwal"
    //         },
    //         {
    //             "district_id": 77,
    //             "district_name": "Aurangabad"
    //         },
    //         {
    //             "district_id": 83,
    //             "district_name": "Banka"
    //         },
    //         {
    //             "district_id": 98,
    //             "district_name": "Begusarai"
    //         },
    //         {
    //             "district_id": 82,
    //             "district_name": "Bhagalpur"
    //         },
    //         {
    //             "district_id": 99,
    //             "district_name": "Bhojpur"
    //         },
    //         {
    //             "district_id": 100,
    //             "district_name": "Buxar"
    //         },
    //         {
    //             "district_id": 94,
    //             "district_name": "Darbhanga"
    //         },
    //         {
    //             "district_id": 105,
    //             "district_name": "East Champaran"
    //         },
    //         {
    //             "district_id": 79,
    //             "district_name": "Gaya"
    //         },
    //         {
    //             "district_id": 104,
    //             "district_name": "Gopalganj"
    //         },
    //         {
    //             "district_id": 107,
    //             "district_name": "Jamui"
    //         },
    //         {
    //             "district_id": 91,
    //             "district_name": "Jehanabad"
    //         },
    //         {
    //             "district_id": 80,
    //             "district_name": "Kaimur"
    //         },
    //         {
    //             "district_id": 75,
    //             "district_name": "Katihar"
    //         },
    //         {
    //             "district_id": 101,
    //             "district_name": "Khagaria"
    //         },
    //         {
    //             "district_id": 76,
    //             "district_name": "Kishanganj"
    //         },
    //         {
    //             "district_id": 84,
    //             "district_name": "Lakhisarai"
    //         },
    //         {
    //             "district_id": 70,
    //             "district_name": "Madhepura"
    //         },
    //         {
    //             "district_id": 95,
    //             "district_name": "Madhubani"
    //         },
    //         {
    //             "district_id": 85,
    //             "district_name": "Munger"
    //         },
    //         {
    //             "district_id": 86,
    //             "district_name": "Muzaffarpur"
    //         },
    //         {
    //             "district_id": 90,
    //             "district_name": "Nalanda"
    //         },
    //         {
    //             "district_id": 92,
    //             "district_name": "Nawada"
    //         },
    //         {
    //             "district_id": 97,
    //             "district_name": "Patna"
    //         },
    //         {
    //             "district_id": 73,
    //             "district_name": "Purnia"
    //         },
    //         {
    //             "district_id": 81,
    //             "district_name": "Rohtas"
    //         },
    //         {
    //             "district_id": 71,
    //             "district_name": "Saharsa"
    //         },
    //         {
    //             "district_id": 96,
    //             "district_name": "Samastipur"
    //         },
    //         {
    //             "district_id": 102,
    //             "district_name": "Saran"
    //         },
    //         {
    //             "district_id": 93,
    //             "district_name": "Sheikhpura"
    //         },
    //         {
    //             "district_id": 87,
    //             "district_name": "Sheohar"
    //         },
    //         {
    //             "district_id": 88,
    //             "district_name": "Sitamarhi"
    //         },
    //         {
    //             "district_id": 103,
    //             "district_name": "Siwan"
    //         },
    //         {
    //             "district_id": 72,
    //             "district_name": "Supaul"
    //         },
    //         {
    //             "district_id": 89,
    //             "district_name": "Vaishali"
    //         },
    //         {
    //             "district_id": 106,
    //             "district_name": "West Champaran"
    //         }
    //     ]
    // },
    // {
    //     "state_id": 6,
    //     "state_name": "Chandigarh",
    //     "districts": [
    //         {
    //             "district_id": 108,
    //             "district_name": "Chandigarh"
    //         }
    //     ]
    // },
    // {
    //     "state_id": 7,
    //     "state_name": "Chhattisgarh",
    //     "districts": [
    //         {
    //             "district_id": 110,
    //             "district_name": "Balod"
    //         },
    //         {
    //             "district_id": 111,
    //             "district_name": "Baloda bazar"
    //         },
    //         {
    //             "district_id": 112,
    //             "district_name": "Balrampur"
    //         },
    //         {
    //             "district_id": 113,
    //             "district_name": "Bastar"
    //         },
    //         {
    //             "district_id": 114,
    //             "district_name": "Bemetara"
    //         },
    //         {
    //             "district_id": 115,
    //             "district_name": "Bijapur"
    //         },
    //         {
    //             "district_id": 116,
    //             "district_name": "Bilaspur"
    //         },
    //         {
    //             "district_id": 117,
    //             "district_name": "Dantewada"
    //         },
    //         {
    //             "district_id": 118,
    //             "district_name": "Dhamtari"
    //         },
    //         {
    //             "district_id": 119,
    //             "district_name": "Durg"
    //         },
    //         {
    //             "district_id": 120,
    //             "district_name": "Gariaband"
    //         },
    //         {
    //             "district_id": 136,
    //             "district_name": "Gaurela Pendra Marwahi "
    //         },
    //         {
    //             "district_id": 121,
    //             "district_name": "Janjgir-Champa"
    //         },
    //         {
    //             "district_id": 122,
    //             "district_name": "Jashpur"
    //         },
    //         {
    //             "district_id": 123,
    //             "district_name": "Kanker"
    //         },
    //         {
    //             "district_id": 135,
    //             "district_name": "Kawardha"
    //         },
    //         {
    //             "district_id": 124,
    //             "district_name": "Kondagaon"
    //         },
    //         {
    //             "district_id": 125,
    //             "district_name": "Korba"
    //         },
    //         {
    //             "district_id": 126,
    //             "district_name": "Koriya"
    //         },
    //         {
    //             "district_id": 127,
    //             "district_name": "Mahasamund"
    //         },
    //         {
    //             "district_id": 128,
    //             "district_name": "Mungeli"
    //         },
    //         {
    //             "district_id": 129,
    //             "district_name": "Narayanpur"
    //         },
    //         {
    //             "district_id": 130,
    //             "district_name": "Raigarh"
    //         },
    //         {
    //             "district_id": 109,
    //             "district_name": "Raipur"
    //         },
    //         {
    //             "district_id": 131,
    //             "district_name": "Rajnandgaon"
    //         },
    //         {
    //             "district_id": 132,
    //             "district_name": "Sukma"
    //         },
    //         {
    //             "district_id": 133,
    //             "district_name": "Surajpur"
    //         },
    //         {
    //             "district_id": 134,
    //             "district_name": "Surguja"
    //         }
    //     ]
    // },
    // {
    //     "state_id": 8,
    //     "state_name": "Dadra and Nagar Haveli",
    //     "districts": [
    //         {
    //             "district_id": 137,
    //             "district_name": "Dadra and Nagar Haveli"
    //         }
    //     ]
    // },
    {
        "state_id": 9,
        "state_name": "Delhi",
        "districts": [
            {
                "district_id": 141,
                "district_name": "Central Delhi"
            },
            {
                "district_id": 145,
                "district_name": "East Delhi"
            },
            {
                "district_id": 140,
                "district_name": "New Delhi"
            },
            {
                "district_id": 146,
                "district_name": "North Delhi"
            },
            {
                "district_id": 147,
                "district_name": "North East Delhi"
            },
            {
                "district_id": 143,
                "district_name": "North West Delhi"
            },
            {
                "district_id": 148,
                "district_name": "Shahdara"
            },
            {
                "district_id": 149,
                "district_name": "South Delhi"
            },
            {
                "district_id": 144,
                "district_name": "South East Delhi"
            },
            {
                "district_id": 150,
                "district_name": "South West Delhi"
            },
            {
                "district_id": 142,
                "district_name": "West Delhi"
            }
        ]
    }
]

export default states;