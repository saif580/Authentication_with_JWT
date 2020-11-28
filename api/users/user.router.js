// const { updateUser } = require("./user.service");
const router=require("express").Router();
const { createUser,login,getUserByUserId,getUsers,updateUsers,deleteUser }=require("./user.controller");

router.post("/",createUser);
router.get("/",getUsers);
router.get("/:id",getUserByUserId);
router.patch("/",updateUsers);
router.delete("/",deleteUser);
router.post("/login",login);
module.exports=router;