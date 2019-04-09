
connectDB = (sql) => {
    return db = new sql.Database('.test.db', sql.OPEN_READWRITE | sql.OPEN_CREATE, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Connected to the chinook database.');
            
        }            
    });
}

module.exports = function(app, sql) {
    app.get('/db/create', (req, res) => {
        let db = connectDB(sql);
    })

    app.post('/db/createtable', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*')
        let db = connectDB(sql);

        //let body = JSON.parse(req.body)
        let resRows = [];
        let dataType = ""
        console.log(body.dataType)
        req.body.dataType.forEach((key, index) => {
            dataType += (key.name, key.type, key.oprion , (index != req.body.dataType.length - 1) ? ', ' : '')
        });

        console.log(dataType)
        db.serialize(() => {
            db.run(`CREATE TABLE ${req.body.name}(${dataType})`, (err) => {
                if (err) {
                    return res.send(err.message)
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

    app.get('/db/tablescema/:tablename', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        let db = connectDB(sql);
        
        db.serialize(() => {
            db.all(`SELECT sql from sqlite_master WHERE name = '${req.params.tablename}'`, (err, rows) => {
                if (err) {
                    return res.send(err.message)
                } else {
                    let fieldsList = []

                    rows[0].sql.split('(')[1].split(')')[0].split(',').forEach((key) => {
                        console.log(key)
                        let obj = key.split(' ')
                        console.log(obj);
                        let field = {};
                        if (obj[0] === ''){
                            obj.splice(0, 1);
                        }
                        field.name = obj[0];
                        field.type = obj[1];
                        obj.splice(0, 2);

                        field.oprion = obj.toString().replace(/,/gi, ' ');

                        fieldsList.push(field);
                    })
                    

                    res.send(fieldsList)
                }
            })
        })        
    })

    app.get('/db/viewtable/:tablename', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        let db = connectDB(sql);

        db.serialize(() => {
            db.all(`SELECT * FROM ${req.params.tablename}`, (err, rows) => {
                if (err) {
                    res.send(err.message);
                } else {
                    res.send(rows);
                }
            })
        })
    })

    app.get('/db/tablelist/', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*')
        let db = connectDB(sql);   

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