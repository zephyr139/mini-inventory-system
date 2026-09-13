import { useEffect  ,useState } from 'react'
import './App.css'

// Connecting backend

const API_URL = "http://localhost:8080/products"
function App() {

    const [products, setProducts] = useState([]);

    const emptyFormData = {
        name: "",
        description: "",
        quantity: "",
        price: ""
    };

    const [formData, setFormData] = useState(emptyFormData);

    const [editingProductId, setEditingProductId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    // Get
    const loadProducts = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Error loading products");
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    // on page updating
    useEffect(() => {
        loadProducts();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // POST
    const addProduct = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response = await fetch(API_URL,{
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    quantity: Number(formData.quantity),
                    price: Number(formData.price)
                })
            });

            if (!response.ok) {
                throw new Error("Failed to add a Product");
            }

            clearForm();

            await loadProducts();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    }

    // DELETE
    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if(!response.ok) {
                throw new Error("Failed to delete product");
            }

            await loadProducts();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // PATCH
    const updateProduct = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/${editingProductId}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: formData.name,
                        description: formData.description,
                        quantity: Number(formData.quantity),
                        price: Number(formData.price)
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            setEditingProductId(null);

            // Add form clearing
            clearForm();

            await loadProducts();
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    // Editing
    const clearForm = () => {
        setFormData(emptyFormData);
    };
    // Edit button behaviour
    const startEditing = (product) => {
        setEditingProductId(product.id);

        setFormData({
            price: product.price,
            name: product.name,
            description: product.description,
            quantity: product.quantity,
        });
    };

    const cancelEditing = () => {
        setEditingProductId(null);
        clearForm();
    }

    return (
        <main className="page">
            <header className="page-header">
                <h1>Mini Inventory System</h1>
            </header>

            <section className="product-form-section">
                <h2>{editingProductId ? "Edit Product" : "Add Product"}</h2>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <form className="form-products" onSubmit={editingProductId ? updateProduct : addProduct}>
                    {/*Name*/}
                    <div className="products-row">
                        <label htmlFor="name">Name: </label>
                        <input id="name" name="name"
                               type="text"
                               value={formData.name}
                               onChange={handleChange}
                               required
                        />
                    </div>
                    {/* Description*/}
                    <div className="products-row">
                        <label htmlFor="description">Description: </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    {/*    Quantity*/}
                    <div className="products-row">
                        <label htmlFor="quantity">Quantity: </label>
                        <input id="quantity" name="quantity" type="text"
                               value={formData.quantity}
                               onChange={handleChange}
                               required
                        />
                    </div>

                    {/*Price*/}
                    <div className="products-row">
                        <label htmlFor="price">Price: </label>
                        <input id="price" name="price" type="text"
                               value={formData.price}
                            required
                               onChange={handleChange}
                        />
                    </div>
                    {/*Adding*/}
                    <div className="form-actions">
                        <button type="submit">
                            {editingProductId ? "Save Product" : "Add Product"}
                        </button>
                        {editingProductId && (
                            <button type="button" onClick={cancelEditing}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className="product-list-section">
                <h2>Product List</h2>
                <table className="products-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {products.map((product) => (
                        <tr key={(product.id)}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price.toFixed(2)}</td>
                            <td>{product.status}</td>

                            <td>
                                <div className="product-actions">
                                    <button type="button" onClick= {()=>
                                        startEditing(product)
                                    }>Edit</button>
                                    <button type="button" onClick={() =>
                                        deleteProduct(product.id)
                                    }>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default App
