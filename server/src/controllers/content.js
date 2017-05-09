/*
 * Dependencies
 */
import jwt from 'jwt-simple'
import moment from 'moment'
import fetch from 'node-fetch';

import Story from '../models/PostModel'
import User from '../models/UserModel'
import typeChecker from '../utils/typeChecker';

/*
 * Submit Stories
 */
export function submitContent(req, res, next) {
  const { title, body, image, description, postedBy } = req.body;

  if (!title || !body || !image || !postedBy){
    return res
      .status(400)
      .json({"error": 'Bad Request'})
  }

  const newStory = new Story ({ title, body, image, description, postedBy });
  newStory.save(newStory, (err, story) => {
    if (err) return next(err);
    res.status(201).json({
      story: story
    });
  });
}

/*
 * Get Stories
 */
export function getContent (req, res, next){
  let page = parseInt(req.query.page) || 1
  let limit = parseInt(req.query.limit) || 20
  let status = req.query.status || "Approved"
  let totalPages;

  Story
    .find()
    .sort('-created_at')
    .populate('postedBy', [ 'firstName', 'lastName' ])
    .exec((err, storyArr) => {
      if (err) return next(err);
      const pages = Math.ceil(storyArr.length / limit);
      const content = storyArr.slice((page - 1) * limit, page * limit);

      res.status(200).json({
        content,
        pages
    });
  })
}

export function getStory(req, res, next) {
  let storyId = req.params.story_id

  Story
    .findById(storyId)
    .populate('postedBy', [ 'firstName', 'lastName' ])
    .exec((err, story) => {
      if (err) return next(err);
      if (!story) return next();
      res.json({ story });
    });
}

/*
 * Get count of stories
 */
 export function getCount(req, res, next) {
   Story.count({ status: "Approved" }, (err, count) => {
     if (err) return next(err);
     res.json({
       count
     });
   });
 }


export function editStory(res, next, _userId, _storyId, fn) {
  return User
    // lookup the user role
    .findOne({ _id: _userId })
    .exec()

    // if user is not an admin they can only edit their own stories
    .then(user => {
      const query = { _id: _storyId };
      if (user.role !== 'Admin') query.postedBy = _userId;
      return query
    })

    // edit story if conditions are met
    .then(query => fn(query))
    .then(story => story || Promise.reject({
      status: 400,
      message: `Story doesn't exist or insufficient privileges`
    }))
    .then(story => res
      .status(200)
      .json({ story })
    )
    .catch(next);
}

/*
 * Remove Story
 */
export function deleteContent(req, res, next){
  editStory(
    res,
    next,
    req.headers.user,
    req.query.id,
    query => Story.findOneAndRemove(
      query
    )
  );
}

/*
 * Update story
 */
export function updateContent(req, res, next) {
  const { title, body, image, description } = req.body;

  editStory(
    res,
    next,
    req.headers.user,
    req.query.id,
    query => Story.findOneAndUpdate(
      query,
      { $set: { title, body, image, description }},
      { new: true }
    )
  );
}


/*
 * Get just my submitted stories
 */
export function getMyStories(req, res, next) {
  const id = req.query.id;

  Story.find({ postedBy: id }, (err, story) => {
    if (err) return next(err);
    res
      .status(200)
      .json({ story });
  });
}

/*
 * get the image from a thrid party server
 */
 export function getImage(req, res, next) {
   const url = req.query.url;

   fetch(url)
    .then(response => typeChecker(response.headers._headers['content-type']))
    .then(checkResult => res.json({ checkResult }))
    .catch(next);
}
