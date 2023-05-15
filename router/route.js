const authRoute = require('./authRoute');
const publisherRoute = require('./publisherRoute');
const bookRoute = require('./bookRoute');

const routes = [
  {
    path: '/api/book',
    handler: bookRoute
  },
  {
    path: '/api/publisher',
    handler: publisherRoute
  },
  {
    path: '/api/auth',
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