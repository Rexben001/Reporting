/* eslint-disable require-jsdoc */
import models from '../models';

class ShopController {

  static createShop(req, res) {

    const { title } = req.body;
    const shop = { title };

    models.Shop.create(shop)
      .then((shops) => {
        res.status(201).json({
          status: 201,
          data: shops
        });
      })
      .catch((e) => {
        res.status(500).json({
          status: 404,
          message: e
        });
      });
  }

  static findAllShops(req, res) {
    models.Shop.findAll()
      .then((shops) => {
        res.status(200).json({
          status: 200,
          data: shops
        });
      })
      .catch((e) => {
        res.status(500).json({
          status: 500,
          message: e
        });
      });
  }

  static findOneShop(req, res) {
    const id = Number(req.params.shop_id);
    models.Shop.findById(id)
      .then((shop) => {
        if (shop) {
          res.status(200).json({
            status: 200,
            data: shop
          });
        }
        res.status(404).json({
          status: 404,
          data: 'Shop can not be found'
        });
      })
      .catch((e) => {
        res.status(500).json({
          status: 404,
          message: e
        });
      });
  }
}

export default ShopController;