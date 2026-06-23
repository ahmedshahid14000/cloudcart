import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async () => {
    try {
      const res = await axios.post("http://localhost:3000/products", {
        name,
        price,
        image_url: imageUrl,
      });

      setProducts([...products, res.data]);

      setName("");
      setPrice("");
      setImageUrl("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);

      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setImageUrl(product.image_url);
  };

  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:3000/products/${editingId}`, {
        name,
        price,
        image_url: imageUrl,
      });

      fetchProducts();

      setEditingId(null);
      setName("");
      setPrice("");
      setImageUrl("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CloudCart</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {editingId ? (
          <button onClick={updateProduct}>
            Update Product
          </button>
        ) : (
          <button onClick={addProduct}>
            Add Product
          </button>
        )}
      </div>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            width: "320px",
          }}
        >
          <img
            src={product.image_url}
            alt={product.name}
            width="250"
          />

          <h3>{product.name}</h3>
          <p>${product.price}</p>

          <button onClick={() => startEdit(product)}>
            Edit
          </button>

          <button
            onClick={() => deleteProduct(product.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;