const express = require('express')
let {PythonShell} = require('python-shell')
const formidable = require('formidable');
const fs = require('fs');

const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
app.use(require('body-parser').urlencoded({extended:false}));

app.post('/', (req,res) => {
    // req.body;
    const form = new formidable.IncomingForm();
    form.parse(req, (err,fields,files) => {
        if(err != null){
            console.log(err);
            return res.status(400).json({message : err.message});

        }
        const [fileName] = Object.keys(files);
        
        res.json({filename : fileName});
    })

    
    let options = {
        mode: 'text' ,
        args: [req.body.kValue , req.body.file]
    }


    PythonShell.run('knn.py' , options, (err,results) => {
        if(err) throw err;
        
        console.log('results:' + results);
    }) 

    console.log((req.body.kValue))
    console.log((req.body.file))
});






app.listen(PORT , () => {

    console.log(`server started on port ${PORT}`);
});
