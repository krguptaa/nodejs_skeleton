import AppController from '../AppController';
import UserModel from './User';
/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class UsersController extends AppController {
   /**
    * @param {Model} model The default model object
    * for the controller. Will be required to create
    * an instance of the controller
    */
   constructor(model) {
      super(model);
   }

   forgotPassword(req, res, next){
      let obj = req.body;
      const validator = UserModel.validateForgotPassword(obj);
      if (validator.passes()) {
        let userObj = new UserModel(obj);
        // if match email
        userObj.findOne({ where: { email: email } })
          .then(function(user) {
            console.log(user);
            if (!user) {
                return next('Something went wrong!');
            } else {
                // if everything is good,
                // then attach to req.user
                // and call next so the controller
                // can sign a token from the req.user.id
                req.user = user;
                next();
            }
          }).catch((error) => {
            return next(err);
          });
      }else{
        return res.status(400).json(validator.errors.all());
      }
   }
}

export default UsersController;
