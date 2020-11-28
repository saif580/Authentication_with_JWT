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
    }
};