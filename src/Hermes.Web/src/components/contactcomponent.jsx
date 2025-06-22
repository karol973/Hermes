import MainMenu from "./mainmenu"
import React from 'react';

const Contact = () => {
    return (<>
    <MainMenu/>
    <div className="contact-component">
        <h1> KONTAKT</h1>
        <div className="location-component">
            <div className="contact-card">
                <h3>Antykwariat Hermes</h3>
                <h3>os. Przy Arce 13/37</h3>
                <h3>30-105 Kraków</h3>
                <br/>
                <h3>NIP: 123 456 78 90</h3>
                <h3>REGON: 123567890</h3>
            </div>
            <div className="">
                <h3>Godziny otwarcia:</h3>
                <h3>poniedziałek - piątek w godz. 10-18</h3>
                <br/>
                <h3>tel. 
                    <span className="link">
                    123 456 789
                    </span>
                    </h3>
                <h3>
                    email: 
                    <span className="link">
                    antykwariat@hermes.com
                    </span>
                    </h3>
            </div>
        </div>
        <div className="contact-card">
            <h2>DANE DO PRZELEWU:</h2>
            <h3>Antykwariat Hermes</h3>
            <h3>os. Przy Arce 13/37</h3>
            <h3>uBank 12 2134 0000 2137 5647 8471 </h3>
        </div>
    </div>
    </>)
}

export default Contact