
const express = require('express');
const app = express();
const axios = require('axios');
const movie={};
const morgan  = require('morgan');

// const path = require('path');
app.use(morgan('dev'));

app.get('/', function(req,res){
   if(movie[req.url]===undefined){
        axios.get('http://www.omdbapi.com' + req.url + '&apikey=8730e0e')
            .then(function (response) {
                //  console.log(response);
                movie[req.url]=response.data;
                res.json(movie[req.url]);
            })
            .catch(function (error) {
                // console.log(error);
                res.status(500).send({error:'Something Broke Man'});
            })
    } else {
        res.json(movie[req.url]);
    }                      
});


// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;
 