const {Router} = require("express");
const router =Router();
const {User} = require("./../db")
const axios = require("axios")

router.get('/', async(req,res)=>{
    const filter=req.query.filter||"";
    const users = await User.find({
        $or: [
            { username: {
                "$regex":filter
            } }
        ]
    }).select('username problems -_id');
    console.log(users);
    res.send(users);
})

router.post('/', async (req,res)=>{
    const username=req.body.username;
    const user = await User.findOne({username});
    if(user)
    {
        return res.status(411).json({
            message :"Username already present"
        })
    }
    const response = await axios.get("https://leetcode-api-faisalshohag.vercel.app/"+username);
    if(response.data.errors)
    {
        return res.status(411).json({
            message :"Username does not exist"
        })
    }
    const newUser =await User.create({
        username:username,
        problems : response.data.totalSolved
    })
    console.log(newUser);
    res.json({
            message : "User created succesfully"
        });
})

router.delete("/",async (req,res)=>{
    try {
        await User.deleteOne({ username : req.body.username });
        console.log('User deleted successfully');
        return res.send("user deleted successfully")
      } catch (err) {
        console.error('Error deleting the user:', err);
        return res.status(411).json({
            message :"delete was unsuccesfull"
        })
      }
})

module.exports = router