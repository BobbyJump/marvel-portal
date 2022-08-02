import {useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(1);
    
    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        onCharListLoadind();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const onCharListLoadind = () => {
        setNewItemsLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    function renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg');
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle ? {'objectFit' : 'unset'} : {'objectFit' : 'cover'}}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemsLoading}>
                    <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;