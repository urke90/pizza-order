import React from 'react';

import './Main.scss';

type MainProps = {};

const Main: React.FC<MainProps> = () => {
    return (
        <section className="main">
            <div className="main__container">
                <div className="main__heading-wrapper">
                    <h2 className="main__heading">Main Pizza Page</h2>
                    <p>Pick your favorite pizza</p>
                </div>
                <div className="main__content">
                    <aside className="main__menu">menu here</aside>
                    <main>present recepies</main>
                    <aside className="main__ingredients">
                        ingredients here
                    </aside>
                </div>
            </div>
        </section>
    );
};
export default Main;
