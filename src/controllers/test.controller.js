//const testModel = require('../models/test');
const testModel = require('../models/test.model');
const mongo = require('mongodb');
var getTest = (req, res, next) => {
    let List1 = [];
    testModel.find({}, function (err, tests) {
        if (err) {
            next(err);
        } else {
            for (let test of tests) {
                List1.push({ id: test._id, name: test.name, contact: test.contact });
            }
            res.json({ status: "success", message: "Test list found!!!", data: { tests: List1 } });

        }
    });
};

var postTest = (req, res, next) => {
    //console.log(req.body)
    testModel.create({ name: req.body.name, contact: req.body.contact }, function (err, result) {
        if (err)
            next(err);
        else
        {
            res.json({ status: "success", message: "Added successfully!!!", data: result });
        }
    });
//res.json({ status: "success", message: "Added successfully!!!", data: null });
 };

var getTestById = (req, res, next) => {
    //console.log(req.params.id);
    //res.json({ status: "success", message: "Test found!!!", data: { test: '' } });
    testModel.findById(req.params.id, function (err, test) {
        if (err) {
            next(err);
        } else {
            res.json({ status: "success", message: "Test found!!!", data: { test: test } });
        }
    });
}

var putTest = (req, res, next) => {
    var updateObj = { "$set": { "name": req.body.name, "contact": req.body.contact }}
    testModel.updateOne({'_id' : mongo.ObjectID(req.params.id) }, updateObj, (err, result) => {
        if(err)
        {
            next(err);
        }
        else
        {
            res.json({"IsSuccess" : true,"message" : "Testdata has been updated successfully."}).status(200);
        }
    })
};

var deleteTest = (req, res, next) => {
    testModel.deleteOne({'_id' : mongo.ObjectID(req.params.id) }, (err, result) => {
        if(err)
        {
            next(err);
        }
        else
        {
            res.json({"IsSuccess" : true,"message" : "Testdata has been deleted successfully."}).status(200);
        }
    })
};

module.exports = {
    getTest, postTest, getTestById, putTest, deleteTest
};