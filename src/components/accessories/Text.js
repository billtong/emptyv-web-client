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
				<FormattedMessage
					id={this.props.id}
					values={this.props.values}>
					{this.props.children}
				</FormattedMessage>
			</Fragment>
		)
	}
}

Text.propTypes = {
	id: PropTypes.string,
	values: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
};

Text.defaultProps = {
	id: "",
	values: "",
	children: null,
};

export default Text
