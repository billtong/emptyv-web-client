import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {MessageTalker} from './MessageTalker';
import {MessageUser} from './MessageUser';

const Wrapper = styled.ul`
  height: 25rem;
  overflow-y: auto;
  overflow-x: hidden;
	padding-inline-start: 0;
`;

const MsgWrapper = styled.li`
  display: block;
`;

class MessageBoard extends React.Component {
    render() {
        const MsgList = this.props.msgListSelected && this.props.msgListSelected.length > 0 ? (
            this.props.msgListSelected.map((value, index) => {
                return value.isSend ? (
                    <MsgWrapper>
                        <MessageUser userInfo={value.userInfo} msg={value}/>
                    </MsgWrapper>
                ) : (
                    <MsgWrapper>
                        <MessageTalker talkerInfo={value.talkerInfo} msg={value}/>
                    </MsgWrapper>
                );
            })
        ) : null;
        return (
            <Wrapper id="style-scroll">
                {MsgList}
            </Wrapper>
        );
    }
}

export default MessageBoard;

MessageBoard.propTypes = {
    msgListSelected: PropTypes.arrayOf(PropTypes.object),
};

MessageBoard.defaultProps = {
    msgListSelected: [],
};
