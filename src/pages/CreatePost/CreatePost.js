import React, { useState, FC, lazy, Suspense, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-dropdown/style.css';
import './createpost.scss'

const Home = lazy(() => import("../Home/Home"))

function CreatePost() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(
    false
  );
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    reset,
  } = useForm()

  const registerUser = (data) => {

    data.img = imageBlob
    data.price = output
    axios.post('http://localhost:5000/create', { ...data })
      .then((res) => {
        navigate('/')
        reset()
      }).catch((error) => console.log(error))
     window.location.reload()

  }
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  async function tobase64Handler(files) {
    const filePathsPromises = [];
    for (let i = 0; i < files.length; i++) {
      filePathsPromises.push(toBase64(files[i]));
    }
    const filePaths = await Promise.all(filePathsPromises);
    const mappedFiles = filePaths.map((base64File) => (base64File));
    setImageBlob({ imageBlob: [...mappedFiles] })
  }

  const [imageBlob, setImageBlob] = useState([])

  function hand(e) {
    tobase64Handler(e.target.files)
  }


  // ---------------------------------------------------------------------------------

  const [input, setInput] = useState(0);
  const [valuta, setValuta] = useState(0);
  const [output, setOutput] = useState(0);
  function convert(e) {
    setInput(e)
    let test = e * valuta
    
    setOutput(test.toFixed(2));
  }
  return (
    <>
      <Button className="mx-3 btn btn-danger" onClick={handleShow}>
        Добавить товар
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Container>
          <div className="registration">
            <img src={imageBlob} style={{ display: "none" }} />
            <form className="form" onSubmit={handleSubmit(registerUser)}>
              <input onInput={hand} required {...register('img')} name="img" multiple type="file" accept="image/*" placeholder='вставьте ссылку изображение товара' /><br />
              <input required {...register('title')} type="text" placeholder='называние товара' /><br />

              {/* -------------------------------------------------------------------------------------- */}
              <label>курс валюта</label>
              <input  style={{ width: '100%', marginBottom: '10px' }}
                onChange={(e) => setValuta(e.target.value)} defaultValue={0} type='text'/>

              <label>цена товара доллор</label>
              <input required style={{ width: '100%', marginBottom: '10px' }}
               type='number' onChange={(e)=> convert(e.target.value)} defaultValue={0}  />
               
              <label>цена товара сом</label>
              <input required {...register('price')} style={{ width: '100%', marginBottom: '20px' }}
               type="number" value={output} />
              {/* -------------------------------------------------------------------------------------- */}
              
              
              <input required {...register('userPrice')} type="number" placeholder='цена для клиентов' /><br />
              <textarea required {...register('description')} type="text" placeholder='описаные товара' ></textarea><br />
              <input required {...register('owner')} type="text" placeholder='владелец товара' /><br />
              <input required {...register('address')} type="text" placeholder='адресс товара' /><br />
              <input required {...register('phone')} type="phone" placeholder='телефон номер' /><br />
              <input required {...register('code')} type="text" placeholder='код товара' /><br />
              <button className="btn btn-primary" type='submit'>Отправить</button>
            </form>
          </div>
        </Container>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreatePost