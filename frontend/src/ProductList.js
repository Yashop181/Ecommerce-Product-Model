import { useEffect, useState } from "react";
import axios from "axios";
import './ProductList.css'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8000/api/products')
        .then(response =>{
            setProducts(response.data);
        })
        .catch(error =>{
            console.error('Error fetching products:', error);
        })
    },[]);
    const deleteProduct = (id) =>{
        axios.delete(`http://localhost:8000/api/products/${id}`)
        .then(()=>{
            setProducts(products.filter(product => product._id !== id));
        })
        .catch(error =>{
            console.error('Error deleting product:', error);
        })
    }
  return (
    <div>
    <h1>Product List</h1>
    <ul className="product-list">
      {products.map(product =>(
          <li key={product._id} className="product-item">
              <div className="product-image">
                  {product.images.map((image, index) => (
                      <img key={index} src={image} alt={product.name} width="100" />
                  ))}
              </div>
              <div className="product-details">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Stock: {product.stock}</p>
                  <p>Brand: {product.brand}</p>
                  <button onClick={() => deleteProduct(product._id)}>Delete</button>
              </div>
          </li>
      ))}
    </ul>
  </div>
  )
}

export default ProductList


