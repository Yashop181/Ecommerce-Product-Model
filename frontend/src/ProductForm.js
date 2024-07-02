import { useState } from "react"
import axios from "axios"
const ProductForm = ({fetchProducts}) => {
    const [name,setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Electronics');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [images, setImages] = useState('');

    const handleSubmit =(e) =>{
        e.preventDefault();
        const newProduct ={
            name,
            description,
            price,
            category,
            stock,
            brand,
            images: images.split(',')
        };
        axios.post('http://localhost:8000/api/products',newProduct)
        
        .then(()=>{
            alert('Product Saved')
            setName('');
            setDescription('');
            setPrice('');
            setCategory('Electronics');
            setStock('');
            setBrand('');
            setImages('');
        })

        .catch(error =>{
            console.error('Error adding product:', error);
        })
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <br/>
        <br/>
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <br/>
            <br/>
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <br/>
            <br/>
            <select value={category} onChange={(e)=>setCategory(e.target.value)} required>
                <option value="" disabled>Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
                <option value="Sports">Sports</option>
            </select>
            <br/>
            <br/>
            <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
            <br/>
            <br/>
            <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
            <br/>
            <br/>
            <input type="text" placeholder="Images (comma separated)" value={images} onChange={(e) => setImages(e.target.value)} required />
            <br/>
            <br/>
            <button type="submit">Add Product</button>

        </form>
    </div>
  )
}

export default ProductForm
