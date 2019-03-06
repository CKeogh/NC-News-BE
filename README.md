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

You will also need to ensure that *PostgreSQL* is installed on your machine. To do this, follow the instructions in the link below:

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

****
**TO-DO NEXT** ---> INSTRUCTIONS ON HOW TO GET DEV ENV RUNNING (RUN SEED FILE ETC)
****