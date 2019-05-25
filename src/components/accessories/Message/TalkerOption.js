import React, {Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {grey, widthLeft} from "./style";

const UnSelectedOption = styled.div`
  width: ${widthLeft};
  height: 3.5rem;
  background: ${grey};
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px black solid;
`;

const SelectedOption = styled.div`
  width: ${widthLeft};
  height: 3.5rem;
  background: ${grey};
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px black solid;
  font-weight: 600;
`;

const UserText = styled.div`
  overflow: hidden;
  text-overflow: unset;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const TalkerOption = (props) => {

  const option = (
    <Fragment>
	    <div className="user-avatar">
		    <img src={props.userInfo.userIcon} height="20px" width="20px" />
	    </div>
      <UserText>{props.userInfo.userName}</UserText>
	    <div className="msg-text">{props.lastMsg}</div>
    </Fragment>
  );

  return props.isSelected ? (
    <SelectedOption>
      {option}
    </SelectedOption>
  ) : (
    <UnSelectedOption>
      {option}
    </UnSelectedOption>
  );
};

TalkerOption.propTypes = {
  isSelected: PropTypes.bool,
  userInfo: PropTypes.object,
  lastMsg: PropTypes.string,
};

TalkerOption.defaultProps = {
	isSelected: false,
	userInfo: null,
	lastMsg: "",
};

