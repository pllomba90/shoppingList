const express = require('express');
const router =  new express.Router();
const fakeDB = require("./fakeDb");

router.get("/", (req, res) => {
    try {
        res.json(fakeDB);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

})

router.post("/", (req, res) =>{
    try {
        let newItem = {"name":req.body.name, "price":req.body.price};
  fakeDB.push(newItem);
  res.json(fakeDB);  
} catch (error){
    res.status(500).json({messsage: "Internal server error"});
}
  
})

router.get("/:name", (req, res) => {
    try {
        const itemName = req.params.name;
    const item = fakeDB.find(item => item.name === itemName);
    
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
}   catch(error){
    res.status(404).json({ message: "Item not found" });

}
    
});

router.patch("/:name", (req, res) => {
    const itemName = req.params.name;
    const itemIndex = fakeDB.findIndex(item => item.name === itemName);

    if (itemIndex !== -1){
        if (req.body.name) {
            fakeDB[itemIndex].name = req.body.name;
        }
        if (req.body.price) {
            fakeDB[itemIndex].price = req.body.price;
        }

        res.json(fakeDB[itemIndex]);
    } else {
        res.status(500).json({messsage: "Internal server error"});
    }
});

router.delete("/", (req, res) => {
    try {
        const itemName = req.params.name;
    const itemIndex = fakeDB.findIndex(item => item.name === itemName);

    if (itemIndex !== -1) {
        const deletedItem = fakeDB.splice(itemIndex, 1);

        res.json({message: "Item deleted"}); 
    } else {
        res.status(404).json({ message: "Item not found" });
    }  
} catch(error){
    res.status(500).json({messsage: "Internal server error"});
}
    
});
module.exports = router;