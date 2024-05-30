const express = require('express');
const router = express.Router();
//const Album = require('./Album');

router.get('/:artistId/albums', async (req, res, next) => {
    try {
        const albums = await Album.find({ artist: req.params.artistId });
        res.status(200).json(albums);
    } catch (error) {
        next(error);
    }
});

router.get('/:artistId/albums/:albumId', async (req, res, next) => {
    try {
        const album = await Album.findOne({ _id: req.params.albumId, artist: req.params.artistId });
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.status(200).json(album);
    } catch (error) {
        next(error);
    }
});

router.post('/:artistId/albums', async (req, res, next) => {
    try {
        const { title, releaseYear } = req.body;
        const artistId = req.params.artistId;
        const album = new Album({ title, releaseYear, artist: artistId });
        await album.save();
        res.status(201).json(album);
    } catch (error) {
        next(error);
    }
});

router.put('/:artistId/albums/:albumId', async (req, res, next) => {
    try {
        const { albumId } = req.params;
        const { title, releaseYear } = req.body;
        const updatedAlbum = await Album.findOneAndUpdate({ _id: albumId, artist: req.params.artistId }, { title, releaseYear }, { new: true });
        if (!updatedAlbum) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.status(200).json(updatedAlbum);
    } catch (error) {
        next(error);
    }
});

router.delete('/:artistId/albums/:albumId', async (req, res, next) => {
    try {
        const { albumId } = req.params;
        await Album.findOneAndDelete({ _id: albumId, artist: req.params.artistId });
        res.status(200).json({ message: `Album ${albumId} deleted` });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
