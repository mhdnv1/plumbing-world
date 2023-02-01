import React, { useContext , useRef, useState} from 'react';
import {ContextProductsId, ContextProducts,ContextSumma} from '../../App';
import { useReactToPrint } from 'react-to-print';
import './clearance.scss'

const Clearance = () => {

const cartProducts = useContext(ContextProductsId)
const cards = useContext(ContextProducts)
const summaContext = useContext(ContextSumma)


const componentRef =  useRef();
    const handlePrint = useReactToPrint({
        content:()=> componentRef.current,
    });

    return (
        <div className="clearance">
            
           <div>
            <div className="a4" ref={componentRef}>
           <h1 className="text-center">Чек</h1>
           <table d-block w-100 mx-auto>
                                    <tr>
                                        <td>№</td>
                                         <td>код товара</td>
                                         <td>называние</td>
                                         <td>количество</td>
                                         <td>цена за единицу</td>
                                         <td>итог</td>
                                    </tr>
           {cartProducts.cardsIdContext.length > 0
                        ? cartProducts.cardsIdContext.map((productID, index) => {

                            const productIndex = cards.cardsContext.findIndex(product => {

                                return product.id === productID;
                            });


                            let { id, title, price, description, owner, address, contacts, code, userPrice, img, productCount } = cards.cardsContext[productIndex];
                            
                            return (
                                
                                    <tr>
                                        <td>{index+1}</td>
                                         <td>{code}</td>
                                         <td>{title}</td>
                                         <td>{productCount}</td>
                                         <td>{userPrice}</td>
                                         <td>{(userPrice?userPrice:0)*productCount}</td>
                                    </tr>
                                    
                               
                            );
                        })
                        : "Ваша корзина пуста! :("}
                         </table>

                        <p>Общая сумма: {summaContext.summa }
                            </p>


                            </div>
                        <button onClick={handlePrint} className="btn btn-primary d-block mx-auto my-4">печать...</button>
            
           </div>
        </div>
    );
}

export default Clearance;

const Exapmle = ()=>{
    const componentRef =  useRef();
    const handlePrint = useReactToPrint({
        content:()=> componentRef.current,
    });
}
