import express from 'express'
import bodyParser from 'body-parser'
import {trackid} from '../controller/trackerapi.js'
export const orderDetails = express.Router()

orderDetails.use(bodyParser.json());

const trackingInformation = [
    {
        orderNum: "order123",
        trackingNumber: "00340434292135100186"
    },
    {
        orderNum: "234r34243",
        trackingNumber: "00340434292135100186"
    },
    {
        orderNum: "345455666",
        trackingNumber: "00340434292135100186"
    }
]

orderDetails.post('/track/:orderNumber',async(req,res)=>{

    const {orderNumber} = req.params;
    console.log(orderNumber)
    
    const trackingInfo = trackingInformation.find(info => info.orderNum === orderNumber);
    console.log(trackingInfo)
    if (!trackingInfo) {
        return res.status(404).json({error: `No tracking information found for the ${orderNumber}`});
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