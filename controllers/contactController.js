const Contact = require('../models/Contact')

const getAllQs = async (req, res) => {
    const queries = await Contact.find()
    if(!queries) return res.status(204).json({"status":"success", "message":"no queries found"})
    res.status(200).json({"status":"success", "data":{"queries":queries}})
}

const addQ = async (req, res) => {

    if (!req?.body?.name || !req?.body?.email || !req?.body?.query) return res.status(400).json({ "status":"fail", "error":"all fields are required" });
    
    try {
        //create and store the new comment
        const results = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            query: req.body.query,
        })

        res.status(201).json({"status":"success", "data":{"query":results}})
    } catch (err) {
        console.error(err)
        res.status(500).json({"status":"fail", "error":"Internal server error"})
    }
}
const deleteQs = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "status":"fail", "error":"parameter id required" });
    const query = await Contact.findOne({_id: req.params.id}).exec()
    if (!query) return res.status(400).json({"status":"fail", "error":`query ${req.params.id} not found`})

    const result = await query.deleteOne({_id: req.params.id})
    res.status(200).json({"status":"success", "message":"query deleted"})
}

module.exports = { 
    addQ,
    getAllQs,
    deleteQs,
 }