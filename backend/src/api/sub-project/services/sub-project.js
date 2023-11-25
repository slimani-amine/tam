'use strict';

/**
 * sub-project service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sub-project.sub-project');
