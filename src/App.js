import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { AddForm } from './components/AddForm';
import { DetailModal } from './components/DetailModal';
import './assets/css/app.css';

const App = () => {

  const [ data, setData ] = useState({
    orders: [],
  });
  const [ add, setAdd ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ showInfo, setShowInfo ] = useState('');

  const url = 'https://eshop-deve.herokuapp.com/api/v2/orders';
  const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ'
  
  useEffect(() => {
    
    fetch(url, {
      method: 'GET',  
      headers:{
        Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + token,
         },
    }).then( res => res.json() )
      .then( inf => setData(inf) )
      .catch( err => console.log('error', err) );
  }, [])

  const { success, orders } = data;

  const handleClick = (props) => {
    setShowInfo( props.target.id )
    setModal( true );
  }

  const handleAdd = () =>{
    setAdd(true);
  }

  const handlePay = () => {
    return Swal.fire({
      icon: 'success',
      title: '¡Congratulations! Your order has been paid',
      showConfirmButton: false,
      timer: 2000
    })
  }

  return (
    <div className = "container">
      {
        ( success ) ? (
          <div className = "main">
            <div className = "table">
              <h1>Shopping Cart</h1>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th># Order</th>
                    <th>Sku</th>
                    <th>Article</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                    {
                      orders.map( order => 
                          <tr key = { order.id }>
                            <td>{ order.number }</td>
                            <td>
                              { order.items[0].sku }
                                <br></br><br></br>
                              { (order.items.length >= 2) ? (
                                order.items[1].sku) 
                                : null
                              }
                            </td>
                            <td>
                              { order.items[0].name }
                                <br></br><br></br>
                              { (order.items.length >= 2) ? (
                                order.items[1].name) 
                                : null
                              }
                            </td>
                            <td>
                              { order.items[0].price }
                                <br></br><br></br>
                              { (order.items.length >= 2) ? (
                                order.items[1].price) 
                                : null
                              }
                            </td>
                            <td>
                              { order.items[0].quantity }
                                <br></br><br></br>
                              { (order.items.length >= 2) ? (
                                order.items[1].quantity) 
                                : null
                              }
                            </td>
                            <td><button id = { order.id } className = "buttonDetail" onClick = { handleClick }>Details</button></td>
                          </tr>
                      )
                    }
                </tbody>
              </Table>
              <DetailModal  modal = { modal } setModal = { setModal } data = { data } showInfo = { showInfo }/>
            </div>
            <div className = "article">
              <button className = "buttonPay" onClick = { handlePay }>
                <span><i className = "fas fa-money-bill-wave-alt"></i> PAY NOW!</span>
              </button>
              <button className = "buttonAdd" onClick = { handleAdd }>
                <span> <i className = "fas fa-shopping-cart"></i> Add Article</span>
              </button>
            </div>
          </div>
        ) : (
          <h1>Load Data...</h1>
        )
      }
      {
        (add) && <AddForm setAdd = {setAdd} data = {data} />
      }
    </div>
  );
}
export default App;