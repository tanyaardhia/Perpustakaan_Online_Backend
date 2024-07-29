npx sequelize-cli model:generate --name User --attributes email:string,password:string,name:string,role:string

npx sequelize-cli model:generate --name Book --attributes title:string,author:string,published_date:string,status:string

npx sequelize-cli model:generate --name Loan --attributes userId:integer,bookId:integer,borrowed_date:date,due_date:date,returned_date:date