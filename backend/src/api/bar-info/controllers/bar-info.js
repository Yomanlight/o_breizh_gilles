'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::bar-info.bar-info');
