import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import {userController} from './injections/userInjection'
import recaptcha from '../../middlewares/reCaptcha'

export function userRoute(router: Route) {
    console.log('reached inside routes')
    router.post('/register', (req: Req, res: Res, next: Next) => userController.createUser(req, res, next))
    return router
}