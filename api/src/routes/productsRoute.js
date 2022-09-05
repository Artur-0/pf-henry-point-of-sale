const { Router } = require("express");
const router = Router();
const { Product, Category, Op } = require("../db.js");

router.get("/", async (req, res) => {
  const name = req.query.name
  let allProducts = [];
  try {
    allProducts = await Product.findAll({ include: Category })
    if (name) {
      const product = await Product.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },

      });
      if (product.count === 0) {
        res.send({
          count: 0,
          rows: ["No existe"],
        });
      } else {

        res.json(product);
      }
    } else {
      res.json(allProducts.length > 0 ? allProducts : "No hay productos");
    }





  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/add", async (req, res) => {
  let { name, price, image, description, active, idcategory } = req.body;

  try {
    const newProduct = await Product.findOrCreate({
      where: {
        name: name,
        price: price,
        image: image,
        description: description,
        active: active,
        idcategory: idcategory,
      },
    });

    const categoryN = await Category.findOne({
      where: {
        id: idcategory,
      },
    });

    await newProduct[0].addCategory(categoryN);

    res.status(200).json({ message: "Product succefully created" });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Cant create product" });
  }
});



module.exports = router;