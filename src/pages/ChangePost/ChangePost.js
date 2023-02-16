import React, { useState, FC, lazy, Suspense, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {MdPublishedWithChanges} from 'react-icons/md'
import './changepost.scss'
import '../Home/home.scss'

function ChangePost(props) {


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
    data.id = props.id
    console.log(data)
    axios.post('http://localhost:5000/change', { ...data })
      .then((res) => {
        navigate('/')
        reset()
      }).catch((error) => console.log(error))
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
  const [output, setOutput] = useState(props.price);
  function convert(e) {
    setInput(e)
    let test = e * valuta
    setOutput(test.toFixed(2));
  }
  return (
    <>
      <button className="btn_submit_tg" onClick={handleShow}>
        <MdPublishedWithChanges className='icons__change'/>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Container>
          <div className="registration">
          <img src={imageBlob} style={{ display: "none" }} />
            <form className="form" onSubmit={handleSubmit(registerUser)}>
              <input defaultValue={props.id} type="text" style={{display:"none"}} />
              <input  defaultValue={props.title}  required {...register('title')} type="text" placeholder='называние товара' /><br />
              {/* -------------------------------------------------------------------------------------- */}
              <label>курс валюта</label>
              <input  style={{ width: '100%', marginBottom: '10px' }}
                onChange={(e) => setValuta(e.target.value)} defaultValue={0} type='text'/>
              <label>цена товара доллор</label>
              <input  style={{ width: '100%', marginBottom: '10px' }}
               type='text' onChange={(e)=> convert(e.target.value)} defaultValue={0}/>
              <label>цена товара сом</label>
              <input required {...register('price')} style={{ width: '100%', marginBottom: '20px' }}
               type="number" defaultValue={props.price} value={output} onChange={(e)=>setOutput(e.target.value)} />
              {/* -------------------------------------------------------------------------------------- */}
              <input defaultValue={props.usePrice} required {...register('userPrice')} type="number" placeholder='цена для клиентов' /><br />
              <textarea defaultValue={props.description} required {...register('description')} type="text" placeholder='описаные товара' ></textarea><br />
              <input defaultValue={props.owner} required {...register('owner')} type="text" placeholder='владелец товара' /><br />
              <input defaultValue={props.address} required {...register('address')} type="text" placeholder='адресс товара' /><br />
              <input defaultValue={props.phone} required {...register('phone')} type="phone" placeholder='телефон номер' /><br />
              <input defaultValue={props.code} required {...register('code')} type="text" placeholder='код товара' /><br />
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

export default ChangePost

