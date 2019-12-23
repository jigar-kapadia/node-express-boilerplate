const customerModel = require('./../models/customer.model');
const mongoDb = require('mongodb');

var getCustomer = (request, response, next) => {
    let customers = [];
    customerModel.find({}, (err, result) => {
        if (err)
            next(err);
        else {
            for (let c of result) {
                customers.push(c);
            }
            response.status(200).json({ status: 'success', message: '', data: { customers: customers } });
        }
    })
};

var postCustomer = (request, response, next) => {
    var customer = {
        fname : request.body.fname,
        lname : request.body.lname,
        username : request.body.username,
        password : request.body.password,
        email : request.body.email,
        contact : request.body.contact,
        role : request.body.role,
        updatedDate : null,
        active : true,
        emailVerified : false
    };

    customerModel.create(customer, function (err, result) {
        if (err)
            next(err);
        else
        {
            response.status(200).json({ status: "success", message: "Added successfully!!!", data: result });
        }
    });
};

var putCustomer = (request, response, next) => {
    var updateObj = { "$set": { "fname": request.body.fname, "lname": request.body.lname, 
                     "contact" : request.body.contact, "updatedDate" : Date.now }}
    customerModel.updateOne({'_id' : mongo.ObjectID(req.params.id) }, updateObj, (err, result) => {
        if(err)
        {
            next(err);
        }
        else
        {
            response.status(200).json({ status: "success", message: "Updated successfully!!!", data: result });
        }
    })
};

var deleteCustomer = (request, response, next) => {
    customerModel.deleteOne({'_id' : mongo.ObjectID(request.params.id) }, (err, result) => {
        if(err)
        {
            next(err);
        }
        else
        {
            response.status(200).json({ status: "success", message: "Deleted successfully!!!", data: result });
        }
    })
};

var getCustomerbyId = (request, response, next) => {
    
    customerModel.findOne({'_id' : mongo.ObjectID(request.params.id) }, (err, result) => {
        if (err)
            next(err);
        else {
            for (let c of result) {
                customers.push(c);
            }
            response.status(200).json({ status: 'success', message: '', data: { customers: customers } });
        }
    })
};

module.exports = {
    getCustomer, postCustomer, putCustomer, deleteCustomer, getCustomerbyId
}   