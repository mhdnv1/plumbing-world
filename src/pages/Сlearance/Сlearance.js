import React, { useContext, useRef, useState } from 'react';
import { ContextProductsId, ContextProducts, ContextSumma } from '../../App';
import { useReactToPrint } from 'react-to-print';
import './clearance.scss'

const Clearance = () => {

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
                    <h3 style={{textAlign:"center"}}>Интернет магазин Куршаб.ru </h3>
                    <p style={{textAlign:"center"}}><b>тел:Ватсап 0552820270  0778914607   0700401121</b></p>
                    <table d-block w-100 mx-auto>
                        <tr>
                            <td>№</td>
                            <td>код</td>
                            <td>наименования</td>
                            <td>количество</td>
                            <td>цена за 
                                <br/> единицу</td>
                            <td>итог</td>
                        </tr>
                        {cards.cardsContext.length > 0
                            ? cards.cardsContext.map((product, index) => {


                                let { id, title, price, description, owner, address, contacts, code, userPrice, img, productCount } = product;

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

                    <p style={{textAlign:"end", marginRight:'30px'}}><b>Общая сумма: {summaContext.summa}</b></p>
                    <label >Ф.И.О</label>
                    <p style={{ backgroundColor: "#EEF6F7", outline: "0px", padding: "5px 0", borderRadius: "10px" }} contentEditable="true"></p>
                    <label>Адресс</label>
                    <p style={{ backgroundColor: "#EEF6F7", outline: "0px", padding: "5px 0", borderRadius: "10px" }} contentEditable="true"></p>
                    <label >телефон номер</label>
                    <p style={{ backgroundColor: "#EEF6F7", outline: "0px", padding: "5px 0", borderRadius: "10px" }} contentEditable="true"></p>
                     <div style={{display:'flex', justifyContent:"space-between"}}>
                     <div style={{display:"flex"}}>
                        <label ><b>подпись</b></label>&nbsp;&nbsp;
                        <div style={{ borderBottom: "1px solid black", width: "100px" }}></div>
                    </div> <br/>
                    <div style={{display:"flex"}}>
                        <label ><b>Дата :</b></label>&nbsp;&nbsp;
                        <div><b>{`${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`}</b></div>
                    </div>
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
