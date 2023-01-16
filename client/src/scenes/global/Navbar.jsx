import React from 'react'
import {useDispatch ,useSelector} from 'react-redux';
import { Badge, Box, IconButton} from '@mui/material';
import {
    PersonOutlined,
    ShoppingBagOutlined,
    SearchOutlined,
    MenuOutlined
} from '@mui/icons-material';
import {useNavigate } from 'react-router-dom';
import { shades } from "../../theme";
import { setIsCartOpen } from '../../state';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);


  return 
  // outerbox
  <Box 
    display= 'flex'
    alignItems= "center"
    width="100%"
    backgroundColor= "rgba(255, 255, 255, 0.95)"
    color = "black"
    position="fixed"
    top="0"
    left="0"
    zIndex="1"
    > 
    {/* inner box */}
    <Box
    width= "80%"
    margin = "auto"
    display= "flex"
    justifyContent={ "space-between"}
    alignItems= "center"
    >
      <Box onClick ={() => navigate("/")}
      sx={{'&:hover': {cursor: 'pointer'}}}
      color= {shades.secondary[500]}
      >
        Melang
      </Box>
{/* /icons */}
      <Box display= "flex"
      justifyContent="space-between"
      columnGap= "20px"
      zIndex="2"
      >
        <IconButton sx = {{color: "black"}}>
          <SearchOutlined />
          </IconButton>
          <IconButton sx = {{color: "black"}}>
          <PersonOutlined />
          </IconButton>

          <Badge
          badgeContent = {cart.length}
          color="secondary"
          invisible = {cart.length === 0}
          sx={{
            '& .MuiBadge-badge': {
              top: 5,
              right: 5,
              padding: '0 4px',
              height: "14px",
              minWidth: "13px"
            },
          }}
          >
            <IconButton 
            onClick={() => dispatch(setIsCartOpen({}))}
            sx = {{color: "black"}}>
            <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx = {{color: "black"}}>
          <MenuOutlined />
          </IconButton>
        </Box>
    </Box>
  </Box>
}

export default Navbar
