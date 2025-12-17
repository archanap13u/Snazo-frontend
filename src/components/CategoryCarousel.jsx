import React from 'react';
import '../styles/CategoryCarousel.css';

// Placeholder images for categories
const categories = [
    { id: 1, name: 'Biryani', img: 'https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png' },
    { id: 2, name: 'Pizza', img: 'https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png' },
    { id: 3, name: 'Burger', img: 'https://b.zmtcdn.com/data/dish_images/ccb7dc653753e43d7d5b6d6c549183cd1584860110.png' },
    { id: 4, name: 'Rolls', img: 'https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png' },
    { id: 5, name: 'Chicken', img: 'https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png' },
    { id: 6, name: 'Thali', img: 'https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c64d52940d951632716604.png' },
    { id: 7, name: 'North Indian', img: 'https://b.zmtcdn.com/data/o2_assets/019409fe8f838312214d9211be0101df1632716661.png' },
    { id: 8, name: 'Dosa', img: 'https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png' },
];

const CategoryCarousel = () => {
    return (
        <div className="category-carousel-section animate-slide-up">
            <div className="carousel-header">
                <h2>What's on your mind?</h2>
            </div>
            <div className="carousel-container">
                {categories.map((cat) => (
                    <div key={cat.id} className="category-item">
                        <div className="cat-img-wrapper">
                            <img src={cat.img} alt={cat.name} loading="lazy" />
                        </div>
                        <span className="category-name">{cat.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCarousel;
