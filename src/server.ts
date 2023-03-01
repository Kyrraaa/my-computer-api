import Express from 'express';

const app: Express.Application = Express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// A Test for a GET request

app.get('/', (req: Express.Request, res: Express.Response) => {
  res.send('Hello World');
});

// A Test for a POST request

app.post('/', (req, res) => {
  res.send('I am a POST request');
});

// import our routes

const order = require('./routes/orders.route');
const category = require('./routes/categories.route');
const product = require('./routes/products.route');
const user = require('./routes/users.route');

// Use our routes

app.use('/user', user);
app.use('/product', product);
app.use('/category', category);
app.use('/order', order);

// See if run dev works correctly

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
