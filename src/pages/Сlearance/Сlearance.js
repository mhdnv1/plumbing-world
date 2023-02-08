import React, { useContext, useRef, useState } from 'react';
import { ContextProductsId, ContextProducts, ContextSumma } from '../../App';
import { useReactToPrint } from 'react-to-print';
import './clearance.scss'

const Clearance = () => {

    const cartProducts = useContext(ContextProductsId)
    const cards = useContext(ContextProducts)
    const summaContext = useContext(ContextSumma)


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const date = new Date()
    return (
        <div className="clearance">

            <div>
                <div className="a4" ref={componentRef}>
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
                                        <td>{index + 1}</td>
                                        <td>{code}</td>
                                        <td>{title}</td>
                                        <td>{productCount}</td>
                                        <td>{userPrice}</td>
                                        <td>{(userPrice ? userPrice : 0) * productCount}</td>
                                    </tr>


                                );
                            })
                            : "Ваша корзина пуста! :("}
                    </table>

                    <p>Общая сумма: {summaContext.summa}
                    </p>
                    <label >Ф.И.О</label>
                    <p style={{ backgroundColor: "#EEF6F7", outline: "0px", padding: "5px 0", borderRadius: "10px" }} contentEditable="true"></p>
                    <label>Адресс</label>
                    <p style={{ backgroundColor: "#EEF6F7", outline: "0px", padding: "5px 0", borderRadius: "10px" }} contentEditable="true"></p>
                    <label >телефон номер</label>
                    <p style={{ backgroundColor: "#EEF6F7", outline: "0px", padding: "5px 0", borderRadius: "10px" }} contentEditable="true"></p>
                    <div style={{display:"flex"}}>
                        <label ><b>подпись</b></label>&nbsp;&nbsp;
                        <div style={{ borderBottom: "1px solid black", width: "100px" }}></div>
                    </div> <br/>
                    <div style={{display:"flex"}}>
                        <label ><b>Дата :</b></label>&nbsp;&nbsp;
                        <div><b>{`${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`}</b></div>
                    </div>

                </div>
                <button onClick={handlePrint} className="btn btn-primary d-block mx-auto my-4">печать...</button>

            </div>
        </div>
    );
}

export default Clearance;

const Exapmle = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
}
