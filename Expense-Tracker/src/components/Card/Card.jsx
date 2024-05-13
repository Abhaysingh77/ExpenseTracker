import PropTypes from 'prop-types'
import './Card.css'
import ModalBox from '../Modal/Modal';
import { useState } from 'react';
export default function Card({btnText,cardText,balance}) {
    const [isOpen, setIsOpen] = useState(false) 
    const handleClick = () =>{
        setIsOpen(true);
    }
    return(
        <div className="card">
            <div className='cardText'>{cardText}: <span id='balance'>&#8377;{balance}</span></div>
            <button onClick={handleClick} className='button'>+ Add {btnText}</button>
            <ModalBox isOpen={isOpen} setIsOpen={setIsOpen} btnText={btnText}/>
        </div>
    )
}
Card.propTypes = {
    btnText: PropTypes.string.isRequired,
    cardText: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired, 
}