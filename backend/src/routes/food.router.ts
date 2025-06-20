import { Router } from 'express';
import * as FoodController from '../controllers/food.controller';
import { uploadFoodImages } from '../middlewares/upload.middleware';

const router = Router();

router.get('/', FoodController.getAllFoods);
router.get('/search', FoodController.searchFoods);
router.post('/', uploadFoodImages, FoodController.addFood);
router.put('/:id', uploadFoodImages, FoodController.updateFood);
router.delete('/:id', FoodController.deleteFood);

export default router;
