import React,{useEffect,useState} from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Box,Typography,useMediaQuery } from '@mui/material'
import Item from '../../components/Item'
import {useDispatch, useSelector} from 'react-redux'
import { setItems } from '../../state'

const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [value, setValue] = useState("all");
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() 
  {
    const items = await fetch(
    "http://localhost:1337/api/items?populate=image",
    {method : "GET"}
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const topItems = items.filter(
        (item) => item.attributes.category === "top"
    );
    const newItems = items.filter(
        (item) => item.attributes.category === "new"
    );
    const bestItems = items.filter(
        (item) => item.attributes.category === "best"
    );


    return (
        <Box width="80%" margin="80px auto">
          <Typography variant="h3" textAlign="center">
            Our Featured <b>Products</b>
          </Typography>
          <Tabs
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
            sx={{
              m: "25px",
              "& .MuiTabs-flexContainer": {
                flexWrap: "wrap",
              },
            }}
          >
            <Tab label="ALL" value="all" />
            <Tab label="NEW ARRIVALS" value="newArrivals" />
            <Tab label="BEST SELLERS" value="bestSellers" />
            <Tab label="TOP RATED" value="topRated" />
          </Tabs>
          <Box
            margin="0 auto"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, 300px)"
            justifyContent="space-around"
            rowGap="20px"
            columnGap="1.33%"
          >
            {value === "all" &&
              items.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
              ))}
            {value === "newArrivals" &&
              newItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
              ))}
            {value === "bestSellers" &&
              bestItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
              ))}
            {value === "topRated" &&
              topItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
              ))}
          </Box>
        </Box>
      );
    };
    
    export default ShoppingList;