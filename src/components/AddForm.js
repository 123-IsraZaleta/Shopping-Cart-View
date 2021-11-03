import { useState } from "react";
import Swal from 'sweetalert2';
import { useForm } from "../hooks/useForm";

export const AddForm = ({ setAdd, data }) =>{

    const { orders } = data;
    const [ number, setNumber ] = useState(1221)
    const [ formValues, handleInputChange] = useForm({
      id: String(new Date().getTime()),
      sku: '',
      name: '',
      price: '',
      quantity: '',
    })
  
    const { id, sku, name, price, quantity } = formValues;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if( sku.length !== 5 ){
        return Swal.fire('Error', 'Sku must be TEST1 or similar longe', 'error');
      }
      if( name.length < 2 ){
        return Swal.fire('Error', 'Article must be contain more than 2 characters', 'error');
      }
      if( quantity.length < 1 ){
        return Swal.fire('Error', 'Quantity is necesary', 'error');
      }
      if( price.length < 1 ){
        return Swal.fire('Error', 'Price is necesary', 'error');
      }
      orders.push({
          number,
          id,
          items: [{
              sku,
              name,
              quantity,
              price
          }]
      })
      setNumber( number - 1 );
      setAdd( false );

      return Swal.fire({
        icon: 'success',
        title: 'Your order has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
  
    return(
      <div className = "formAdd">
        <form onSubmit = { handleSubmit }>
          <div className = "mb-3">
            <label className = "form-label">Sku</label>
            <input
              type = "text"
              placeholder = "Sku Article"
              className = "form-control"
              name = "sku"
              value = { sku }
              onChange = { handleInputChange }
              autoComplete = "off"
            />
          </div>
          <div className = "mb-3">
            <label  className = "form-label">Article</label>
            <input 
              type = "text"
              placeholder = "Article name"
              className = "form-control"
              name = "name"
              value = { name }
              onChange = { handleInputChange }
              autoComplete = "off"
            />
          </div>
          <div className = "mb-3">
            <label  className = "form-label">Quantity</label>
            <input 
              type = "text"
              placeholder = "NUMBER of articles"
              className = "form-control"
              name = "quantity"
              value = { quantity }
              onChange = { handleInputChange }
              autoComplete = "off"
            />
          </div>
          <div className = "mb-3">
            <label  className = "form-label">Price</label>
            <input
              type = "text"
              placeholder = "Price of article"
              className = "form-control"
              name = "price"
              value = { price }
              onChange = { handleInputChange }
              autoComplete = "off"
            />
          </div>
          <button type="submit" className = "btn btn-primary">Add to Cart</button>
        </form>
      </div>
    )
}