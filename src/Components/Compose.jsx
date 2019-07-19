import React from 'react';

class Compose extends React.Component {
    state ={
        subject: "",
        body: ""
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit =(e) => {
        e.preventDefault()
        this.props.createMessage({
            subject: this.state.subject,
            body: this.state.body
        })
        this.setState({
            subject: '',
            body: ''
        })
    }

    render() {
        return (
            <form className="form-horizontal well" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h4>Compose Message</h4>
                    </div>
                </div>
                <div className="form-group">
                    <label for="subject" className="col-sm-2 control-label">Subject</label>
                    <div className="col-sm-8">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="subject" 
                            placeholder="Enter a subject" 
                            name="subject" 
                            onChange={this.handleChange}
                            value={this.state.subject}
                        />
                    </div>
                </div>
                    <div className="form-group">
                        <label for="body" className="col-sm-2 control-label">Body</label>
                        <div className="col-sm-8">
                            <textarea 
                                name="body" 
                                id="body" 
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.body}
                            ></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-2">
                            <input type="submit" value="Send" className="btn btn-primary" />
                        </div>
                    </div>
            </form>
        
        )
    }
}

export default Compose;