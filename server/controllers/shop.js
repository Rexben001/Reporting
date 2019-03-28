/* eslint-disable require-jsdoc */
import models from "../models";

class ShopController {
  static createShop(req, res) {
    const { size, color } = req.body;
    const shop = { size, color };

    models.Shop.create(shop)
      .then(shops => {
        res.status(201).json({
          status: 201,
          data: shops
        });
      })
      .catch(e => {
        res.status(500).json({
          status: 404,
          message: e
        });
      });
  }

  static findAllShops(req, res) {
    models.Shop.findAll()
      .then(shops => {
        res.status(200).json({
          status: 200,
          data: shops
        });
      })
      .catch(e => {
        res.status(500).json({
          status: 500,
          message: e
        });
      });
  }

  static findOneShop(req, res) {
    const id = Number(req.params.shop_id);
    models.Shop.findById(id)
      .then(shop => {
        if (shop) {
          res.status(200).json({
            status: 200,
            data: shop
          });
        }
        res.status(404).json({
          status: 404,
          data: "Shop can not be found"
        });
      })
      .catch(e => {
        res.status(500).json({
          status: 404,
          message: e
        });
      });
  }

  static udpateShop(req, res){
    const id = Number(req.params.shop_id);
    const {color, size} = req.body;
    const newlyUpdatedShop = {color, size};
    models.Shop.update(newlyUpdatedShop,
      {where:{id: id}})
        .then((updShop) => {
res.status(201).json({
          status: 201,
          data: updShop
        });    
            })
        .catch(e => {
        res.status(500).json({
          status: 404,
          message: e
        });
      });
  }

  static deleteShop(req, res){
        const id = Number(req.params.shop_id);
        models.Shop.destroy({
          where:{id: id}
        })
        .then(rowDeleted => {
          if(rowDeleted === 1) {
          res.status(200).json({
          status: 201,
          data: 'row deleted successfully'
        });  
          }
        }).catch(e => {
        res.status(500).json({
          status: 404,
          message: e
        });
      });
  }

  static searchShop(req, res){
     if(typeof req.query.text !== 'undefined'){
    const search_string = req.query.text;
    models.Shop.findAll({
      where: {
        $or: {
        color: {like: `%${search_string}%`}
      }
      }
    }).then(result => {
         res.status(200).json({
          status: 201,
          data: result
      })      
        }).catch(e => {
        res.status(500).json({
          status: 404,
          message: e
        });
  })
      }
}
}

export default ShopController;
