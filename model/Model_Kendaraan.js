const connection = require('../config/databases');

class Model_Kendaraan {
    static getAll() {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT k.no_pol, k.nama_kendaraan, t.nama_transmisi, k.gambar_kendaraan FROM kendaraan k LEFT JOIN transmisi t ON k.id_transmisi = t.id_transmisi ORDER BY k.no_pol DESC',
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO kendaraan SET ?', Data, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }

    static async getId(no_pol) {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM kendaraan WHERE no_pol = ?',
                [no_pol],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }

    static async Update(no_pol, Data) {
        return new Promise((resolve, reject) => {
            connection.query(
                'UPDATE kendaraan SET ? WHERE no_pol = ?',
                [Data, no_pol],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    }

    static async Delete(no_pol) {
        return new Promise((resolve, reject) => {
            connection.query(
                'DELETE FROM kendaraan WHERE no_pol = ?',
                [no_pol],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    }
}

module.exports = Model_Kendaraan;
