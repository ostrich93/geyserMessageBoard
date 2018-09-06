const aclify = require('@aclify/aclify');
const db = require('../db/database');

const acl = new aclify.Acl(new aclify.SequelizeStore(db, {prefix: 'acl_'}));

module.exports = acl;
