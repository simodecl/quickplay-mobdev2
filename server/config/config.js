module.exports = {
  'database': {
    'connectionString': 'mongodb://simon:simon@ds155699.mlab.com:55699/quickplay'
  },
  'auth': {
    'bcrypt': {
      'SALT_WORK_FACTOR': 10
    },
    'jwtSecret': 'mobdev2_nmd_gdm',
    'jwtSession': {
        session: false
    },
    'facebook': {
      'clientID': '198647014259616',
      'clientSecret': '199b65fac015b2196585e2b20520fc67'
    },
    'steam': {
      'apiKey': '5CD5F441E594742E4846B12BA83083E9'
    }
  },
  'firebase': {
    'bucket': 'quickplay-1c2b7.appspot.com',
    'projectId': 'quickplay-1c2b7'
  }  
};