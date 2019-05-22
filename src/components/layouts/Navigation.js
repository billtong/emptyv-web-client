import React, { Fragment } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import Text from "../accessories/Text";

const Button = styled.td`
  padding-right: 1rem;
  cursor: pointer;
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
    id: "undefined",
};
