import { Router } from 'express';
import { ItemController } from './ItemController';
import { ItemValidations } from './ItemValidation';

export class ItemRoute {
    public router: Router;

    private controller: ItemController;
    private validations: ItemValidations;

    constructor() {
        this.controller = new ItemController();
        this.validations = new ItemValidations();
        this.router = Router();
        this.registerRoutes();
    }

    protected registerRoutes() {
        this.router.post('/', 
            this.validations.createRules(), 
            this.controller.create.bind(this.controller)
        );

        this.router.put('/:id', 
            this.validations.updateRules(), 
            this.controller.update.bind(this.controller)
        );

        this.router.delete('/:id', 
            this.controller.delete.bind(this.controller)
        );

        this.router.get('/', 
            this.controller.getAll.bind(this.controller)
        );

        this.router.get('/:id', 
            this.controller.getById.bind(this.controller)
        );

        this.router.get('/product/:title', 
            this.controller.getByTitle.bind(this.controller)
        );

        this.router.get('/product/type/:type', 
            this.controller.getByType.bind(this.controller)
        );
    }
}
