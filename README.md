# Readable Project

This is the final assessment project for Udacity's Redux course of [Learn React JS - React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) to build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

### Views
* Default (Root)
  - should list all available categories, which should link to a category view for that category
  - should list all of the posts ordered by voteScore (highest score first)
  - should have a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
  - should have a control for adding a new post

* Category View
  - identical to the default view, but filtered to only include posts with the selected category

* Post Detail View
  - should show the details of a post, including: Title, Body, Author, timestamp (in user readable format), and vote score
  - should list all of the comments for that post, ordered by voteScore (highest first)
  - should have controls to edit or delete the post
  - should have a control to add a new comment.
  - implement comment form however you want (inline, modal, etc.)
  - comments should also have controls for editing or deleting

* Create/Edit View
  - should have a form to create new post or edit existing posts
  - when editing, existing data should be populated in the form

### Data

#### Category
```json
{
  "name":"react",
  "path":"react"
}
```

#### Post
```json
{
  "id":"8xf0y6ziyjabvozdd253nd",
  "timestamp":1467166872634,
  "title":"Udacity is the best place to learn React",
  "body":"Everyone says so after all.",
  "author":"thingtwo",
  "category":"react",
  "voteScore":6,
  "deleted":false
}
```

#### Comment
```json
{
  "id":"894tuq4ut84ut8v4t8wun89g",
  "parentId":"8xf0y6ziyjabvozdd253nd",
  "timestamp":1468166872634,
  "body":"Hi there! I am a COMMENT.",
  "author":"thingtwo",
  "voteScore":6,
  "deleted":false,
  "parentDeleted":false
}
```

#### Sort
```json
{
  "field":"SCORE",
  "ascending":true
}
```

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## Start Developing

To get started developing right away:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`

* In another terminal window, install and start the frontend project
    - `cd frontend`
    - `npm install`
    - `npm start`

## Demo
[https://nd019-readable.herokuapp.com/](https://nd019-readable.herokuapp.com/)

### Contributing

* Fork it!
* Create your feature branch: `git checkout -b my-new-feature`
* Commit your changes: `git commit -am 'Add some feature'`
* Push to the branch: `git push origin my-new-feature`
* Submit a pull request


### License

Copyright (c) 2017 Min Li

This program is free software: you can redistribute it and/or modify it under the terms of the Apache License Version 2.0 as published by Apache Software Foundation.
