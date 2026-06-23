const pool = require("../config/db");

const getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, image_url } = req.body;

    const result = await pool.query(
      `INSERT INTO products(name, price, image_url)
       VALUES($1,$2,$3)
       RETURNING *`,
      [name, price, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image_url } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET name = $1,
           price = $2,
           image_url = $3
       WHERE id = $4
       RETURNING *`,
      [name, price, image_url, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM products WHERE id = $1",
      [id]
    );

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};









module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
