import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from '../context/CartContext';
import AddToCartButton from '../components/AddToCartButton';
import './Shop.css';

// Sample data for guppy fish
const guppyFishData = [
    {
        id: 'guppy1',
        name: "Blue Moscow Guppy",
        imageUrl: 'https://th.bing.com/th/id/OIP.oInMyJtwkDfogkyKRj7gsgHaHa?rs=1&pid=ImgDetMain',
        price: 599,
        color: "blue",
        gender: "male",
        size: "medium",
        description: "Beautiful blue variety with flowing fins",
        stock: 15,
        type: 'guppy'
    },
    {
        id: 'guppy2',
        name: "Red Dragon Guppy",
        imageUrl: 'https://th.bing.com/th/id/OIP.Ksqa1FB2oTjndL1OHBjQpwHaHa?rs=1&pid=ImgDetMain',
        price: 699,
        color: "red",
        gender: "male",
        size: "medium",
        description: "Striking red coloration with dragon-scale pattern",
        stock: 20,
        type: 'guppy'
    },
    {
        id: 'guppy3',
        name: "Yellow Snakeskin Guppy",
        imageUrl: 'https://http2.mlstatic.com/guppy-metal-yellow-snakeskin-D_NQ_NP_485311-MLB20525156944_122015-F.jpg',
        price: 799,
        color: "yellow",
        gender: "male",
        size: "large",
        description: "Unique snakeskin pattern with yellow base",
        stock: 12,
        type: 'guppy'
    },
    {
        id: 'guppy4',
        name: "Purple Delta Guppy",
        imageUrl: 'https://th.bing.com/th/id/R.f5502aed4eace724fd02c4f5f4f61ecc?rik=KgzWnF9sBIyKDg&riu=http%3a%2f%2fguppywest.com%2f2019guppypics%2fPur_Grn1strain_6MosJan2019IMG_1781Sml.jpg&ehk=OLILk1cdt6OdPXr74A4b03pnDUYOxeUITAxm5rhl9M4%3d&risl=&pid=ImgRaw&r=0',
        price: 899,
        color: "purple",
        gender: "male",
        size: "medium",
        description: "Elegant purple coloration with delta-shaped tail",
        stock: 10,
        type: 'guppy'
    },
    {
        id: 'guppy5',
        name: "Platinum Albino Guppy",
        imageUrl: 'https://s3-us-west-2.amazonaws.com/getgillsbucket/media/images/Dans_Fish_Platinum_Albino_Guppy_-_Pairs_Platinum_Albino_Guppy_Female_c9155c791937491197ab2868241bc146_9470.jpg',
        price: 999,
        color: "white",
        gender: "male",
        size: "medium",
        description: "Rare albino variety with platinum sheen",
        stock: 8,
        type: 'guppy'
    },
    {
        id: 'guppy6',
        name: "Neon Green Guppy",
        imageUrl: 'https://i.pinimg.com/originals/6f/f0/67/6ff067754a53271d21c7044bf208e2f3.png',
        price: 749,
        color: "green",
        gender: "male",
        size: "small",
        description: "Vibrant neon green coloration",
        stock: 18,
        type: 'guppy'
    },
    {
        id: 'guppy7',
        name: "Coral Red Female Guppy",
        imageUrl: 'https://d2j6dbq0eux0bg.cloudfront.net/images/5391016/1037581020.jpg',
        price: 649,
        color: "red",
        gender: "female",
        size: "medium",
        description: "Beautiful female with coral red coloring",
        stock: 15,
        type: 'guppy'
    },
    {
        id: 'guppy8',
        name: "Mosaic Guppy",
        imageUrl: 'https://www.aquatic-village.com/wp-content/uploads/2020/11/guppy2-624x468.jpg',
        price: 849,
        color: "multi",
        gender: "male",
        size: "large",
        description: "Complex mosaic pattern with multiple colors",
        stock: 14,
        type: 'guppy'
    },
    {
        id: 'guppy9',
        name: "Black Moscow Guppy",
        imageUrl: 'https://th.bing.com/th/id/OIP.kk0bnSRXzrfWZrjPyt1LHgHaHa?rs=1&pid=ImgDetMain',
        price: 799,
        color: "black",
        gender: "male",
        size: "medium",
        description: "Deep black coloration with Moscow genetics",
        stock: 16,
        type: 'guppy'
    },
    {
        id: 'guppy10',
        name: "Golden Tuxedo Guppy",
        imageUrl: 'https://www.liveaquaria.com/images/categories/product/lg_114193_Golden_Tuxedo_Guppy_Male.jpg',
        price: 899,
        color: "gold",
        gender: "male",
        size: "medium",
        description: "Elegant gold and black tuxedo pattern",
        stock: 12,
        type: 'guppy'
    }
];

