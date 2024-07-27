const {Router} = require("express");
const router =Router();
const userRouter = require("./users");

router.use("/user",userRouter);

module.exports = router