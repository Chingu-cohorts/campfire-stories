import express from 'express'
import passport from 'passport'
import passportService from '../services/passport'
import {
  register,
  login,
  deleteUser,
  getUsers,
  roleControl,
  changePassword,
  makeNewPassword,
  resetPassword
} from '../controllers/authentication'
import { authAdmin } from '../services/passport'

import { deleteContent } from '../controllers/content'

const requireAuth = passport.authenticate('jwt', {session: false})
const requireLogin = passport.authenticate('local', {session:  false})

export function auth(app) {
	const authRoutes = express.Router()
	authRoutes.post('/register', requireAuth, authAdmin, register)
	authRoutes.post('/login', requireLogin, login)
  authRoutes.post('/change_password', requireAuth, changePassword)
  authRoutes.post('/new_password', makeNewPassword)
  authRoutes.post('/reset_password', resetPassword)
	authRoutes.route('/user')
		.delete(requireAuth, authAdmin, deleteUser)
		.put(requireAuth, authAdmin, roleControl)

	app.use('/api/auth', authRoutes);
}

export function admin(app) {
	const adminRoutes = express.Router()
	adminRoutes.get('/users', requireAuth, authAdmin, getUsers)

	app.use('/api/admin', adminRoutes)
}
