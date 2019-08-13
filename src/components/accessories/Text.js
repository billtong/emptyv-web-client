import React, {Component, Fragment} from 'react';
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";

/*
如果将text里放入input元素，其ref会丢失，如何解决？？？
*/

class Text extends Component {
    render() {
        return (
            <Fragment>
                <FormattedMessage id={this.props.id}>
                    {this.props.children}
                </FormattedMessage>
            </Fragment>
        )
    }
}

Text.propTypes = {
    id: PropTypes.string,
    children: PropTypes.func
};

Text.defaultProps = {
    id: "",
    children: null,
};

export default Text
