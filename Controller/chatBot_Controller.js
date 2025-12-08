// const {encode}=require("../Config/encodeJson.js");
const chatBot_Controller={
    getData:(req,res)=>{
        res.status(200).json({msg:"chatbot"});
    },
    encodeData:(req,res)=>{
        console.log(encode());
    }
}

module.exports=chatBot_Controller;