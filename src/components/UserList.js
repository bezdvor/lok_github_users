import React from "react";
import {connect} from "react-redux";
import {fetchUsers} from "../actions/userAction";
import Wrapper from '../styledComponents/Wrapper';
import MyUl from '../styledComponents/MyUl';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: false,
            error: null
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchUsers());
    }


    render() {
        const {error, loading, users} = this.props;

        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <Wrapper>
                <MyUl>
                    {users.map(user => (
                        <li key={user.id}>
                            <img src={user.avatar_url} alt="#"/>
                            <p>{user.login}</p></li>
                    ))}
                </MyUl>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users.items,
    loading: state.users.loading,
    error: state.users.error
});

export default connect(mapStateToProps)(UserList);
