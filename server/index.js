import { sequelize, Shop } from "./models";

sequelize
  .authenticate()
  .then(() => {
    Shop.findAll().then(list => {
      list.map(shop => console.log(`${shop.size}`));
    });
  })
  .then(() => {
    console.log("Working");
  })
  .catch(e => console.log(e));
