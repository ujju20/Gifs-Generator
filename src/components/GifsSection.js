import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function GifsSection(){
    const [searchText,setSearchText]=useState('');
    const [loader,setLoader]=useState(true);
    const [gif,setGif]=useState('https://media2.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif?cid=2c1051646j7j48acdt00dpfa70onuk84rxzn7y6jv1luapkx&rid=giphy.gif&ct=g');
    const searchGif = () => {
        console.log(searchText);
        setLoader(true);
        const API_KEY ='RtHe3p3g3fhdIlFmdOHsgZIkmKYzY7xt';
        const url='https://api.giphy.com/v1/gifs/search?api_key='+API_KEY+'&q='+searchText;

        axios.get(url)
        .then((res) => {
            const gifsList=res.data.data;
            console.log(gifsList);
            if(gifsList.length===0)
            {
                setGif(null);
                return;
            }
            const gifImage=gifsList[Math.floor(Math.random()*51)].images.original.url;
            setGif(gifImage);
            
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {

        setTimeout(() => {
            setLoader(false);
        },4000);



    },[gif])

    return (
        <div>
            <div className="search-block">
                <span>
                <input type="text" className="search-bar" placeholder="Search Your Gif :)" onChange={(e) => setSearchText(e.target.value)}/>
                {/* <img src="https://as2.ftcdn.net/v2/jpg/04/43/98/29/500_F_443982915_jZZQxesDYamYG97ZxGZ3xavnXuoqyV6i.jpg" alt="Search icon" className="search-icon"/> */}
                <button className="search-button" onClick={searchGif}>Search</button>
                </span>
                <div className="gif-section">
                    {loader?<div className="loader"></div>:
                    gif===null ?<div className="No-gif">No Gif to show for your search</div>:<img src={gif} className="main-gif" alt="main-gif"/>}
                </div>
            </div>
        </div>
    )

}

export default GifsSection;