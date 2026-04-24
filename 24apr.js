const deleteItem = (req,res) =>{
    const item = req.params.item.toLowerCase();

    const index = data.findIndex(
        (i) => i.toLowerCase() === item
    )

    if(index === -1){
        return res.status(404).json({message: "Item not found"})
    }
    data.splice(index,1);

    res.json({
        message: "Item deleted",
        data
    })
}
