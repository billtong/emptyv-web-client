import React, {Component} from 'react';
import Message from "../../components/accessories/Message/Message.js";

class MessagePage extends Component {
	render = () => {
		return (
			<div>
				<Message defaultTalker={this.props.location.state} />
			</div>
		);
	}
}

export default MessagePage;
