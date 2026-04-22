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

module.exports = {searchItems}