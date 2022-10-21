const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth')

// GET REQUESTS

// get all posts
router.get('/', (req, res)=> {
    Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: [ 'username']
                }
            },
        {
            model: User,
            attributes: ['username']
        }
    ]
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(error)
    });
})

// get one post
router.get('/:id', (res, req)=> {
    Post.findOne({
        where: { id: req.params.id},
        attributes: [
            'id',
            'post_tet',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [ 'id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(postData => {
        if (!postData) {
            res.status(404).json({message: 'no post exists with that id'});
            return;
        }
        res.json(postData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// POST REQUESTS


// user wants to create a post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// user wants to edit a post
router.put('/:id', withAuth, (res, req) => {
    Post.update(req.body,
        {
            where: {id: req.params.id}
        }
    )
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'no post exists with that id'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// DELETE REQUESTS

// user wants to delete a post
router.delete('/:id', withAuth, (req, res)=> {
    Post.destroy({
        where: {id: req.params.id}
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: ' no post exists with that id'})
            return;
        }
        res.json(postData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
  
module.exports = router;