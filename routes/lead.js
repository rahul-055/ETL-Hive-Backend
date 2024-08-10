const express = require('express');
const router = express.Router();
const Lead = require('../models/lead');

router.post('/addLead', async (req, res) => {
    try {
        // if (!req.body.email) {
        //     return res.status(400).json({ error: 'Email is required' });
        // }
        const { name, number, email, product } = req.body;
        const lead = new Lead({ name, number, email, product });
        await lead.save();
        res.status(201).json({ message: 'Lead created' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/listLead', async (req, res) => {
    try {
        let { query } = req.query;
        let filter = {};
        if (query) {
            const numberQuery = parseInt(query, 10);
            if (!isNaN(numberQuery)) {
                filter = { number: numberQuery }; // Match the exact number
            } else {
                const regex = new RegExp(query, 'i');
                filter = {
                    $or: [
                        { name: { $regex: regex } },
                        { email: { $regex: regex } },
                        { product: { $regex: regex } },
                    ]
                };
            }
        } else {
            filter = {}
        }
        const leads = await Lead.find(filter);
        res.status(200).json(leads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/viewLead/:id', async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ error: 'Lead not found' });
        }

        res.status(200).json(lead); // Send the lead details as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/updateLead/:id', async (req, res) => {
    try {
        // Find the lead by ID and update with new data
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                product: req.body.product
            },
            { new: true, runValidators: true } // Return the updated document and run validation
        );

        // if (!lead) {
        //     return res.status(404).json({ error: 'Lead not found' });
        // }

        res.status(200).json(lead); // Send the updated lead as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/deleteLead/:id', async (req, res) => {
    try {
        // Find the lead by ID and delete it
        const lead = await Lead.findByIdAndDelete(req.params.id);

        if (!lead) {
            return res.status(404).json({ error: 'Lead not found' });
        }

        res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;