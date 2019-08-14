import React, {Fragment} from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import Text from "./Text";

const Button = styled.div`
	-webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-right: 1rem;
    cursor: pointer;
    display: inline-block;
  	&:hover {
    	color: grey;
  	}
`;

export const NavItem = (props) => (
    <Fragment>
        <Button onClick={props.event}>
            <Text id={props.id}/>
        </Button>
    </Fragment>
);


NavItem.propTypes = {
    event: PropTypes.func,
    id: PropTypes.string,
};

NavItem.defaultProps = {
    event: undefined,
    id: "undefined"
};
