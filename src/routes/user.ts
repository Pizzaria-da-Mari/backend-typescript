import { Router } from 'express';
import { UserController } from '../controllers/user';
import { UserValidations } from '../validations/user';

export default class UserRoute {
    public router: Router;

    private userController: UserController;
    private validations: UserValidations;

    constructor() {
        this.userController = new UserController();
        this.validations = new UserValidations();
        this.router = Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {

        this.router.post('/', 
            this.validations.createRules(),
            this.userController.create.bind(this.userController)
        );
/*
        this.router.put('/:id', 
            this.validations.updateRules(),
            this.userController.update.bind(this.userController)
        );
*/
        this.router.delete('/:id', 
            this.userController.delete.bind(this.userController)
        );

        this.router.get('/:id', 
            this.userController.getById.bind(this.userController)
        );
    }
}
