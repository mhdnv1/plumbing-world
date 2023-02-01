import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import CreatePost from '../../pages/CreatePost/CreatePost';
import '../../style.scss'

const Header = () => {
    
    return (
        <header>       
            <h1 className="text-center mb-5"><Link to='/'>Мир сантехники</Link>
            <CreatePost/>
            </h1>          
        </header>
    );
}

export default Header;
