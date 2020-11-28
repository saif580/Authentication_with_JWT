const pool=require("../../config/database");


module.exports = {
    create: (data, callBack) => {
      pool.query(
        `insert into registration(firstName, lastName, email, password) 
                  values(?,?,?,?)`,
        [
          data.first_name,
          data.last_name,
          data.email,
          data.password,
        ],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
    );
    },

    getUsers:callBack=>{
        pool.query(
            `select id,firstName,lastName,email,password from registration`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },

    getUserByUserId:(id,callBack)=>{
        pool.query(
            `select id,firstName,lastName,email,password from registration where id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },

    updateUser:(data,callBack)=>{
        pool.query(
            `update registration set firstName=?, lastName=?, email=?, password=? where id=?`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.id
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },

    deleteUser:(data,callBack)=>{
        pool.query(
            `delete from registration where id=?`,
            [
                data.id
            ],
            (error,results,fields)=>{
                if(err){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    },

    getUserByUserEmail: (email, callBack) => {
        pool.query(
          `select * from registration where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
    
};