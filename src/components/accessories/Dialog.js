import styled from "styled-components";
import {Fragment} from "react";
import React from "react";
import Text from "./Text";
import PropTypes from "prop-types";


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

const DialogTitle = styled.div`
	padding-left: 3.5rem;
`;
const DialogClose = styled.div`
	cursor: pointer;
	font-size: 1.5rem;
`;

const Form = styled.table`
	color: black;
	opacity: 0.8;
	max-width: 20rem;
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
					<tbody>
						<tr>
							<th>
								<DialogTitle>
									<Text id={props.titleTextId}/>
								</DialogTitle>
							</th>
							<th>
								<DialogClose><span onClick={props.event}>&times;</span></DialogClose>
							</th>
						</tr>
						{props.children}
					</tbody>
				</Form>
			</Wrapper>
		</Fragment>
	);
};

Dialog.propTypes = {
	titleTextId: PropTypes.string,
	event: PropTypes.func,
};

Dialog.defaultProps = {
	titleTextId: "undefined",
	event: undefined,
};

