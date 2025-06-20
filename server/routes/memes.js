const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

// getting all memes
router.get('/', async (req, res) => {
    const {data, error} = await supabase.from('memes').select('*').order('upvotes', {ascending: false});
    if (error) return res.status(500).json({error: error.message});
    // console.log(data);
    res.json(data);
});

// posting a new meme
router.post('/', async(req,res) => {
    const {title, image_url, tags, caption, vibes, upvotes, owner_id} = req.body;

    const {data, error} = await supabase.from('memes').insert([
        {
            title,
            image_url,
            tags,
            caption,
            vibes,
            upvotes: 0,
            owner_id
        }
    ]);

    if (error) return res.status(500).json({error: error.message});
    res.status(201).json(data[0]);  
});

module.exports = router;