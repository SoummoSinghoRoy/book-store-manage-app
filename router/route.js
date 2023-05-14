const authRoute = require('./authRoute');

const routes = [
  {
    path: '/auth',
    handler: authRoute
  },
  { 
    path: '/',
    handler: (req, res) => {
      return res.send('Server is running...')
    }
   }
]

module.exports = (app) => {
  routes.forEach((route) => {
    if(route.path === '/') {
      app.get(route.path, route.handler)
    }else {
      app.use(route.path, route.handler)
    }
  })
}