# Project Name

> Jason-titleBanner-service

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## Travis CI
[![Build Status](https://travis-ci.org/Ingenuity-rpt26/vinay-titleBanner-service.svg?branch=main)](https://travis-ci.org/Ingenuity-rpt26/vinay-titleBanner-service)


## license
![NPM](https://img.shields.io/npm/l/express)


## CRUD Operations

CRUD API - Titles

Create:
  Type: POST
  Endpoint: '/addTitle'
  Expectation: add the amount of titles inputted by the client; title and id are added

Read:
  Type: GET
  Endpoint: '/getTitle/:id'
  Expectation: title to be returned for the specific id from the titles table in TitleService database

Update:
  Type: PUT
  Endpoint: 'updateTitle/:id'
  Expectation: title to be updated to an inputted string for a specific id in the titles table in TitleService database

Delete:
  Type: DELETE
  Endpoint: 'deleteTitle/:id'
  Expectation: entire document (meaning id and title) to be removed from the titles table in TitleService database


CRUD API - Enrolled

Create:
  Type: POST
  Endpoint: '/postEnrolled'
  Expectation: post a new item to the enrolleds table in the TitleService db (assuming the id has not already been used)


Read:
  Type: GET
  Endpoint: '/retrieveEnrolled/:id'
  Expectation: return the enrolled number for the specific id from the enrolleds table in TitleService db

  Update:
    Type: PUT
    Endpoint: 'updateEnrolled/:id'
    Expectation: update the enrolled number for the specific id from the enrolleds table in TitleService db

  Delete:
    Type: DELETE
    Endpoint: 'deleteEnrolled/:id'
    Expectation: delete the enrolled number for the specific id passed in from the enrolleds table in the TitleService db