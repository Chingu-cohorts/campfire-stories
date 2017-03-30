/*
 * Dependencies
 */
import jwt from 'jwt-simple'
import Story from '../models/PostModel'
import User from '../models/UserModel'
import moment from 'moment'

/*
 * Submit Stories
 */
export function submitContent(req, res, next) {
  let { title, body, image, postedBy } = req.body;
  if (!title || !body || !image || !postedBy){
    return res
      .status(400)
      .json({"error": 'Bad Request'})
  }
  let newStory = new Story ({ title, body, image, postedBy })
  newStory.save(newStory, (err, story) => {
    if (err) return next(err);
    res.status(201).json({
      story: story
    })
  })
}

/*
 * Get Stories
 */
export function getContent (req, res, next){
  let page = parseInt(req.query.page) || 1
  let limit = parseInt(req.query.limit) || 20
  let status = req.query.status || "Approved"

  Story
    .find()
    .sort('-date')
    .skip(limit * (page-1))
    .limit(limit)
    .populate('postedBy', [ 'firstName', 'lastName' ])
    .exec((err, storyArr) => {
      if (err) return next(err);
      res.status(200).json({
        content: storyArr
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


export function editStory(_userId, _storyId, fn) {
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
}
/*
 * Remove Story
 */
export function deleteContent(req, res, next){
  // handle DB
  editStory(
    req.headers.user,
    req.query.id,
    query => Story.findOneAndRemove(
      query
    ))

    // determine server response
    .then(story => {
      if (!story) return next(
        new Error('Story doesn\'t exist or insufficient privileges')
      );

      res.status(200).json({
        delete: 'success'
      });
    })
    .catch(next);
}

/*
 * Update story
 */
export function updateContent(req, res, next) {
  const { title, body, image } = req.body;

  // handle db
  editStory(
    req.headers.user,
    req.query.id,
    query => Story.findOneAndUpdate(
      query,
      { $set: { title, body, image }},
      { new: true }
    ))

    // determine server response
    .then(story => {
      if (!story) return next(
        new Error('Story doesn\'t exist or insufficient privileges')
      );

      res.status(200).json({
        story
      });
    })
    .catch(next);
}


/*
 * Get just my submitted stories
 */
export function getMyStories(req, res, next) {
  let id = req.query.id;

  Story.find({ postedBy: id }, (err, story) => {
    if (err) return next(err);
    res
      .status(200)
      .json({ story });
  });
}
