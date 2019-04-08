

module.exports = function(app, sql) {
    app.get('/db/create', (req, res) => {
        let db = new sql.Database('.test.bd', sql.OPEN_READWRITE | sql.OPEN_CREATE, (err) => {
            if (err) {
                res.send(err.message);
            } else {
                console.log('Connected to the chinook database.');
                res.sendStatus(200);
            }            
        });
    })

    app.post('/db/createtable', (req, res) => {
        let db = new sql.Database('.test.bd', sql.OPEN_READWRITE | sql.OPEN_CREATE, (err) => {
            console.log(req.body)
            if (err) {
                res.send(err.message);
            } else {
                console.log('Connected to the chinook database.');                 
            }            
        });

        let resRows = [];
        db.serialize(() => {
            db.run(`CREATE TABLE ${req.body.name}(name text)`)
            .run(`INSERT INTO ${req.body.name}
                    VALUES('HI'),
                        ('HELLO'),
                        ('}{UITAasd')`)
            .each(`SELECT name FROM ${req.body.name}`, (err, row) => {
                    if (err) {
                        res.send(err)
                    } else {
                        resRows.push(row);
                    }
            })                     
        });
        db.close((err)=> {
            if (err) {
                res.send(err)
            } else {
                console.log(resRows);
                res.send(resRows); 
            }
        })        
    })

    app.post('/db/viewtable', (req, res) => {
        let db = new sql.Database('.test.bd', sql.OPEN_READWRITE | sql.OPEN_CREATE, (err) => {
            console.log(req.body)
            if (err) {
                res.send(err.message);
            } else {
                console.log('Connected to the chinook database.');                 
            }            
        });

        db.serialize(() => {
            db.all(`SELECT DISTINCT name FROM ${req.body.name} ORDER BY name`, (err, rows) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(rows);
                }
            })
        })
    })

    app.get('/db/tablelist/', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*')
        let db = new sql.Database('.test.bd', sql.OPEN_READWRITE | sql.OPEN_CREATE, (err) => {
            console.log(req.body)
            if (err) {
                res.send(err.message);
            } else {
                console.log('Connected to the chinook database.');                 
            }            
        });      

        db.all(`SELECT name FROM sqlite_master WHERE type ='table'`, (err, rows) => {
            if (err) {
                console.log(err);
                res.send(err.message)
                return 1;
            } else {
                console.log(rows);
                res.send(rows)
            }
        })
    })
};