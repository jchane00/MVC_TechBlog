const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth')
const dayjs = require("dayjs")
// Post to Dashboard

router.get('/', withAuth, (req, res) => {
    
    Post.findAll({
      where: {
       
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
    })
      .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  
  router.get('/edituser', withAuth, (req, res) => {

    User.findOne({
     
      attributes: { exclude: ['password'] },
      where: {
      
        id: req.session.user_id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
  
          res.status(404).json({ message: 'User not found' });
          return;
        }
       
        const user = dbUserData.get({ plain: true });
        res.render('edit-user', {user, loggedIn: true});
      })
      .catch(err => {
      
        console.log(err);
        res.status(500).json(err);
      })
    });

    router.get('/edit/:id', withAuth, (req, res)=> {
    Post.findByPk(req.params.id,{
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(postData => {
        if (postData){
            const post = postData.get({plain: true});
            res.render('edit-post', {
              post:{...post, created_at:dayjs(post.created_at).format('DD/MM/YYYY') },
                loggedIn: true,
                commentLabel: post.comments.length>1? "comments":"comment",
                // post.created_at
            }); 
        } else {
            res.status(404).json({message: 'no post exists with that id'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;
