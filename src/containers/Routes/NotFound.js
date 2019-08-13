import React, {Component, Fragment} from 'react';
import history from "../../utils/history";
import {NavLink, withRouter} from "react-router-dom";
import Text from "../../components/accessories/Text";
import XHelmet from "../../components/accessories/XHelmet";

class NotFound extends Component {
    state = {
        time: 5
    };

    componentDidMount = () => {
        const set = setInterval(() => {
            const newTime = this.state.time;
            this.setState({
                time: newTime - 1
            });
            if(this.state.time === 0) {
                history.push("/");
                clearInterval(set);
            }
        }, 1000);
    }

    render() {
        return (
            <Fragment>
                <XHelmet title={"Not Found"}/>
                <h3><Text id={"notfound"}/></h3>
                <NavLink to={"/"}>Go Home</NavLink>
                <div>{this.state.time}</div>
                <br/>
            </Fragment>
        )
    }
}

export default withRouter(NotFound)
