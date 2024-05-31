const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Review = require('../models/review');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

main().catch(err => console.log(err));

const dbURL = 'mongodb://localhost:27017/yelp-camp';

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log("connected to mongoose");
}
const db = mongoose.connection;

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({});
    for (let i = 0; i < 350; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30 + 10)
        const camp = new Campground({
            author: '665820d3c64a859853ae5a76',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dww0goioc/image/upload/v1716458383/YelpCamp/ugijskpntzj1yfwb7bv4.jpg',
                    filename: 'YelpCamp/ugijskpntzj1yfwb7bv4',
                },
                {
                    url: 'https://res.cloudinary.com/dww0goioc/image/upload/v1716458388/YelpCamp/pqnx3tr9ibib7xmgv3d6.jpg',
                    filename: 'YelpCamp/pqnx3tr9ibib7xmgv3d6',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque temporibus cum officia incidunt! Reprehenderit porro, sint rerum animi excepturi itaque, modi numquam cupiditate hic est consectetur ullam ea, id aliquid. Consequuntur nostrum sunt nisi, soluta natus ex saepe reiciendis, maxime inventore omnis officiis? Quasi beatae reiciendis, sunt consectetur nemo at sit adipisci distinctio amet, dolorum aspernatur dolor ad nobis laborum.',
            price,
            geometry: { type: "Point", coordinates: [cities[random1000].longitude, cities[random1000].latitude] }
        }
        )
        await camp.save();
    }
}

seedDB().then(() => {
    db.close()
});