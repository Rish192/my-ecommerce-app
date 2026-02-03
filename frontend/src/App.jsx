import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Container, Grid, Card, 
  CardMedia, CardContent, IconButton, Badge, Drawer, Box, CssBaseline 
} from '@mui/material';
import { ShoppingCart, AccountCircle, Brightness4, Delete } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import { getProducts } from '../../backend/data';
import home from '/images/home.png';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // useEffect(() => {
  //   getProducts().then(data => setProductList(data));
  // }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://54.86.176.174:5000'
        const response = await fetch(`${API_URL}/api/products`);
        //const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProductList(data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  const theme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light', primary: { main: '#dc143c' } },
  });

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const scrollToSection = (id) => {
    if (id === 'header') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* NAVIGATION */}
      <AppBar position="sticky" sx={{ bgcolor: 'background.paper', color: 'text.primary', height: '8vh', justifyContent: 'center' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: '2vw !important' }}>
          <Typography sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '2.5vw' }}>
            6PP.
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '2vw' }}>
            <Button disableRipple sx={{ color: 'text.primary', fontSize: '1.2vw', '&:hover': {color: 'red', background: 'none'} }} onClick={() => scrollToSection('header')}>Home</Button>
            <Button disableRipple sx={{ color: 'text.primary', fontSize: '1.2vw', '&:hover': {color: 'red', background: 'none'} }} onClick={() => scrollToSection('products')}>Products</Button>
            <Button disableRipple sx={{ color: 'text.primary', fontSize: '1.2vw', '&:hover': {color: 'red', background: 'none'} }} onClick={() => scrollToSection('footer')}>About</Button>
            <Button disableRipple sx={{ color: 'text.primary', fontSize: '1.2vw', '&:hover': {color: 'red', background: 'none'} }} onClick={() => scrollToSection('footer')}>Contact</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: '1vw' }}>
            <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ fontSize: '2vw' }}><Brightness4 /></IconButton>
            <IconButton onClick={() => setIsDrawerOpen(true)}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCart sx={{ fontSize: '2vw' }} />
              </Badge>
            </IconButton>
            <IconButton><AccountCircle sx={{ fontSize: '2vw' }} /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* HERO SECTION */}
      <Box sx={{ 
        height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1vw', px: '5vw', boxSizing: 'border-box',
        overflow: 'hidden',
        background: darkMode ? 'linear-gradient(45deg, #121212, #333)' : 'radial-gradient(#e6ddff, #b4b9dc)'
      }}>
        <Box>
          <Typography sx={{ fontSize: '5vw', fontWeight: 'bold', lineHeight: 1 }}>Live Your Life In</Typography>
          <Typography sx={{ fontSize: '4vw', color: 'primary.main', mb: '2vh' }}>A New Style!</Typography>
          <Typography sx={{ fontSize: '1.2vw', maxWidth: '30vw', mb: '3vh' }}>
            They say first impression is the last impression. Don't wait, Bless yourself with perfect clothing.
          </Typography>
          <Button variant="contained" sx={{ borderRadius: '5vw', px: '3vw', py: '1.5vh', fontSize: '1vw' }}>
            Explore Now →
          </Button>
        </Box>
        
        <Box component="img" src={home} sx={{ 
      height: '100%', // Scales based on section height
      maxWidth: '45vw', 
      objectFit: 'contain',
      filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))' // Replaces your original CSS shadow
    }}/>
      </Box>

      {/* PRODUCTS */}
      <Box id="products" sx={{ py: '10vh' }}>
        <Typography sx={{ 
          fontSize: '3vw', textAlign: 'center', mb: '8vh', 
          borderBottom: '0.5vh solid crimson', width: '20vw', mx: 'auto', pb: '1vh' 
        }}>
          Product
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '2vw', 
            padding: '2vw',
          }}
        >
          {productList.map((product) => (
            <Box 
              key={product._id}
              sx={{ 
                width: '20vw',
                borderRadius: '1vw',
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                bgcolor: 'background.paper',
                transition: '0.3s',
                '&:hover': { transform: 'translateY(-1vh)' }
              }}
            >
              {/* Product Image */}
              <Box 
                component="img" 
                src={product.img} 
                alt={product.name}
                sx={{ 
                  width: '100%', 
                  //height: '45vh', 
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />

              {/* Card Content */}
              <Box sx={{ p: '1.5vw', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.4vw', fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography sx={{ fontSize: '1.2vw', my: '1vh', color: 'text.secondary' }}>
                  ${product.price}
                </Typography>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={() => addToCart(product)}
                  sx={{ 
                    bgcolor: 'primary.main', 
                    fontSize: '0.9vw', 
                    borderRadius: '0.5vw',
                    py: '1vh'
                  }}
                >
                  Add To Cart
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* CART DRAWER */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} sx={{cursor: 'pointer'}}>
        <Box sx={{ width: '25vw', p: '2vw', cursor: 'default' }}>
          <Typography sx={{ fontSize: '2vw', mb: '3vh', fontWeight: 'bold' }}>Your Cart</Typography>
          {cart.map((item, i) => (
            <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '2vh', borderBottom: '0.1vh solid #eee', pb: '1vh' }}>
              <Typography sx={{ fontSize: '1vw' }}>{item.name} - ${item.price}</Typography>
              <IconButton size="small" onClick={() => removeFromCart(i)}><Delete sx={{ fontSize: '1.2vw' }} /></IconButton>
            </Box>
          ))}
          <Typography sx={{ fontSize: '1.5vw', mt: '4vh', fontWeight: 'bold' }}>Total: ${total}</Typography>
        </Box>
      </Drawer>

      {/* FOOTER */}
      <Box id="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: '6vh', mt: '10vh' }}>
        <Container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '2vw', color: 'primary.main', fontWeight: 'bold' }}>6PP.</Typography>
            <Typography sx={{ fontSize: '0.8vw' }}>© 2026 RISH - All Rights Reserved</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '2vw' }}>
            {['Instagram', 'Youtube', 'Facebook'].map(link => (
              <Typography key={link} sx={{ fontSize: '1vw', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                {link}
              </Typography>
            ))}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;