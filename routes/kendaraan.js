var express = require('express');
const multer = require('multer');
const path = require('path');
const Model_Kendaraan = require('../model/Model_Kendaraan');
var router = express.Router();

// Konfigurasi penyimpanan gambar menggunakan multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Folder penyimpanan gambar
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file dengan timestamp
    }
});

const upload = multer({ storage: storage });

// GET semua kendaraan
router.get('/', async function (req, res, next) {
    try {
        let rows = await Model_Kendaraan.getAll();
        return res.status(200).json({
            status: true,
            message: 'Data Kendaraan',
            data: rows
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan pada router'
        });
    }
});

// POST store kendaraan dengan unggahan gambar
router.post('/store', upload.single('gambar_kendaraan'), async function (req, res, next) {
    try {
        console.log(req.body, req.file); // Debugging untuk melihat data yang dikirim

        let { no_pol, nama_kendaraan, id_transmisi } = req.body;
        let gambar_kendaraan = req.file ? req.file.filename : null; // Simpan nama file gambar

        if (!no_pol) {
            return res.status(400).json({
                status: false,
                message: 'No Polisi tidak boleh kosong'
            });
        }

        let Data = { no_pol, nama_kendaraan, id_transmisi, gambar_kendaraan };
        await Model_Kendaraan.Store(Data);

        return res.status(201).json({
            status: true,
            message: 'Data kendaraan berhasil ditambahkan'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

// PATCH update kendaraan dengan unggahan gambar
router.patch('/update/:no_pol', upload.single('gambar_kendaraan'), async function (req, res, next) {
    try {
        let no_pol = req.params.no_pol;
        let { nama_kendaraan, id_transmisi } = req.body;
        let gambar_kendaraan = req.file ? req.file.filename : null;

        if (!no_pol) {
            return res.status(400).json({
                status: false,
                message: 'No Polisi tidak boleh kosong'
            });
        }

        let Data = { nama_kendaraan, id_transmisi, gambar_kendaraan };
        await Model_Kendaraan.Update(no_pol, Data);

        return res.status(200).json({
            status: true,
            message: 'Data kendaraan berhasil diperbarui'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan pada router'
        });
    }
});

// DELETE kendaraan
router.delete('/delete/:no_pol', async function (req, res, next) {
    try {
        let no_pol = req.params.no_pol;
        await Model_Kendaraan.Delete(no_pol);

        return res.status(200).json({
            status: true,
            message: 'Data kendaraan berhasil dihapus'
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan pada router'
        });
    }
});

module.exports = router;
