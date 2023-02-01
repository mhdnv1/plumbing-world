import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import { Card, Button } from "antd";
import { BsTelegram } from 'react-icons/bs'
import './home.scss'
import {ContextProductsId, ContextProducts,ContextSumma} from '../../App';




const Home = () => {

    const cardsContext = useContext(ContextProducts)
    const cardsIdContext = useContext(ContextProductsId)
    const summaContext = useContext(ContextSumma)


    const [search, setSearch] = useState('')
    const [cards, setCards] = useState([{}])

    const [firstSumma, setFirstSumma] = useState(0)

    const [summa, setSumma] = useState(0)


    //{productId:0, productCount:1}

    let apiurl = "http://localhost:5000"

    const getApi = () => {
        axios.get(`${apiurl}/products`)
            .then(({ data }) => setCards(data))
    }
    const getTg = (id,e) => {
        e.preventDefault()
        axios.post(`${apiurl}/product/${id}`)
            .then(({ data }) => (data))
    }
    const deleteApi = (id, e) => {
        e.preventDefault()
        axios.delete(`${apiurl}/product/${id}`)
            .then(({ data }) => (data))
    }
    useEffect(() => {
        getApi()
    }, []);
    const [cartProducts, setCartProducts] = useState([]);
    const handleAddProductToCart = productID => {

        const productCountsInBusket = cartProducts.filter(id => id === productID);
        

        const productIndex = cards.findIndex(product => {         
            return product.id === productID;
        });

        if(cards[productIndex].productCount==null||cards[productIndex].productCount==NaN)
            cards[productIndex].productCount = 0

        cards[productIndex].productCount += 1;
        setSumma(summa + parseInt(cards[productIndex].userPrice?cards[productIndex].userPrice:0))
        setFirstSumma(firstSumma + parseInt(cards[productIndex].price?cards[productIndex].price:0))
        
        cards[productIndex].click = true;

        setCards(cards)

        if(productCountsInBusket.length > 0)
        {
            let newCartProducts = cartProducts.filter(id => id > 0);
            setCartProducts(newCartProducts);
            return;
        }


        setCartProducts([...cartProducts, productID]);
    };
    const handleRemoveFromCart = productID => {

        clearCount(productID);
        const newCartProducts = cartProducts.filter(id => id !== productID);
        setCartProducts(newCartProducts)
    };


    const addCount = productID => {
        
        const productIndex = cards.findIndex(product => {         
            return product.id === productID;
        });

        if(cards[productIndex].productCount==null||cards[productIndex].productCount==NaN)
            cards[productIndex].productCount = 0

        cards[productIndex].productCount += 1
        setSumma(summa + parseInt(cards[productIndex].userPrice?cards[productIndex].userPrice:0))
        setFirstSumma(firstSumma + parseInt(cards[productIndex].price?cards[productIndex].price:0))
        
        setCards(cards)

        let newCartProducts = cartProducts.filter(id => id > 0);
            setCartProducts(newCartProducts);
        };
    const subCount = productID => {
        const productIndex = cards.findIndex(product => {         
            return product.id === productID;
        });
        if(cards[productIndex].productCount==1)
        {
            clearCount(productID);
            const newCartProducts = cartProducts.filter(id => id !== productID);
            setCartProducts(newCartProducts)
            return;
        }
        cards[productIndex].productCount -= 1
        setSumma(summa - parseInt(cards[productIndex].userPrice?cards[productIndex].userPrice:0))
        setFirstSumma(firstSumma - parseInt(cards[productIndex].price?cards[productIndex].price:0))

        setCards(cards)

        let newCartProducts = cartProducts.filter(id => id > 0);
            setCartProducts(newCartProducts);
    };

    const newCountInput = (productID, value) => {
        const productIndex = cards.findIndex(product => {         
            return product.id === productID;
        });

        if(value<1)
        value=1;

        setSumma((summa - parseInt(cards[productIndex].userPrice?cards[productIndex].userPrice:0)*cards[productIndex].productCount)+ parseInt(value) *parseInt(cards[productIndex].userPrice?cards[productIndex].userPrice:0))
        setFirstSumma((firstSumma - parseInt(cards[productIndex].price?cards[productIndex].price:0)*cards[productIndex].productCount)+ parseInt(value) *parseInt(cards[productIndex].price?cards[productIndex].price:0))

        cards[productIndex].productCount = parseInt(value);
        setCards(cards)
        let newCartProducts = cartProducts.filter(id => id > 0);
        setCartProducts(newCartProducts);
    };

    const clearCount = productID => {
        const productIndex = cards.findIndex(product => {         
            return product.id === productID;
        });
        setSumma(summa - parseInt(cards[productIndex].userPrice)*cards[productIndex].productCount)
        setFirstSumma(firstSumma - parseInt(cards[productIndex].price)*cards[productIndex].productCount)

        cards[productIndex].productCount = 0
        setCards(cards)

    };

    const getProducts = () => {
        cardsContext.setCardsContext(cards);
        cardsIdContext.setCardsIdContext(cartProducts);
        summaContext.setSumma(summa)
    };

    return (
        <Container>
            
            <Form style={{ width: "70%", marginLeft: "55px" }}>
                <InputGroup>
                    <Form.Control type="text" placeholder="" onChange={(e) => setSearch(e.target.value)} />
                </InputGroup>
            </Form>
            <div className='cards'>

                <div className="inner__cards">
                    {
                        cards.filter((item) => {
                            return search.toLowerCase() === '' ? item :
                                item.title.toLowerCase().includes(search) || (item.code+'').toLowerCase().includes(search)
                        }).map(product => {

                            const { id, title, price, description, owner,address, contacts,code, userPrice, img } = product;
                            let haveInCart = false;

                            cartProducts.forEach(productID => {
                                if (productID === id) {
                                    haveInCart = true;
                                }
                            });
                            return (
                                
                                <div class="card">
                                    <div class="card-header">
                                        <Link to={`/${id}`}><img src={img && img[0].url} alt="img" /></Link>
                                    </div>
                                    <div class="card-body">
                                        <span class="tag tag-teal">{title}</span>
                                        <h4>
                                           <small className="price__sale">цена товара:</small> {price}сом
                                        </h4>
                                        <h4>
                                           <small className="price__sale">цена продажа:</small>{userPrice}сом
                                        </h4>
                                        <h6>Код товара:{code}</h6>
                                        <p>
                                            {description}
                                        </p>
                                        <div class="user">
                                            <div class="user-info">
                                                <h5>фирма:{owner}</h5>
                                                <span>адресс:{address}</span> <br />
                                                <small>{contacts}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-group">
                                        <Button
                                            onClick={() => handleAddProductToCart(id)}
                                            type="primary"
                                        >
                                            Корзина
                                        </Button>
                                        <Button
                                            type="primary"
                                            danger
                                            onClick={(e)=> deleteApi(id, e)}
                                        >
                                            Удалить
                                        </Button>
                                        <button type='submit' onClick={(e)=> getTg(id,e)} className='btn_submit_tg'><BsTelegram className="icons" /></button>
                                    </div>


                                </div>

                            );
                        })}
                </div>
                <div className="basket">
                    <h1>Ваша корзина</h1>
                    <h1>Общая сумма: {parseFloat(summa)}</h1>
                    {cartProducts.length > 0
                        ? cartProducts.map(productID => {

                            const productIndex = cards.findIndex(product => {

                                return product.id === productID;
                            });


                            let { id, title, price, description, owner, address, contacts, code, userPrice, img, productCount } = cards[productIndex];
                            return (
                                <div class="card">
                                    <div class="card-header">
                                        <Link to={`/${id}`}><img src={img && img[0].url} alt="img" /></Link>
                                    </div>
                                    <div class="card-body">
                                        <span class="tag tag-teal">{title}</span>
                                        <h4>
                                        цена товара:{(price?price:0)*productCount}сом
                                        </h4>
                                        <h4>
                                        цена продажа:{(userPrice?userPrice:0)*productCount}сом
                                        </h4>
                                        <h4>
                                            количество товара:{productCount}
                                            
                                        </h4>
                                        <button type='button' onClick={() => addCount(id)} className="btn btn-primary">+</button>
                                        <input onChange={(e) => newCountInput(id, e.target.value)} type="number" value={productCount}/>
                                        <button type='button' onClick={() => subCount(id)} className="btn btn-primary">-</button>
                                        <h6>Код товара:{code}</h6>
                                        <p>
                                            {description}
                                        </p>
                                        <div class="user">
                                            <div class="user-info">
                                                <h5>фирма:{owner}</h5>
                                                <small>адресс:{address}</small><br />
                                                <small>{contacts}</small>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        (
                                            <Button
                                                onClick={() => handleRemoveFromCart(id)}
                                                type="primary"
                                                danger
                                            >
                                                Удалить из корзины
                                            </Button>
                                        )
                                    }
                                </div>
                            );
                        })
                        : "Ваша корзина пуста! :("}<br/><br/>

                        <button className="btn btn-primary"><Link to={{
                            pathname:'/clearance', 
                            state: getProducts()
                        }}>Oформит</Link></button>
                </div>
            </div>
        </Container>
    );
}

export default Home;
