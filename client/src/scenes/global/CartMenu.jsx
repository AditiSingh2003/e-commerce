import {Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades} from "../../theme";
import{
    setIsCartOpen,
    removeFromCart,
    increaseCount,
    decreaseCount,
} from "../../state";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const isCartOpen = useSelector(state => state.cart.isCartOpen);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.attribute.price;
    }, 0);

    return (
        <Box
        display = {isCartOpen ? "block" : "none"}
        position="fixed"
        backgroundColor="rgba(0, 0, 0, 0.4)"
        zIndex={10}
        width="100%"
        left = "0"
        height  = "100%"
        top = "0"
        overflow="auto"
        >
            {/* modal */}
            <Box
            position="fixed"
            right ="0"
            bottom = "0"
            width = "max(400px, 30%)"
            height = "100%"
            backgroundColor = "white"
            >
                {/* header */}
                <Box
                padding="30px"
                overflow="auto"
                height="100%"
                >
                    <FlexBox mb= "15px">
                        <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                            <CloseIcon />
                        </IconButton>
                    </FlexBox>

                    {/* cart items */}
                    <Box>
                        {cart.map((item )=> (
                            <Box key={`${item.attribute.name} - ${item.id}`}>
                                <FlexBox p="15px 0">
                                    <Box flex = "1 1 40%">
                                        <img 
                                        src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                        alt ={item?.name}
                                        width="123px"
                                        height="164px"/>
                                    </Box>
                                    <Box flex="1 1 60%" >
                                        <FlexBox mb="5px">
                                            <Typography>
                                            {item.attribute.name}
                                            </Typography>
                                            <IconButton onClick={() => dispatch(removeFromCart({id: item.id}))}>
                                                <CloseIcon />
                                            </IconButton>
                                        </FlexBox>
                                        <Typography>{item.attributes.shortDescription}</Typography>
                                        <FlexBox m="15px 0">
                                            <Box
                                            display="flex"
                                            alignItems="center"
                                            border = {`1.5px solid ${shades.secondary[500]}`}
                                            >
                                                <IconButton onClick={() => dispatch(decreaseCount({id: item.id}))}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography>{item.count}</Typography>
                                                <IconButton onClick={() => dispatch(increaseCount({id: item.id}))}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                              {/* price */}
                                            <Typography fontWeight="bold">
                                                ${item.attribute.price}
                                            </Typography>

                                        </FlexBox>

                                    </Box>
                                </FlexBox>
                                <Divider />
                            </Box>
                        ))}
                    </Box>

                    {/* actions */}
                    <Box m= "20px 0">
                        <FlexBox m="20px 0">
                            <Typography fontWeight="bold">TOTAL</Typography>
                            <Typography fontWeight="bold">${totalPrice}</Typography>
                        </FlexBox>
                        <Button
                        sx={{
                            color: "white",
                            backgroundColor: shades.primary[400],
                            minWidth: "100%",
                            padding: "20px 40px",
                            m: "20px 0"
                        }}
                        onClick={() => {
                            navigate("/checkout");
                            dispatch(setIsCartOpen({}));
                        }}
                        >
                            CHECKOUT
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};

export default CartMenu;