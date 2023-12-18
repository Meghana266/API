const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/api");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const User = require('./userSchema');
const Property = require('./propertySchema');
const Agent = require('./agentSchema');
const Contact = require('./contactSchema');
const SellPropertyModel = require('./SellProperty');

app.listen(5000, function () {
    console.log("server is running.....")
});

app.get("/users", async (req, res) => {
    const users = await User.find();
    return res.status(200).json(users);
});

app.get("/properties", async (req, res) => {
    const properties = await Property.find();
    return res.status(200).json(properties);
});

app.post("/users", async (req, res) => {
    try {
        const { name, email, mobile, password} = req.body;

        const duplicateUser = await User.findOne({ $or: [{ email }, { mobile }] });
        if (duplicateUser) {
            return res.status(400).json({ error: "User already exists with this email or mobile number" });
        }

        const newUser = new User({
            name,
            email,
            mobile,
            password
        });

        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/agents", async (req, res) => {
    try {
        const { name, email, mobile, password, profession, experience} = req.body;

        const duplicateAgent = await Agent.findOne({ $or: [{ email }, { mobile }] });
        if (duplicateAgent) {
            return res.status(400).json({ error: "Agent already exists with this email or mobile number" });
        }

        const newAgent = new Agent({
            name,
            email,
            mobile,
            password,
            profession,
            experience
        });

        const savedAgent = await newAgent.save();
        return res.status(201).json(savedAgent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/contacts", async (req, res) => {
    try {
        const { name, email, subject, message} = req.body;

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        const savedContact = await newContact.save();
        return res.status(201).json(savedContact);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/api/sellProperty',async (req,res)=>{
    
      try {
        const name = req.body.name;
        const contact = req.body.contact;
        const category = req.body.category;
        const price = req.body.price;
        const details = req.body.details;
        const id = Date.now();

        console.log(name)
        const newProperty = new SellPropertyModel({ id, name, contact,category,price,details });
        await newProperty.save();

        res.status(201).json(newProperty);
        }
    catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
});

app.get('/api/sellProperties', async (req, res) => {
    try {
        const properties = await SellPropertyModel.find({});
        res.status(200).json(properties);
    } catch (error) {
        console.error('Error retrieving properties from MongoDB:', error);
        res.status(500).json({ error: 'Internal Server get Error' });
    }
});
