const express = require('express');
const mysql = require('mysql')
const router = express.Router()

//connetion
const mysqlConnection = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'store',
});


router.get('/' , (req, res) => {
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl' , error);
        } else {
            mysqlConnection.query('SELECT * FROM products', (err, rows, fields) => {
                if (rows != '') {
                    res.json(rows);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.get('/:id' , (req, res) => {
    console.log(req.params.id)
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl' , error);
        } else {
            mysqlConnection.query('SELECT * FROM products WHERE id = ?', req.params.id, (err, rows, fields) => {
                if (rows != '') {
                    res.json(rows[0].state);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.get('/quantity/:id' , (req, res) => {
    console.log(req.params.id)
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl' , error);
        } else {
            mysqlConnection.query('SELECT * FROM products WHERE id = ?', req.params.id, (err, rows, fields) => {
                if (rows != '') {
                    res.json(rows[0].quantity);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.post('/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log('metodo post' + data)
     mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('UPDATE products set ? WHERE id = ?', [data, id], (err, rows, fields) => {
                if (!err) {
                    res.json(true);
                } else {
                    console.log(err);
                    res.json(null);
                }
            });
        }
    }); 
});



module.exports  = router;