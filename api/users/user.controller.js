const { create,getUserByUserId,getUsers,updateUser,deleteUser,getUserByUserEmail }=require("./user.service");
const {genSaltSync,hashSync,compare, compareSync}=require("bcrypt");
// const { json } = require("body-parser");
const { sign }=require("jsonwebtoken");
module.exports={
    createUser:(req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:"false",
                    message:"Database connection error"
                });
            }
            return res.status(200).json({
                success:"true",
                data:results
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
          if (err) {
            console.log(err);
          }
          if (!results) {
            return res.json({
              success: "False",
              data: "Invalid password or email"
            });
          }
        //   let result = compareSync(body.password, results.password);
        compare(body.password, results.password, function(err, saif) {
            if(err){
                return err
            } 
            if(saif) {
                const jsontoken = sign({ result: results }, process.env.JWT_key, {
                    expiresIn: "1h"
                  });
                  return res.json({
                    success: "True",
                    message: "login successfully",
                    token: jsontoken
                  });
            } else {
                return res.json({
                    success: "False",
                    data: "Invalid email or password"
                });
            }
            // result == true
        });
          console.log(body.password,results.password);
        //   if (result===true) {
        //       // results.password = undefined;
        //     const jsontoken = sign({ result: results }, "qwe1234", {
        //         expiresIn: "1h"
        //       });
        //       return res.json({
        //         success: "True",
        //         message: "login successfully",
        //         token: jsontoken
        //       });
            
        //   } else {
            
        //     return res.json({
        //       success: "False",
        //       data: "Invalid email or password"
        //     });
            
        //   }
        });
      },

    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: "False",
              message: "Record not Found"
            });
          }
          results.password = undefined;
          return res.json({
            success: "True",
            data: results
          });
        });
      },

      getUsers: (req, res) => {
        getUsers((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            success: "True",
            data: results
          });
        });
      },

      updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            success: "True",
            message: "updated successfully"
          });
        });
      },
      deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: "False",
              message: "Record Not Found"
            });
          }
          return res.json({
            success: "True",
            message: "user deleted successfully"
          });
        });
      },
      

}