const colors = ['all', 'blue', 'red', 'yellow', 'purple', 'white', 'green', 'black', 'gold', 'multi'];
const genders = ['all', 'male', 'female'];
const sizes = ['all', 'small', 'medium', 'large'];

const Shop = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedColor, setSelectedColor] = React.useState('all');
    const [selectedGender, setSelectedGender] = React.useState('all');
    const [selectedSize, setSelectedSize] = React.useState('all');
    const [particles, setParticles] = React.useState([]);

    React.useEffect(() => {
        // Create floating particles
        const particleCount = 20;
        const newParticles = Array.from({ length: particleCount }, (_, index) => ({
            id: index,
            left: Math.random() * 100 + '%',
            animationDelay: -Math.random() * 15 + 's'
        }));
        setParticles(newParticles);
    }, []);

    const filteredFish = guppyFishData.filter(fish => {
        const matchesSearch = fish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            fish.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesColor = selectedColor === 'all' || fish.color === selectedColor;
        const matchesGender = selectedGender === 'all' || fish.gender === selectedGender;
        const matchesSize = selectedSize === 'all' || fish.size === selectedSize;

        return matchesSearch && matchesColor && matchesGender && matchesSize;
    });

    return (
        <div className="shop-container">
            {/* Floating particles */}
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        left: particle.left,
                        animationDelay: particle.animationDelay
                    }}
                />
            ))}
            {/* Animated Background */}
            <div className="fish-container">
                <div className="fish"></div>
                <div className="fish"></div>
                <div className="fish"></div>
                <div className="fish"></div>
                <div className="fish"></div>
            </div>
            <div className="bubble-container">
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
            </div>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Search and Filter Section */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Search fish"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <InputLabel>Color</InputLabel>
                            <Select
                                value={selectedColor}
                                label="Color"
                                onChange={(e) => setSelectedColor(e.target.value)}
                            >
                                {colors.map(color => (
                                    <MenuItem key={color} value={color}>
                                        {color.charAt(0).toUpperCase() + color.slice(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                value={selectedGender}
                                label="Gender"
                                onChange={(e) => setSelectedGender(e.target.value)}
                            >
                                {genders.map(gender => (
                                    <MenuItem key={gender} value={gender}>
                                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <InputLabel>Size</InputLabel>
                            <Select
                                value={selectedSize}
                                label="Size"
                                onChange={(e) => setSelectedSize(e.target.value)}
                            >
                                {sizes.map(size => (
                                    <MenuItem key={size} value={size}>
                                        {size.charAt(0).toUpperCase() + size.slice(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Fish Grid */}
                <Grid container spacing={4}>
                    {filteredFish.map((fish) => (
                        <Grid item key={fish.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={fish.imageUrl}
                                    alt={fish.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        {fish.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {fish.description}
                                    </Typography>
                                    <Typography variant="h6" color="text.primary" gutterBottom>
                                        ₹{fish.price.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Stock: {fish.stock}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <AddToCartButton
                                        item={{
                                            id: fish.id,
                                            name: fish.name,
                                            price: fish.price,
                                            imageUrl: fish.imageUrl,
                                            type: 'fish'
                                        }}
                                    />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Shop;
