const express = require('express');
const router = express.Router();
const Artist = require('./Artist');

router.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (error) {
        next(error);
    }
});

router.get('/:artistId', async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.artistId);
        res.status(200).json(artist);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { name, genre } = req.body;
        const artist = new Artist({ name, genre });
        await artist.save();
        res.status(201).json({ message: 'Artist added successfully' });
    } catch (error) {
        next(error);
    }
});

router.put('/:artistId', async (req, res, next) => {
    try {
        const { artistId } = req.params;
        const { name, genre } = req.body;
        await Artist.findByIdAndUpdate(artistId, { name, genre });
        res.status(200).json({ message: `Artist ${artistId} updated` });
    } catch (error) {
        next(error);
    }
});

router.delete('/:artistId', async (req, res, next) => {
    try {
        const { artistId } = req.params;
        await Artist.findByIdAndDelete(artistId);
        res.status(200).json({ message: `Artist ${artistId} deleted` });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
