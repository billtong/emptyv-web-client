import React, {Component} from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	user-select: none;
`;

const Wrapper = styled.ul`
	margin-block-start: 0;
	margin-block-end: 0;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	padding-inline-start: 1rem;
`;

const Cell = styled.li`
	display: inline-block;
	cursor: pointer;
	text-align: center;
`;

const SelectedCell = styled.li`
	color: red;
	display: inline-block;
	cursor: pointer;
	text-align: center;
`;

class Pagination extends Component {
    handleCellClick = (e, value) => {
        e.preventDefault();
        if (value >= 1 && value <= this.props.total) {
            this.props.passFatherState(value);
        }
    };

    generateOffsetNum = () => {
        const {total, curr, cellNum} = this.props;
        const threshold = Math.floor(cellNum / 2);
        if (total <= cellNum || (total > cellNum && curr <= (cellNum / 2))) {
            return 1;
        }
        if (total > cellNum && curr > threshold && (total - curr) > threshold) {
            return curr - threshold;
        }
        if (total > cellNum && (total - curr) <= threshold) {
            return total - cellNum + 1;
        }
    };

    render = () => {
        const startNum = this.generateOffsetNum();
        const cells = [...Array(this.props.total > this.props.cellNum ? this.props.cellNum : this.props.total)].map((item, index) => {
                const value = startNum + index;
                if (value === this.props.curr) {
                    return <SelectedCell key={index}> {value} </SelectedCell>
                }
                return <Cell key={index} onClick={e => {
                    this.handleCellClick(e, value)
                }}> {value} </Cell>
            }
        );
        return (
            <Container>
                <Wrapper>
                    <Cell onClick={e => {
                        this.handleCellClick(e, this.props.curr - 1)
                    }}>{"<"}</Cell>
                    {cells}
                    <Cell onClick={e => {
                        this.handleCellClick(e, this.props.curr + 1)
                    }}>{">"}</Cell>
                </Wrapper>
            </Container>
        );
    };
}

Pagination.propTypes = {
    total: PropTypes.number,
    curr: PropTypes.number,
    cellNum: PropTypes.number,
    passFatherState: PropTypes.func
};

Pagination.defaultProps = {
    total: 1,
    curr: 1,
    cellNum: 7,
    passFatherState: undefined
};

export default Pagination;




