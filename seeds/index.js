const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const Review = require('../models/review');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

//clear and new a database with grounds name and location
const seedDB = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = await new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ] 
            },
            images: [{
                url: 'https://res.cloudinary.com/dieo0udve/image/upload/v1698322768/cld-sample-2.jpg',
                filename: 'YelpCamp/adpm9vwgjywalxwbnoek'
              }],
            // images: [{
            //     url: 'https://source.unsplash.com/collection/483251',
            //     filename: 'default',
            // }

            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi quo vitae atque illum dolorem sunt sed animi ratione, earum soluta est iste fugiat odio doloribus quos non rerum tempore error!',
            price: price,
            author: "653662755937249e11142ba6",
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
