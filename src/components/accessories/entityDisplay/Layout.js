import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    @media screen and (max-width: 1500px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media screen and (max-width: 700px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 450px) {
        grid-template-columns: 1fr;
    }
`;

const VertiList = styled.div`
    display: block;
`;

const HoriList = styled.div`
    display: inline-block;
`;

export const Layout = (props) => {
    switch(props.layout) {
        case "grid":
            return (
                <Grid>
                    {props.children}
                </Grid>
            );
        case "verti-list":
            return(
                <VertiList>
                    {props.children}
                </VertiList>
            );
        case "hori-list":
            return (
                <HoriList>
                    {props.children}
                </HoriList>
            );
        default:
            break;
    }
};

Layout.propTypes = {
    layout: PropTypes.string,
};

Layout.defaultProps = {
    layout: "grid",
};
