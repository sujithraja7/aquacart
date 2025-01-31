import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Typography,
    Box,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Skeleton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from '../components/ProductCard';
import '../styles/aquaAnimations.css';

const categories = ['All', 'Food', 'Toys', 'Clothing', 'Grooming', 'Health', 'Other'];
const petTypes = ['All', 'Dog', 'Cat', 'Fish', 'Bird', 'Small Animal'];

// Sample accessories data (replace with API call later)
const sampleAccessories = [
    {
        _id: '1',
        name: 'Premium Pet Food',
        description: 'High-quality nutrition for your pets',
        price: 2499, // converted from 29.99 USD to INR
        category: 'food',
        brand: 'PetNutrition',
        imageUrl: 'https://th.bing.com/th/id/OIP.w8nFFe2n1EfIOKGB-l38jAHaHa?rs=1&pid=ImgDetMain',
        stock: 50,
        petType: ['fish'],
        rating: 4.5,
        reviews: 128
    },
    {
        _id: '2',
        name: 'Interactive Pet Toy',
        description: 'Keep your pet entertained for hours',
        price: 1659, // converted from 19.99 USD to INR
        category: 'toys',
        brand: 'PetPlay',
        imageUrl: 'https://stoysnetcdn.com/tgtg/tgtg_ho18_9060/tgtg_ho18_9060.jpg',
        stock: 30,
        petType: ['fish'],
        rating: 4.8,
        reviews: 95
    },
    {
        _id: '3',
        name: 'Pet Grooming Brush',
        description: 'Professional grooming at home',
        price: 2075, // converted from 24.99 USD to INR
        category: 'grooming',
        brand: 'PetCare',
        imageUrl:'https://th.bing.com/th/id/OIP.fna0E0DajPv89oNQDk8DEgHaFc?rs=1&pid=ImgDetMain' ,
        stock: 45,
        petType: ['fish'],
        rating: 4.2,
        reviews: 75
    },
    {
        _id: '4',
        name: 'Aquarium Filter System',
        description: 'Advanced filtration for crystal clear water',
        price: 4149, // converted from 49.99 USD to INR
        category: 'health',
        brand: 'AquaClear',
        imageUrl: 'https://ae01.alicdn.com/kf/HTB1DIh.Q7voK1RjSZFwq6AiCFXac/Aquarium-filter-mute-three-in-one-built-in-filter-for-aquarium-filtration-fish-tank-filter-MultiFunction.jpg',
        stock: 25,
        petType: ['fish'],
        rating: 4.7,
        reviews: 203
    },
    {
        _id: '5',
        name: 'Bird Cage Swing Set',
        description: 'Colorful and entertaining swing set for birds',
        price: 1329, // converted from 15.99 USD to INR
        category: 'toys',
        brand: 'BirdJoy',
        imageUrl: 'https://i5.walmartimages.com/asr/1259000e-b57b-45d3-a824-c06101f5b0ea.97b0ce20040ba7b4c95ec5b9375d8e54.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
        stock: 60,
        petType: ['bird'],
        rating: 4.4,
        reviews: 89
    },
    {
        _id: '6',
        name: 'Cozy Pet Bed',
        description: 'Soft and comfortable bed for your furry friend',
        price: 2899, // converted from 34.99 USD to INR
        category: 'other',
        brand: 'PetComfort',
        imageUrl: 'https://th.bing.com/th/id/OIP.ycvX8L7gkWEzHkNjaOf3AgHaGi?rs=1&pid=ImgDetMain',
        stock: 40,
        petType: ['dog', 'cat'],
        rating: 4.6,
        reviews: 156
    },
    {
        _id: '7',
        name: 'Small Animal Habitat',
        description: 'Spacious cage for small pets with multiple levels',
        price: 6639, // converted from 79.99 USD to INR
        category: 'other',
        brand: 'SmallPetHome',
        imageUrl: 'https://th.bing.com/th/id/R.64f5e22e408501ac33f929decd3c0daa?rik=iCF5LTeMoLlPRA&riu=http%3a%2f%2fs7d1.scene7.com%2fis%2fimage%2fPETCO%2f2355340-right-1&ehk=nxQokRK24mFAOF%2f%2bPqN1qfzlufwb66md%2buSkupI392o%3d&risl=&pid=ImgRaw&r=0',
        stock: 15,
        petType: ['small_animal'],
        rating: 4.3,
        reviews: 67
    },
    {
        _id: '8',
        name: 'Fish Food Flakes',
        description: 'Nutritious daily food for all tropical fish',
        price: 1079, // converted from 12.99 USD to INR
        category: 'food',
        brand: 'AquaNutrition',
        imageUrl: 'https://www.hepper.com/wp-content/uploads/2022/09/pile-of-fish-food-flakes-for-tropical-fish-4.jpg',
        stock: 100,
        petType: ['fish'],
        rating: 4.5,
        reviews: 234
    },
    {
        _id: '9',
        name: 'Pet Dental Care Kit',
        description: 'Complete dental hygiene set for pets',
        price: 2325, // converted from 27.99 USD to INR
        category: 'health',
        brand: 'PetDental',
        imageUrl: 'https://i.pinimg.com/originals/0a/de/c4/0adec4b14adb6dfc4a9ef58954cd2979.jpg',
        stock: 35,
        petType: ['dog', 'cat'],
        rating: 4.4,
        reviews: 112
    },
    {
        _id: '10',
        name: 'Winter Pet Jacket',
        description: 'Warm and waterproof jacket for cold weather',
        price: 2739, // converted from 32.99 USD to INR
        category: 'clothing',
        brand: 'PetStyle',
        imageUrl: 'https://th.bing.com/th/id/OIP.aKzqQ4yKSIyfXir7pFqIvgAAAA?rs=1&pid=ImgDetMain',
        stock: 55,
        petType: ['dog'],
        rating: 4.7,
        reviews: 178
    },
    {
        _id: '11',
        name: 'Bird Vitamin Supplement',
        description: 'Essential vitamins for bird health',
        price: 1575, // converted from 18.99 USD to INR
        category: 'health',
        brand: 'BirdHealth',
        imageUrl: 'https://5.imimg.com/data5/ECOM/Default/2022/10/IK/FP/KJ/12142841/61fpk1cqqul-sx522-500x500.jpg',
        stock: 70,
        petType: ['bird'],
        rating: 4.6,
        reviews: 92
    },
    {
        _id: '12',
        name: 'Automatic Pet Feeder',
        description: 'Programmable feeder for scheduled meals',
        price: 4979, // converted from 59.99 USD to INR
        category: 'other',
        brand: 'PetTech',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71S3hJGF7dL._SL1500_.jpg',
        stock: 25,
        petType: ['dog', 'cat'],
        rating: 4.8,
        reviews: 245
    }
];

