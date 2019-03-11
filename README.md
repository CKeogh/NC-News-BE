# NC-Knews

NC-Knews is an article sharing platform which allows users to share articles in particular topics, post comments, and vote on articles or comments they have read.

## Getting Started

To get a copy of this project running on your local machine, follow these instructions:

1. fork this repository
2. clone your forked repo to an appropriate directory on your local machine
3. npm init inside this directory:

    ``` 
    npm init -y
    ```

### Prerequisites

You will need to install the following dependencies in order to get the development env running. Make sure you install the versions stated or above:

1. body-parser v.1
2. express v.4
3. knex v.0
4. pg v.7

eg:

``` 
npm i body-parser
```
You will also need the following dev dependencies for testing purposes. Make sure you install these with the '-D' option

1. chai v.4
2. eslint v.5
3. eslin-config-airbnb v.17
4. eslint-plugin-import v.2
5. husky v.1
6. mocha v.6
7. supertest v.3

eg:

```
npm i chai -D
```

Make sure that *PostgreSQL* is installed on your machine. To do this, follow the instructions in the link below:

https://www.postgresql.org/docs/9.3/tutorial-install.html

### Configuration File

You will also need to create a *knexfile.js* which will contain your configuration settings. This file should contain the following:

```javascript
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  seeds: {
    directory: './db/seeds',
  },
  migrations: {
    directory: './db/migrations',
  },
};

const dbConfig = {
  development: {
    connection: {
      username: 'YOUR PSQL USERNAME HERE',
      password: 'YOUR PSQL PASSWORD HERE',
      database: 'knews',
    },
  },
  test: {
    connection: {
      username: 'YOUR PSQL USERNAME HERE',
      password: 'YOUR PSQL PASSWORD HERE',
      database: 'knews_test',
    },
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
};

module.exports = { ...dbConfig[ENV], ...baseConfig };

```
**N.B.** Mac users will not need to include the username and password in the dbConfig object.


### Creating and Seeding Databases

Next, run the following in your terminal:

```
npm run setup-dbs
```
This will create a new database for your dev data and your test data. Now you can run the following migration scripts to ensure that all the tables are added to the databases:

```
npm run migrate-rollback
npm run migrate-latest
```

Then seed your databases with the following script:
```
npm run seed
```
You can check that the data has been seeded correctly by accessing it directly through *PSQL*. To do this simpy type psql into the terminal.
```
psql
```
this will open *PSQL* in the terminal. To enter the specific database type:

```
\c knews
```
And then to test that there is data inside use:
```
SELECT * FROM topics;
```

This should return a table of topics with a slug column and a description column. The slugs should include 'coding', 'football' and 'cooking'.

Now that we know the data has been seeded successfully we can access some of the endpoints that are available to us.
In the terminal, run the following script:
```
node listen.js
```
this will make your server listen out for requests on local port 9090.
Next, go to the browser and type **localhost:9090/api** in the url search bar. This endpoint will provide you with a json describing all the available endpoints and their request methods.
```json
"end_points": {
  "/api/topics": {
    "GET": {
      "description": "serves up all topics in database",
      "returns": "array of topics with keys slug, description"
    },
    "POST": {
      "desciption": "adds a new topic to database",
      "returns": "the newly added topic",
      "expects": "object with keys slug (must be unique), description"
      }...
```
 Feel free to explore these to get an idea of the formatting of the data.

## Testing

To execute the test files use:

```
npm test
```
This will run the *Mocha* test suite, which will then search the spec folder for test files. The current spec files are *utils.spec.js*,  which will test the utility functions implemented in the migration files, and *app.spec.js*, which will test every endpoint and its permitted request methods.
The endpoint tests are nested in accordance with the endpoints themselves. e.g.

```javascript
describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  it('ERROR: 404 when given non-existent url', () => request.get('/bad-url')
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).to.equal('Page not found');
    }));

  describe('/topics', () => {
    it('GET: return status code 200 and array of topics', () => request.get('/api/topics').expect(200)
      .then(({ body }) => {
        expect(body.topics[0]).to.have.keys('slug', 'description');
      }));
```

Notice in this example how the ```describe('/topics', () => {})``` block is inside of the ```describe('/api', () => {})``` block in the same way that ```/api/topics``` is routed through ```/api```. 
The ```beforeEach(() => connection.seed.run());``` at the start will re-seed the test database each time the test suite is run to ensure the data being tested is consistent, and the   ```after(() => connection.destroy());``` ensures that the connection to the database doesn't hang when the tests are complete.

