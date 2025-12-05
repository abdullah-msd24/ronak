import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <div className="bg-primary text-white py-20">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to RONAK</h1>
                <p className="text-lg mb-8">Discover People, Create Events, Make Memories</p>
                <a href="/signup" className="bg-white text-primary font-semibold py-2 px-4 rounded shadow hover:bg-gray-200 transition">
                    Join Us Now
                </a>
            </div>
        </div>
    );
};

export default HeroSection;