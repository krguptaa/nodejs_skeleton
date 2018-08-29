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

   /**
    * @api {post} users/forgot-password Forgot Password
    * @apiGroup Users
    *
    * @apiParam {String} email Users Email Address
    *
    * @apiSuccess {String} user response
    *
    * @apiSuccessExample Success-Response
    *     HTTP/1.1 200 OK
    *     {
            "message": "Email sent to your email address",
            "data": {
                "id": 3,
                "first_name": "Kamlesh",
                "last_name": "Gupta",
                "email": "krgupta@gmail.com",
                "created_at": "2018-08-23T13:07:31.000Z",
                "updated_at": "2018-08-23T13:07:31.000Z",
                "deleted_at": null
            }
        }
    *
    * @apiError EmptyEmailPassword If email or password is empty
    *
    * @apiErrorExample EmptyEmailPassword
    *     HTTP/1.1 400 Bad Request
    *     {
    *       "errors": ["You need a email and password"]
    *     }
    *
    * @apiError UserNotFound The email of the User was not found
    *
    * @apiErrorExample UserNotFound
    *     HTTP/1.1 401 Unauthorized
    *     {
    *       "error": ["Something went wrong!"]
    *     }
    *
    */
   forgotPassword(req, res, next){
      let obj = req.body;
      const validator = UserModel.validateForgotPassword(obj);
      if (validator.passes()) {
        // if match email
        UserModel.findOne({ where: { email: obj.email } })
          .then(function(user) {
            if (!user) {
                return next('Something went wrong!');
            } else {
                // if everything is good,
                 req.user = user;
                  UserModel.update({
                      remember_token: UserModel.generateRemeberToken(),
                    }, {
                      where: {
                        id: user.id
                      }
                    });
                        console.log(user);
               return res.json({ 'message': 'Email sent to your email address', data: user.toJson() });
               next();

            }
          }).catch((error) => {
            return next(error);
          });
      }else{
        return res.status(400).json(validator.errors.all());
      }
   }
   /**
    * @api {post} users/change-password Change Password
    * @apiGroup Users
    *
    * @apiParam {String} password Users Password
    * @apiParam {String} confirmpassword Users Password

    * @apiSuccess {String}
    *
    * @apiSuccessExample Success-Response
    *     HTTP/1.1 200 OK
    *     {
            "message": "Password has been changed successfully!",
        }
    *
    */
   changepassword(req, res, next){
     let token = req.params.token;
     let requestData = req.body;
     const validator = UserModel.validateChangePassword(requestData);
     if (validator.passes()) {
       UserModel.findOne({ where: { remember_token: token } })
         .then(function(user) {
           if (!user) {
              return res.json({ 'message': 'Token Expired!' });
               next();
           } else {
               // if everything is good,
             req.user = user;
             UserModel.update({
                 password: user.generatePasswordHash(requestData.password),
                 remember_token : ""
               }, {
                 where: {
                   id: user.id
                 }
               });

              return res.json({ 'message': 'Password has been changed successfully!' });
              next();

           }
         }).catch((error) => {
           return next(error);
         });
     }else{
       return res.status(400).json(validator.errors.all());
     }
   }
}

export default UsersController;
