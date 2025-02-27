var express = require('express');
const Model_Transmisi = require('../model/Model_Transmisi');
var router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        let rows = await Model_Transmisi.getAll();
        return res.status(200).json({
            status: true,
            message: 'Data Transmisi',
            data: rows
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan pada router'
        });
    }
});

router.post('/store', async function(req, res, next) {
    try {
        let { nama_transmisi } = req.body;
        let Data = { nama_transmisi };

        await Model_Transmisi.Store(Data);
        return res.status(201).json({
            status: true,
            message: 'Data transmisi berhasil ditambahkan'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

router.patch('/update/:id_transmisi', async function(req, res, next) {
    try {
        let id_transmisi = req.params.id_transmisi;
        let { nama_transmisi } = req.body;
        let Data = { nama_transmisi };

        await Model_Transmisi.Update(id_transmisi, Data);
        return res.status(200).json({
            status: true,
            message: 'Data transmisi berhasil diperbarui'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan pada router'
        });
    }
});

router.delete('/delete/:id_transmisi', async function(req, res, next) {
    try {
        let id_transmisi = req.params.id_transmisi;
        await Model_Transmisi.Delete(id_transmisi);
        return res.status(200).json({
            status: true,
            message: 'Data transmisi berhasil dihapus'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan pada router'
        });
    }
});

module.exports = router;
