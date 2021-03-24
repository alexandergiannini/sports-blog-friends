const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

const bcrypt = require('bcrypt');


class User extends Model {
    //   checkPassword(loginPW) {
    //     console.log(loginPW)
    //    return bcrypt.compareSync(loginPW, this.password);
    //   }
};

User.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
  //      hooks: {
            //    set up beforeCreate lifecycle "hook" functionality
      //      async beforeCreate(newUserData) {
       //         newUserData.password = await bcrypt.hash(newUserData.password, 10);
         //       return newUserData;
        //    },

        //    async beforeUpdate(updatedUserData) {
         //       updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          //      return updatedUserData;
         //   }
      //  },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);


module.exports = User;