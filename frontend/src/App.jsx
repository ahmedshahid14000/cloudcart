import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const API = "http://54.198.135.28:3000/products";

  // GET all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.log("GET error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD product
  const addProduct = async () => {
    try {
      await axios.post(API, {
        name,
        price,
        image_url: image,
      });

      setName("");
      setPrice("");
      setImage("");

      fetchProducts();
    } catch (err) {
      console.log("ADD error:", err);
    }
  };

  // DELETE product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (err) {
      console.log("DELETE error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CloudCart 🚀</h1>

      {/* ADD FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />

        <button onClick={addProduct}>Add Product</button>
      </div>

      {/* PRODUCT LIST */}
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            width: "300px",
          }}
        >
          <img src={p.image_url} alt={p.name} width="200" />

          <h3>{p.name}</h3>
          <p>${p.price}</p>

          <button
            onClick={() => deleteProduct(p.id)}
            style={{ background: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;