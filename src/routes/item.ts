import { Router } from 'express';
import { ItemController } from '../controllers/item';
import { ItemValidations } from '../validations/item';

export default class ItemRoute {
    public router: Router;

    private itemController: ItemController;
    private validations: ItemValidations;

    constructor() {
        this.itemController = new ItemController();
        this.validations = new ItemValidations();
        this.router = Router();
        this.registerRoutes();
    }

    protected registerRoutes(): void {

        this.router.post('/', 
            this.validations.createRules(), 
            this.itemController.create.bind(this.itemController)
        );

        this.router.put('/:id', 
            this.validations.updateRules(), 
            this.itemController.update.bind(this.itemController)
        );

        this.router.delete('/:id', 
            this.itemController.delete.bind(this.itemController)
        );

        this.router.get('/', 
            this.itemController.getAll.bind(this.itemController)
        );

        this.router.get('/:id', 
            this.itemController.getById.bind(this.itemController)
        );

        this.router.get('/product/:title', 
            this.itemController.getByTitle.bind(this.itemController)
        );

        this.router.get('/product/type/:type', 
            this.itemController.getByType.bind(this.itemController)
        );
    }
}
