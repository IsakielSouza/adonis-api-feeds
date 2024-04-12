const PostsController = () => import('#controllers/posts_controller')
const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
const CommentsController = () => import('#controllers/comments_controller')
const FeedController = () => import('#controllers/feed_controller')
import User from '#models/user'

import router from '@adonisjs/core/services/router'

router.post('user/:id/tokens', async ({ params }) => {
  const user = await User.findOrFail(params.id)
  const token = await User.accessTokens.create(user)

  return {
    type: 'bearer',
    value: token.value!.release(),
  }
})

router.post('/login', [AuthController, 'login'])

router.get('feed', [FeedController, 'index'])

router.get('users', [UsersController, 'index'])
router.post('user', [UsersController, 'store'])
router.get('user/:id', [UsersController, 'show'])
router.put('user/:id', [UsersController, 'update'])
router.patch('user/:id', [UsersController, 'update'])
router.delete('user/:id', [UsersController, 'destroy'])

router.get('posts/author/:id', [PostsController, 'getPostsByUser'])

router.get('posts', [PostsController, 'index'])
router.post('post', [PostsController, 'store'])
router.get('posts/:id', [PostsController, 'show'])

router.get('comments', [CommentsController, 'index'])
router.post('comment', [CommentsController, 'store'])
router.get('comment/:id', [CommentsController, 'show'])

router.get('comments/post/:id', [CommentsController, 'getCommentsByPost'])
