import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import CreatePost from '../../pages/CreatePost/CreatePost';
import '../../style.scss'

const Header = () => {
    
    return (
        <header>       
            <h2 className="text-center my-4"><Link to='/'>Интернет Магазин Куршаб</Link>
            <CreatePost/>
            </h2>          
        </header>
    );
}

export default Header;
