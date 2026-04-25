const updateItem = (req,res) =>{
    const oldItem = req.params.item.toLowerCase();
    const {newItem} = req.body;

    if(!newItem){
        return res.status(400).json({message: "NewItem is required in the body"});
    }

    const index = data.findIndex(
        (i) => i.toLowerCase() === oldItem
    );

    if(index == -1){
        return res.status(404).json({message: "Item not found"});
    }
    
    data[index] = newItem.toLowerCase();

    res.json({
        message: "Item updated",
        updated: {from: oldItem, to: newItem.toLowerCase()},
        data
    })
}
