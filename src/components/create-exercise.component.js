import React, { Component } from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

export default class CreateExercise extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={(e)=>{
                    e.preventDefault();

                    const exercise = {
                        username: this.state.username,
                        description: this.state.description,
                        duration: this.state.duration,
                        date: this.state.date
                    }

                    console.log(exercise)

                    axios.post('http://localhost:5000/exercises/add', exercise)
                        .then(res => console.log(res.data))

                    window.location = '/'
                }}>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <select
                            required
                            className="form-control"
                            id="username"
                            value={this.state.username}
                            name="username"
                            onChange={(e) => {
                                this.setState({
                                    username: e.currentTarget.value
                                })
                            }}>
                            {this.state.users.map(function (user) {
                                return <option
                                    key={user}
                                    value={user}>
                                    {user}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            onChange={(e) => {
                                this.setState({
                                    description: e.currentTarget.value
                                })
                            }}
                            value={this.state.description}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Duration (In minutes): </label>
                        <input type="text"
                            className="form-control"
                            id="duration"
                            name="duration"
                            onChange={(e) => {
                                this.setState({
                                    duration: e.currentTarget.value
                                })
                            }}
                            value={this.state.duration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={(date) => {
                                    this.setState({
                                        date: date
                                    })
                                }}
                            />
                        </div>
                    </div>

                    <div className="form-group mt-3">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}