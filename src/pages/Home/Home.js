import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import { Card, Button } from "antd";
import { BsTelegram } from 'react-icons/bs'
import './home.scss'
import { ContextProductsId, ContextProducts, ContextSumma } from '../../App';
import ChangePost from '../ChangePost/ChangePost';
import { SlBasket } from 'react-icons/sl'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { FcPrevious, FcNext } from 'react-icons/fc'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineClear } from 'react-icons/ai'

const Home = () => {

    const cardsContext = useContext(ContextProducts)
    const summaContext = useContext(ContextSumma)

    const [search, setSearch] = useState('')
    const [searchBool, setSearchBool] = useState(false)


    const [cards, setCards] = useState([{}])

    const [firstSumma, setFirstSumma] = useState(0)

    const [summa, setSumma] = useState(0)
    let apiurl = "http://localhost:5000"
    const getApi = (page) => {

        axios.get(`${apiurl}/products/${page}`)

            .then(({ data }) => {
                setPageCount(data.pagecount);
                setCards(data.body);
            })
    }
    const getTg = (id, e) => {
        e.preventDefault()
        axios.post(`${apiurl}/product/${id}`)
            .then(({ data }) => (data))

    }
    const getChange = (data, e) => {
        e.preventDefault()
    }
    const deleteApi = (id, e) => {
        e.preventDefault()
        axios.delete(`${apiurl}/product/${id}`)
            .then(({ data }) => (data))
        window.location.reload()
    }

    useEffect(() => {
        getApi(1)
    }, []);

    const [cartProducts, setCartProducts] = useState([]);// тут уже продукты

    //добавление
    const handleAddProductToCart = newProduct => {



        const productIndex = cartProducts.findIndex(product => {
            return product.id === newProduct.id;
        });


        if (productIndex === -1) {

            newProduct.productCount = 1
            setSumma(summa + parseInt(newProduct.userPrice ? newProduct.userPrice : 0))
            setFirstSumma(firstSumma + parseInt(newProduct.price ? newProduct.price : 0))


            setCartProducts([...cartProducts, newProduct])


            return
        }

        if (cartProducts[productIndex].productCount == null || cartProducts[productIndex].productCount == NaN)
            cartProducts[productIndex].productCount = 0

        cartProducts[productIndex].productCount += 1;
        setSumma(summa + parseInt(cartProducts[productIndex].userPrice ? cartProducts[productIndex].userPrice : 0))
        setFirstSumma(firstSumma + parseInt(cartProducts[productIndex].price ? cartProducts[productIndex].price : 0))
        cartProducts[productIndex].click = true;

        setCartProducts(cartProducts)

        const productCountsInBusket = cartProducts.filter(product => product.id > 0);


        if (productCountsInBusket.length > 0) {
            let newCartProducts = cartProducts.filter(product => product.id > 0);
            setCartProducts(newCartProducts);
            return;
        }
        setCartProducts([...cartProducts, newProduct]);
    };

    const handleRemoveFromCart = newProduct => {

        clearCount(newProduct);
        const newCartProducts = cartProducts.filter(product => product.id !== newProduct.id);
        setCartProducts(newCartProducts)
    };
    const addCount = productID => {

        const productIndex = cartProducts.findIndex(product => {
            return product.id === productID;
        });

        if (cartProducts[productIndex].productCount == null || cartProducts[productIndex].productCount == NaN)
            cartProducts[productIndex].productCount = 0

        cartProducts[productIndex].productCount += 1
        setSumma(summa + parseInt(cartProducts[productIndex].userPrice ? cartProducts[productIndex].userPrice : 0))
        setFirstSumma(firstSumma + parseInt(cartProducts[productIndex].price ? cartProducts[productIndex].price : 0))


        let newCartProducts = cartProducts.filter(product => product.id > 0);
        setCartProducts(newCartProducts);
    };

    const subCount = productID => {
        const productIndex = cartProducts.findIndex(product => {
            return product.id === productID;
        });
        if (cartProducts[productIndex].productCount == 1) {
            clearCount(cartProducts[productIndex]);
            const newCartProducts = cartProducts.filter(product => product.id !== productID);
            setCartProducts(newCartProducts)
            return;
        }
        cartProducts[productIndex].productCount -= 1
        setSumma(summa - parseInt(cartProducts[productIndex].userPrice ? cartProducts[productIndex].userPrice : 0))
        setFirstSumma(firstSumma - parseInt(cartProducts[productIndex].price ? cartProducts[productIndex].price : 0))


        let newCartProducts = cartProducts.filter(product => product.id > 0);
        setCartProducts(newCartProducts);
    };

    const newCountInput = (productID, value) => {
        const productIndex = cartProducts.findIndex(product => {
            return product.id === productID;
        });

        if (value < 1)
            value = 1;

        setSumma((summa - parseInt(cartProducts[productIndex].userPrice ? cartProducts[productIndex].userPrice : 0) * cartProducts[productIndex].productCount) + parseInt(value) * parseInt(cartProducts[productIndex].userPrice ? cartProducts[productIndex].userPrice : 0))
        setFirstSumma((firstSumma - parseInt(cartProducts[productIndex].price ? cartProducts[productIndex].price : 0) * cartProducts[productIndex].productCount) + parseInt(value) * parseInt(cartProducts[productIndex].price ? cartProducts[productIndex].price : 0))

        cartProducts[productIndex].productCount = parseInt(value);
        let newCartProducts = cartProducts.filter(prouct => prouct.id > 0);
        setCartProducts(newCartProducts);
    };

    const clearCount = newProduct => {
        const productIndex = cartProducts.findIndex(product => {
            return product.id === newProduct.id;
        });
        setSumma(summa - parseInt(cartProducts[productIndex].userPrice) * cartProducts[productIndex].productCount)
        setFirstSumma(firstSumma - parseInt(cartProducts[productIndex].price) * cartProducts[productIndex].productCount)

        cartProducts[productIndex].productCount = 0
        setCartProducts(cartProducts)
    };

    const getProducts = () => {
        cardsContext.setCardsContext(cartProducts);
        summaContext.setSumma(summa)
    };



    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);


    const nextPage = () => {
        if (currentPage >= pageCount)
            return;

        let page = currentPage + 1

        setCurrentPage(page);
        setCards([]);

        if (searchBool)
            getSearch(page)
        else
            getApi(page);
    };

    const previousPage = () => {
        if (currentPage <= 1)
            return;

        let page = currentPage - 1

        setCurrentPage(page);
        setCards([]);

        if (searchBool)
            getSearch(page)
        else
            getApi(page);

    };

    const getSearch = (page,e) => {
        if (!searchBool)
            page = 1
        e.preventDefault()
        setSearchBool(true)
        setCards([])

        setCurrentPage(page)

        axios.get(`${apiurl}/products/${page}/search/${search}`)

            .then(({ data }) => {
                setPageCount(data.pagecount);
                setCards(data.body);
            })

    };
    const clearSearch = () => {
        setSearchBool(false)
        setSearch('')
        setCurrentPage(1)
        setCards([])

        getApi(1)
    };


    return (
        <Container>
            <Form style={{ width: "70%", marginLeft: "55px" }}>
                <InputGroup>
                    <Form.Control type="text" placeholder="поиск товара" onChange={(e) => setSearch(e.target.value)} />
                    <button onClick={(e)=>getSearch(1,e)} style={{ border:"none", background:"#fff", fontSize:"30px", margin:'3px', color:"green" }}><BsSearch /></button>
                    <button onClick={()=>clearSearch()} style={{ border:"none", background:"#fff", fontSize:"30px", margin:'3px', color:"green" }}><AiOutlineClear /></button>
                </InputGroup>

            </Form>
            <div className='cards'>

                <div className="inner__cards">
                    {
                        cards.map(product => {

                            const { id, title, price, description, owner, address, contacts, code, userPrice, img } = product;
                            let haveInCart = false;

                            cartProducts.forEach(product => {
                                if (product.id === id) {
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
                                        <button
                                            onClick={() => handleAddProductToCart(product)}
                                            type="primary"
                                            className='btn_submit_tg'>
                                            <SlBasket className='icons__basket' />
                                        </button>
                                        <button
                                            type="primary"
                                            className='btn_submit_tg'
                                            onClick={(e) => deleteApi(id, e)}>
                                            <RiDeleteBin5Fill className='icons__delete' />
                                        </button>
                                        <ChangePost
                                            className='btn_submit_tg'
                                            id={id}
                                            img={img}
                                            title={title}
                                            price={price}
                                            usePrice={userPrice}
                                            description={description}
                                            owner={owner}
                                            address={address}
                                            phone={contacts}
                                            code={code}
                                        />
                                        <button type='submit'
                                            onClick={(e) => getTg(id, e)}
                                            className='btn_submit_tg'>
                                            <BsTelegram className="icons" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="basket">
                    <h1>Ваша корзина</h1>
                    <h1>Общая сумма: {parseFloat(summa)}</h1>
                    {cartProducts.length > 0
                        ? cartProducts.map(product => {
                            let { id, title, price, description, owner, address, contacts, code, userPrice, img, productCount } = product;
                            return (
                                <div class="card">
                                    <div class="card-header">
                                        <Link to={`/${id}`}><img src={img && img[0].url} alt="img" /></Link>
                                    </div>
                                    <div class="card-body">
                                        <span class="tag tag-teal">{title}</span>
                                        <h4>
                                            цена товара:{(price ? price : 0) * productCount}сом
                                        </h4>
                                        <h4>
                                            цена продажа:{(userPrice ? userPrice : 0) * productCount}сом
                                        </h4>
                                        <h4>
                                            количество товара:{productCount}
                                        </h4>
                                        <button type='button' onClick={() => addCount(id)} className="btn btn-primary">+</button>
                                        <input onChange={(e) => newCountInput(id, e.target.value)} type="number" value={productCount} />
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
                                                onClick={() => handleRemoveFromCart(product)}
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
                        : "Ваша корзина пуста! :("}<br /><br />
                    <button className="btn btn-primary"><Link to={{
                        pathname: '/clearance',
                        state: getProducts()
                    }}>Oформит</Link></button>
                </div>
            </div>
            <div className="paginations">
                <button onClick={() => previousPage()}><FcPrevious /></button>
                <Link to={() => getApi(1)}>1</Link>
                <Link>{currentPage}</Link>
                <Link to={() => getApi(pageCount)}>{pageCount}</Link>
                <button onClick={() => nextPage()}><FcNext /></button>
            </div>
        </Container>
    );
}

export default Home;

/*
filter((item) => {
                            return search.toLowerCase() === '' ? item :
                                item.title.toLowerCase().includes(search) || (item.code+'').toLowerCase().includes(search)
                        }).
*/