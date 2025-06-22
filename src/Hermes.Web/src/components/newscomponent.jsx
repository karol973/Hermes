import MainMenu from "./mainmenu"
import png1 from "../bozeCialo.png"
import png2 from "../dzienKsiazki.jpg"
import React from 'react';


const News = () => {
    return (
        <>
        <MainMenu/>
        <div className="news-component"> 
            <h1 className="title">NEWS </h1>
        
        <div className="news-card">
            <img className="news-picture" src={png1}  />
            <div className="news-text">
            <h1 className="news-title">W Boże Ciało antykwariat będzie zamknięty</h1>
            <h3 className="news-date">12.06.2025 12:00</h3>
            <h3 className="news-content">W dniu 19.06.2025 Antykwariat Hermes jest zamknięty, zapraszamy następnego dnia.</h3>
                 </div>
        </div>
            <div className="news-card">
            <img className="news-picture" src={png2}  />
            <div className="news-text">
            <h1 className="news-title">Światowy Dzień Książki i Praw Autorskich</h1>
            <h3 className="news-date">03.03.2025 10:32</h3>
            <h3 className="news-content">Jak co roku 23 kwietnia tradycyjnie obchodzony jest Światowy Dzień Książki i Praw Autorskich. Jest to święto ustanowione 30 lat temu przez organizację UNESCO. </h3>
                 </div>
        </div>
        </div>
         </>
    )
}

export default News