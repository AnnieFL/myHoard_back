const { CategoriesModel } = require('../models/categoriesModel');
const { validateCategory } = require('../validators/categoriesValidator');

class CategoriesController {

    constructor() {

    }

    async listCategories(req, res) {
        const categories = await CategoriesModel.findAll({
            where: {
                active: true
            }
        });

        return res.json(categories);
    }


    async createCategory(req, res) {
        const {name, rarity, translations} = req.body;

        const validationError = validateCategory({name, rarity}, "create");
        if (validationError) {
            return res.status(400).json({ validationError });
        }

        const active = req.admin ? req.admin : false;

        const category = await CategoriesModel.create({
            name, rarity, translations, active
        });

        return res.status(201).json(category);
    }

    async editCategory(req, res) {
        const id = req.params;

        const validationError = validateCategory({name: req.body.name, rarity: req.body.rarity, translations: req.body.translations}, "edit");
        if (validationError) {
            return res.status(400).json({ validationError });
        }
        
        const category = await CategoriesModel.findOne({
            where: {
                id
            }
        })
        if (!category) {
            return res.status(404).json({msg: {pt: "Categoria não encontrada", en: "Category not found", go: "Category is not real!"}});
        }
        
        const name = req.body.name ? req.body.name : category.name;
        const rarity = req.body.rarity ? req.body.rarity : category.rarity;
        let translations;

        if (req.body.translations) {
            translations = {...category.translations, ...req.body.translations };
        } else {
            translations = category.translations;
        }

        await CategoriesModel.update(
            {name, rarity, translations},
            {
                where: {
                    email
                }
            }
        )

        return res.status(200).json({msg: {pt: "Alterado com sucesso", en: "Edited successfully", go: "Category changed!"}});
    }

    async deleteCategory(req, res) {
        const id = req.params;

        const category = await CategoriesModel.findOne({
            where: {
                email
            }
        })
        if (!category) {
            return res.status(404).json({msg: {pt: "Categoria não encontrada", en: "Category not found", go: "Category is not real!"}});
        }

        await CategoriesModel.update(
            {active: false},
            {
                where: {
                    id
                }
            }
        )

        return res.status(200).json({msg: {pt: "Apagado com sucesso", en: "Deleted successfully", go: "Category don't exist!"}});

    }
}


module.exports = CategoriesController;