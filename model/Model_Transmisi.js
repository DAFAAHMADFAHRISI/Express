const connection = require('../config/databases');

class Model_Transmisi {
    static getAll() {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM transmisi ORDER BY id_transmisi DESC',
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO transmisi SET ?', Data, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }

    static async getId(id_transmisi) {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM transmisi WHERE id_transmisi = ?',
                [id_transmisi],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }

    static async Update(id_transmisi, Data) {
        return new Promise((resolve, reject) => {
            connection.query(
                'UPDATE transmisi SET ? WHERE id_transmisi = ?',
                [Data, id_transmisi],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    }

    static async Delete(id_transmisi) {
        return new Promise((resolve, reject) => {
            connection.query(
                'DELETE FROM transmisi WHERE id_transmisi = ?',
                [id_transmisi],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    }
}

module.exports = Model_Transmisi;
