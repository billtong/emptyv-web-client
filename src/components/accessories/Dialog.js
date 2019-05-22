import styled from "styled-components";
import {Fragment} from "react";
import React from "react";

const Wrapper = styled.div`
	background: rgba(0, 0, 0, 0.65);
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 10;
	padding-top: 10rem;
	display: flex;
	justify-content: center;
}
`;

const Form = styled.table`
	color: black;
	opacity: 0.8;
	max-width: 50rem;
	width: 100%;  
	background-color: #fff;
	background-clip: padding-box;
	border-radius: .3rem;
`;

export const Dialog = (props) => {
	return (
		<Fragment>
			<Wrapper>
				<Form>
					{props.children}
				</Form>
			</Wrapper>
		</Fragment>
	);
};
