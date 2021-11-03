import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

export const DetailModal = ({ modal, setModal, data, showInfo }) => {

    const showArr = [];
    const { orders } = data;

    for (let i = 0; i < orders.length; i++) {
        if( String(orders[i].id) === showInfo ){
            showArr.push( orders[i] )
        }
    }
    const handleClose = () => {
        setModal( false )
    }
    
    return (
        <Modal
            isOpen = { modal }
            onRequestClose = { handleClose }
            closeTimeoutMS = { 300 }
            style = { customStyles }
            className = "modal"
            overlayClassName = "modal-fondo"
        >
            {
               ( showArr.length > 0 ) && 
                <div className = "asdasd">
                    <div className = "headerModal">
                            <h1>Details:</h1>
                            <hr/>
                        </div>
                        <div className = "mainModal">
                            <h4>#Order:{ showArr[0].number }</h4>
                            <br></br>
                            <h4>Sku:</h4>

                                <h5>{   
                                    showArr[0].items[0].sku 
                                }
                                <br></br><br></br> 
                                {
                                    (showArr[0].items.length >= 2) ? (
                                        showArr[0].items[1].sku
                                    ):(
                                        null
                                    )
                                }
                            </h5>
                            <h4>Name: </h4>
                                <h5>{   
                                    showArr[0].items[0].name 
                                }
                                <br></br><br></br> 
                                {
                                    (showArr[0].items.length >= 2) ? (
                                        showArr[0].items[1].name
                                    ):(
                                        null
                                    )
                                }
                                </h5>
                            <h4>Price: </h4>
                                <h5>{   
                                    showArr[0].items[0].price 
                                }
                                <br></br><br></br> 
                                {
                                    (showArr[0].items.length >= 2) ? (
                                        showArr[0].items[1].price
                                    ):(
                                        null
                                    )
                                }
                                </h5>
                            <h4>Quantity: </h4>
                                <h5>{   
                                    showArr[0].items[0].quantity 
                                }
                                <br></br><br></br> 
                                {
                                    (showArr[0].items.length >= 2) ? (
                                        showArr[0].items[1].quantity
                                    ):(
                                        null
                                    )
                                }
                                </h5>
                            <button className = "buttonClose" onClick = { handleClose } >Close Details</button>
                        </div>
                </div>
            }
        </Modal>
    )
}
