const PostsController = () => import('#controllers/posts_controller')
const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
import User from '#models/user'

import router from '@adonisjs/core/services/router'

router.post('users/:id/tokens', async ({ params }) => {
  const user = await User.findOrFail(params.id)
  const token = await User.accessTokens.create(user)

  return {
    type: 'bearer',
    value: token.value!.release(),
  }
})

router.get('users', [UsersController, 'index'])
router.post('users', [UsersController, 'store'])
router.get('users/:id', [UsersController, 'show'])
router.put('users/:id', [UsersController, 'update'])
router.patch('users/:id', [UsersController, 'update'])
router.delete('users/:id', [UsersController, 'destroy'])
router.post('/login', [AuthController, 'login'])
router.get('posts', [PostsController, 'index'])
router.post('posts', [PostsController, 'store'])
router.get('posts/:id', [PostsController, 'show'])
