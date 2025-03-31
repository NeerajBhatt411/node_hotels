const express = require("express");
const router = express.Router();
const MenuItem = require("../model/MenuItem");
const Person = require("../model/person");

router.post("/", async (req, res) => {
    try {
        const data = req.body
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// for getting all menuItems

router.get("/", async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("data fetched sucessfully");
        res.status(200).json(data);


    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "error in fetching data " });

    }





});

router.get("/:taste", async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == "sweet" || taste == "spicy" || taste == "sour") {
            const response = await MenuItem.find({ taste: taste });
            console.log("taste fetched")
            res.status(200).json(response);

        }
        else {
            res.status(400).json({ error: "Invalid taste " })

        }


    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "error in fetching data " });

    }
})


// menu items ko update krna ke liye

router.put('/:id', async (req, res)=>{
    try{
        const menuId = req.params.id; // Extract the id of Menu Item from the URL parameter
        const updatedMenuData = req.body; // Updated data for the Menu Item

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// menu items ko delete krna ke liye 

router.delete('/:id', async (req, res) => {
    try{
        const menuId = req.params.id; // Extract the Menu's ID from the URL parameter
        
        // Assuming you have a MenuItem model
        const response = await MenuItem.findByIdAndDelete(menuId);
        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'Menu Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


module.exports = router;

