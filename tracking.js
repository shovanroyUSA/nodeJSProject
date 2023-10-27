import express from 'express'
import bodyParser from 'body-parser'
import {trackid} from '../controller/trackerapi.js'
export const orderDetails = express.Router()

orderDetails.use(bodyParser.json());

const trackingInformation = [
    {
        orderNum: "123456",
        trackingNumber: "JJD149990200055881941"
    },
    {
        orderNum: "9860022",
        trackingNumber: "JJD149990200055881941"
    },
    {
        orderNum: "6876543",
        trackingNumber: "JJD149990200055881941"
    }
]

orderDetails.post('/track/:orderNum',async(req,res)=>{
// orderDetails.post('/track/',async(req,res)=>{
//     ordernum = req.body

    const {orderNum} = req.body;
    if (!orderNum) {
        return res.json({ error: 'Order number required.' });
    }

    const trackingInfo = trackingInformation.find(info => info.orderNum === orderNum);
    if (!trackingInfo) {
        return res.status(404).json({error: 'No tracking information found for the'});
    }

    
    try {
        const trackingDetails = await trackid(trackingInfo.trackingNumber)
        return res.json({ trackingDetails })
    }
    
    catch(error)
    {
        return res.status(500).json({ error: 'Fetching tracking details' });
    }

})