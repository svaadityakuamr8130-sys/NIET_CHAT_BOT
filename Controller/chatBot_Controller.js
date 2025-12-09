// const {encode}=require("../Config/encodeJson.js");
const chatBot_Controller={
    getData:(req,res)=>{
        res.status(200).json({msg:"chatbot"});
    },
    input_msg:(req,res)=>{
        const {input}=req.body;
        res.status(200).json({msg:input});


    }
}

module.exports=chatBot_Controller;