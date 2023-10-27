import axios from 'axios'

export const trackid = async (trackingid) =>{
    const apiKey = process.env.API_KEY
    const apiurl = `https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingid}`
    try {
        const trackResponse = await axios.get(apiurl ,{
    headers :{
        'Accept': 'application/json',
        'API-Key': apiKey
    }}
    )
    return {"tracking detaild" : trackResponse?.data}
}
    catch (error) {
        console.log('Error:', error);
    }
}
