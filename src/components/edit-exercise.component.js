import React, { Component } from "react";
import {useParams} from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios'

class EditExercise extends Component {
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

        axios.get('http://localhost:5000/exercises/'+this.props.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch(err => console.log(err))

        axios.get('http://localhost:5000/users')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username)
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={(e)=>{
                    e.preventDefault();

                    const exercise = {
                        username: this.state.username,
                        description: this.state.description,
                        duration: this.state.duration,
                        date: this.state.date
                    }

                    console.log(exercise)

                    axios.post('http://localhost:5000/exercises/update/'+this.props.params.id, exercise)
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
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default withRouter(EditExercise)