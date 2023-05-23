import React, { Component } from "react";

export default class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: ''
        }
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const user = {
                        username: this.state.username
                    }
                    console.log(user)
                    this.setState({ username: '' })
                }}>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            onChange={(e) => {
                                this.setState({
                                    username: e.currentTarget.value
                                })
                            }}
                            value={this.state.username}
                        />
                    </div>

                    <div className="form-group mt-3">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}