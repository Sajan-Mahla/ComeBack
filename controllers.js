const data = ["apple", "banana", "chai", "samosa", "backend"];

const searchItems = (req,res) =>{
    const q = req.query.q;


if(!q) {
    return res.json({error: "Search kuch toh kar"})
}


const query = q.toLowerCase();
const result = data.filter(item => 
    item.toLowerCase().includes(q.toLowerCase())
)

if(result.length == 0){
    return res.json({
        message: "Kuch nhi mila"
    })
}

res.json({
    search: q,
    results: result
})

}

const addItem = (req,res) =>{
    const {item} = req.body;

    if(!item){
        return res.status(400).json({message: "Item required"})
    }

    data.push(item.toLowerCase());

    res.json({
        message: "Item added",
        data
    })
}

module.exports = {searchItems, addItem };