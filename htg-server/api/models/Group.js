module.exports = {
    tableName: 'group',
    attributes: {
      code: { type: 'string' }
    },
    
    findAll: function() {
      return new Promise(function(resolve, reject) {
        Group.query('select * from `group` order by code asc', function(error, data) {
          if (error) {
            return reject(error);
          } else {
            delete data.fields;
            return resolve(data);
          } 
        })
      })
    }
};
  
  