const Accessories = () => {
    const [accessories, setAccessories] = useState(sampleAccessories);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPetType, setSelectedPetType] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                setLoading(true);
                // For now, we're using sample data
                // In a real app, this would be an API call:
                // const response = await fetch('/api/accessories');
                // const data = await response.json();
                // setAccessories(data);
                setAccessories(sampleAccessories);
            } catch (err) {
                console.error('Error fetching accessories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAccessories();
    }, []); // Empty dependency array means this runs once on component mount

    const filteredAccessories = accessories.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to create animated particles
    const createParticles = (count) => {
        return Array.from({ length: count }, (_, i) => {
            const size = Math.random() * 15 + 5;
            const left = Math.random() * 100;
            const delay = Math.random() * 4;
            const duration = Math.random() * 2 + 3;
            
            return (
                <div
                    key={i}
                    className="air-bubble"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${left}%`,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`
                    }}
                />
            );
        });
    };

    return (
        <div className="aqua-background">
            {/* Animated Background Elements */}
            <div className="water-ripple" />
            <div className="light-rays" />
            
            {/* Bubble Particles */}
            <div className="bubble-stream">
                {createParticles(12)}
            </div>

            {/* Main Content */}
            <Container maxWidth="xl" className="aqua-content">
                <Typography variant="h4" gutterBottom sx={{ mb: 4, color: 'white' }}>
                    Pet Accessories
                </Typography>

                <Box sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 2,
                    p: 3,
                    mb: 4,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    className: 'shimmer-card'
                }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Search accessories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        borderRadius: 1,
                                        backgroundColor: 'white',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(0, 0, 0, 0.1)',
                                        }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={selectedCategory}
                                    label="Category"
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: 1,
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(0, 0, 0, 0.1)',
                                        }
                                    }}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Pet Type</InputLabel>
                                <Select
                                    value={selectedPetType}
                                    label="Pet Type"
                                    onChange={(e) => setSelectedPetType(e.target.value)}
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: 1,
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(0, 0, 0, 0.1)',
                                        }
                                    }}
                                >
                                    {petTypes.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container spacing={3}>
                    {loading ? (
                        // Loading skeletons
                        [...Array(8)].map((_, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <Skeleton variant="rectangular" height={400} />
                            </Grid>
                        ))
                    ) : filteredAccessories.length === 0 ? (
                        // No results message
                        <Grid item xs={12}>
                            <Box textAlign="center" py={4}>
                                <Typography variant="h6" color="text.secondary">
                                    No accessories found
                                </Typography>
                            </Box>
                        </Grid>
                    ) : (
                        // Product cards
                        filteredAccessories.map((accessory) => (
                            <Grid item key={accessory._id} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard product={accessory} type="accessory" className="shimmer-card" />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </div>
    );
};

export default Accessories;
