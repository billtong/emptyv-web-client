import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import "./UserInfo.css";

class UserInfo extends Component {
    render = () => {
        return (
            <Fragment>
                <table className="userInfo-table" border="1">
                    <tr>
                        <td className="title-td">Bio</td>
                        <td className="text-td">
                            <p className="bio-text">
                                {this.props.user.profile && this.props.user.profile.description}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td className="title-td">Location</td>
                        <td className="text-td">{this.props.user.profile && this.props.user.profile.location}</td>
                    </tr>
                    <tr>
                        <td className="title-td">Website</td>
                        <td className="text-td">{this.props.user.profile && this.props.user.profile.website}</td>
                    </tr>
                </table>
            </Fragment>
        );
    }
}

export default UserInfo;

UserInfo.propsTypes = {
    user: PropTypes.object,
};

UserInfo.defaultProps = {
    user: {
        system: {
            reg: "",
            active: false,
            status: "",
            point: 0,
            achievement: []
        },
        profile: {
            avatar: "",
            name: "",
            banner: "",
            description: "",
            location: "",
            website: ""
        }
    }
};
