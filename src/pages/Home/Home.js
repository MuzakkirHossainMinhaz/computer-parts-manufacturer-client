import React from 'react';
import Banner from './Banner';
import Parts from './Parts';
import Summary from './Summary';
import Reviews from './Reviews';
import Categories from './Categories';
import Gallery from './Gallery';

const Home = () => {
    return (
        <div>
            <Banner />
            <Parts />
            <Summary />
            <Reviews />
            <Categories />
            <Gallery />
        </div>
    );
};

export default Home;