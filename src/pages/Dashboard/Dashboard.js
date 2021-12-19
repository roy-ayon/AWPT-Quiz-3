import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Button } from '@mui/material';
import useAuth from '../../Hooks/useAuth';
import CustomerReview from '../CustomerReview/CustomerReview';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    NavLink
} from "react-router-dom";
import DashboaedHome from '../DashboardHome/DashboaedHome';
import Pay from '../Pay/Pay';
import AllProducts from '../AllProducts/AllProducts';
import AddProduct from '../AddProduct/AddProduct';
import Profile from '../Profile/Profile';
import { margin } from '@mui/system';
import WelcomeMsg from '../WelcomeMsg/WelcomeMsg';

const drawerWidth = 200;

function Dashboard(props) {
    const { logOut, admin, manager, owner } = useAuth()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let { path, url } = useRouteMatch();
    console.log(manager);
    const handleDrawerToggle = () => {

        setMobileOpen(!mobileOpen);
    };

    const drawer = (

        <Box sx={{ textAlign: 'center' }}>
            <NavLink style={{ color: 'black', textDecoration: 'none' }} to='/'><Typography variant='h5' sx={{ fontWeight: "medium", my: 2 }}>BHMS</Typography></NavLink>

            <Divider />
            <List sx={{ display: 'flex', flexDirection: 'column', my: 2 }}>
                <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}`}><Button color="inherit">Dashboard</Button></NavLink>

                
                {
                    owner && <Box>

                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}/profile`}><Button color="inherit">Edit Profile</Button></NavLink>
                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}/pay`}><Button color="inherit">Adds Payment </Button></NavLink>
                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}/review`}><Button color="inherit">Reviews</Button></NavLink>
                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}/addProduct`}><Button color="inherit">Post Advertisement</Button></NavLink>

                    </Box>
                }

                {!owner &&
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}/profile`}><Button color="inherit">Edit Profile</Button></NavLink>
                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}/myOrders`}><Button color="inherit">My Booking</Button></NavLink>
                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}/pay`}><Button color="inherit">Payment </Button></NavLink>
                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`${url}/review`}><Button color="inherit">Review</Button></NavLink>
                    </Box>
                }

                <Button style={{ textDecoration: 'none', color: 'Black' }} onClick={logOut}>Logout</Button>
            </List>
        </Box>



    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ backgroundColor: 'black' }}>
                    <IconButton
                        color="secondary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ m: 'auto' }} component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Box>

                    <Switch>
                        <Route exact path={path}>

                            <WelcomeMsg></WelcomeMsg>
                            <AllProducts></AllProducts>
                        </Route>
                        <Route path={`${path}/profile`}>
                            <Profile></Profile>
                        </Route>
                        <Route path={`${path}/review`}>
                            <CustomerReview></CustomerReview>
                        </Route>
                        <Route path={`${path}/addProduct`}>
                            <AddProduct></AddProduct>
                        </Route>
                        <Route path={`${path}/pay`}>
                            <Pay></Pay>
                        </Route>
                    </Switch>
                </Box>

            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
