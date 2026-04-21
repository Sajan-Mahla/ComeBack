const express = require("express")
const app = express();
app.use(express.json());

app.get("/ping", (req,res) =>{
    const time = new Date();
    res.json({message: "Pong 🏓",
      time: time
    });
});

app.get("/hello/:name", (req,res) => {
    const name = req.params.name;
    res.json({message: `Hello ${name}, Backend mai swagat hai...`})
})

app.get("/search",(req,res) =>{
    const q = req.query.q;

    if(!q){
        return res.json({error: "Bhai kuch to search krle pls"
        })
    }

    if(q.length < 3){
        return res.json({error: `Thoda sa likh to sale, hath tutte hai jo yeh haga hai 2 words ka cake: ${q}`})
    }

    if(q.trim()){
        return res.json({message:"Empty search allowed nhi hai bhai"})
    }

    res.json({
        search: q,
        result: `Tu ${q} dhund raha hai, mil gaaya kya ? `
    })
})

app.listen(3000, () => {
    console.log("Server started")
})
