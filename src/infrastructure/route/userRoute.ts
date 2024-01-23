import express from 'express'
const router = express.Router()


// -------------------------------------------------------

import userRepository from '../repository/userRepository'
import Userusecase from '../../use_case/userUsecase'
import userController from '../../adapter/userController'
import Encrypt from '../../utils/hashPassword'


const encrypt = new Encrypt()

const repository = new userRepository()
const usercase = new Userusecase(repository, encrypt)
const controller = new userController(usercase)

router.post('/api/user/signup', (req,res) => {
    console.log('reached inside route --> infrastructure/route')
    return controller.signUp(req,res)
})

export default router