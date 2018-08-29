'use strict';

const Sequelize = require('sequelize');
const db = require(`${__dirDatabase}/db-connect`);
const bcrypt = require('bcrypt');
const moment = require('moment');
const Validator = require('validatorjs');

const Model = db.define('users',
  {
    first_name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    last_name: {
      type: Sequelize.STRING(100),
      validate: {
        isAlphanumeric: true
      }
    },
    email: {
      type: Sequelize.STRING(191),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    remember_token: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
  }
);

/**
 * @param {Object} obj The object to perform validation on
 * @return {Validator} The validator object with the specified rules.
 */
Model.validateForgotPassword = (obj) => {
	let rules = {
		email: 'required|email'
	};
	return new Validator(obj, rules);
};

/**
 * @param {Object} obj The object to perform validation on
 * @return {Validator} The validator object with the specified rules.
 */
Model.validateChangePassword = (obj) => {
	let rules = {
		password: 'required',
    confirmpassword : 'required'
	};
	return new Validator(obj, rules);
};

/*
* Instance Methods
*/

// This method will compare plain text password to hashed password
Model.prototype.authenticate = function (inputPassword) {
  return bcrypt.compareSync(inputPassword, this.password);
}

// This method will generate hash password from plain text password
Model.prototype.generatePasswordHash = function (plainPassword) {
  const salt = bcrypt.genSaltSync(10);

  // Generate hash of plain password string using bcrypt
  return bcrypt.hashSync(plainPassword, salt);
}

// This method will generate random token for changing a password
Model.generateRemeberToken = function () {
  return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// This method will convert our instance into object
// Remove password property from the object
Model.prototype.toJson = function () {
  const obj = Object.assign({}, this.get());
  // Remove Password from the object
  delete obj.password;
  return obj;
}

// This is hook that will call before any user is created
Model.beforeCreate(user => {
  user.password = user.generatePasswordHash(user.password);
});

module.exports = Model;
