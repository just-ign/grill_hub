import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Logo from "./logo";
import Spacer from "./spacer";
import { setCart } from "../../store/actions/orderActions";
import { logout } from "../../store/actions/authActions";

const Header = (props) => {
  const [anchorEl, setAncherEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const history = useHistory();
  const { setCart } = props;

  useEffect(() => {
    setCart();
  }, [setCart]);

  const handleAccountMenu = (mode, event) => {
    if (mode === 0) {
      setAncherEl(null);
    } else {
      setAncherEl(event.currentTarget);
    }
  };

  const menuId = "account-menu";
  const accountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      id={menuId}
      open={isMenuOpen}
      onClose={() => handleAccountMenu(0)}
    >
      <MenuItem onClick={() => history.push("/profile")}>Profile</MenuItem>
      <MenuItem onClick={props.logout}>Logout</MenuItem>
    </Menu>
  );
  return (
    <AppBar position="static" variant="outlined" color="transparent">
      <Toolbar dense="true">
        <Logo />
        <Spacer h={20} />
        <Button variant="outlined" onClick={() => history.push("/home")}>
          Menu
        </Button>
        <div className="grow" />
        <IconButton onClick={() => history.push("/cart")}>
          <Badge badgeContent={props.inCart} color="secondary">
            <ShoppingCartOutlinedIcon color="secondary" />
          </Badge>
        </IconButton>
        <Spacer h={10} />
        <Button
          variant="outlined"
          onClick={(event) => handleAccountMenu(1, event)}
        >
          {`${props.user.fname} ${props.user.lname}`}
        </Button>
      </Toolbar>
      {accountMenu}
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  inCart: state.order.inCart,
});

export default connect(mapStateToProps, { setCart, logout })(Header);
