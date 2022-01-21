const Contact = require('../models/Contact')

const getAllQs = async (req, res) => {
    const queries = await Contact.find()
    if(!queries) return res.status(204).json({'message': 'no queries found'})
    res.status(200).json({"success": "queries found!", queries})
}

const addQ = async (req, res) => {

    if (!req?.body?.name || !req?.body?.email || !req?.body?.query) return res.status(400).json({ 'Error': 'All fields are required! .' });
    
    try {
        //create and store the new comment
        const results = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            query: req.body.query,
        })

        res.status(201).json({"success":"Query created!",results})
    } catch (err) {
        console.error(err)
        res.status(400).json({'Error':'bad request!'})
    }
}
const deleteQs = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'Error': 'ID parameter required!.' });
    const query = await Contact.findOne({_id: req.params.id}).exec()
    if (!query) return res.status(400).json({"Error": `query ID${req.params.id} not found`})

    const result = await query.deleteOne({_id: req.params.id})
    res.status(200).json({'Success': 'query Deleted'})
}

module.exports = { 
    addQ,
    getAllQs,
    deleteQs,
 }