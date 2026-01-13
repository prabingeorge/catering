
import { Model } from 'sequelize';

const PROTECTED_ATTRIBUTES = ['password'];

export default (sequelize, DataTypes) => {
  class PurchaseDetails extends Model {
    toJSON() {
      // hide protected fields
      const attributes = { ...this.get() };
      // eslint-disable-next-line no-restricted-syntax
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PurchaseDetails.init({
    user_id: DataTypes.INTEGER,
    categories_id: DataTypes.INTEGER,
    list_id: DataTypes.INTEGER,
    list_item_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    amount: DataTypes.BIGINT,
    // last_login_at: DataTypes.DATE,
    // last_ip_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PurchaseDetails',
  });
  return PurchaseDetails;
};
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class PurchaseDetails extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   PurchaseDetails.init({
//     user_id: DataTypes.INTEGER,
//     categories_id: DataTypes.INTEGER,
//     list_id: DataTypes.INTEGER,
//     list_item_id: DataTypes.INTEGER,
//     quantity: DataTypes.INTEGER,
//     amount: DataTypes.BIGINT
//   }, {
//     sequelize,
//     modelName: 'PurchaseDetails',
//   });
//   return PurchaseDetails;
// };