# Drive-And-Track

Drive and Track Is a vehicle management app.

## Table of Contents

- [Drive-And-Track](#drive-and-track)
  - [Table of Contents](#table-of-contents)
  - [Motivation](#motivation)
  - [Installation and Usage](#installation-and-usage)
    - [For frontend app](#for-frontend-app)
    - [For backend app](#for-backend-app)
  - [Technologies Used](#technologies-used)
    - [Tech stack](#tech-stack)
    - [Notable libraries](#notable-libraries)
  - [Wireframes](#wireframes)
  - [Unsolved Problems](#unsolved-problems)
  - [Future Direction](#future-direction)
  - [References](#references)

## Motivation

The development of Drive-and-Track is driven by my passion for numbers and automotive vehicles. I like to keep track of my vehicle fuel consumption, the amount I've spent on the vehicle, and to always be up-to-date with the vehicle maintenance schedule. The market for such a mobile app is few and limited, and they're laden with ads. So why not try making one myself?

A little disclaimer: This app is build for desktop. I've yet to make it responsive for mobile.

## Installation and Usage

### For frontend app

```t
# clone this repository
$ git clone

## Terminal 1
# For frontend
# Go into the frontend repository
$ cd frontend

# Install frontend dependencies
$ npm i

# To run the frontend app
# npm run dev

```

### For backend app

For the server-side, you will need to create your own `.env` file as well your own DB.

For the `.env` file you will need to have the follow variables inside. Below is a sample, you can edit the values on your own.

```t
PORT=5001
USER=db_user
DB_PASS=2211
ACCESS_SECRET=UYr4DygKnugqj6pXcHEJythfQA0EvGIFT41FN4E3v7S1iVmVwr8AOgpusNfA7BojJ0KgommIoYwK65PaWe5VYIl1vdrSEu2rSJf2
REFRESH_SECRET=BNgDfa5Qwz87BQsW026ogALgcnEECzTp7pF1c9qeg3L61M49TzXKLz2tkVGkkkqVvAepdFUrMLW3CIneUOXJWR3dW0WEy1o1yEUb

```

Do take note, that the USER and DB_PASS refers to your own postgres database username and user password. You will need to create the postgres database and run the following SQL commands found here:
[SQL TABLE CREATION](server/sqlCreateCommands.sql)

Once the DB have been setup, you can proceed to install the package dependencies and run the development server on your own:

```t
## Terminal 2
# For backend server
# Go into the backend
$ cd server

# Install server dependencies
$ npm i

# to start the backend development server
$ npm run dev

```

## Technologies Used

### Tech stack

- Postgresql
- Express
- React
- Node

### Notable libraries

- axios for handling HTTP requests
- tailwindcss, together with daisyui components
- react-hook-form together with yup for form validation
- date-fns for date manipulations

- jsonwebtoken for jwt token creation
- pg for postgres
- bcrypt for password hasing

## Wireframes

Below are the initial wireframes that I had for this project.

Here's the slide deck for the initial planning of the project as a whole. The main consideration was on the the type of data that I intend to be manipulating and storing in the database. There's definitely more room for improvement here since this is the first time I'm working and designing an SQL database.

## Unsolved Problems

## Future Direction

## References

https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
