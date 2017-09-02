import React,{Component,PropTypes} from 'react';
import _ from 'lodash';
import {Field,reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions/index';

class PostsNew extends Component {

    renderField(field) {
        const {meta:{touched,error}} = field
        const className = `form-group ${touched && error ? 'has-danger' : ''}`  ;
        return (
            <div className={className}>
                <label>{field.label} </label>
                <input className={"form-control"} 
                       type="text" 
                       {...field.input} />
                <div className="text-help">
                    {field.meta.touched? field.meta.error : ''}
                </div>
            </div>
        );
    }
    onSubmit(values) {
        this.props.createPost(values,() => {
            this.props.history.push("/");
        });
    }
    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field  
                    name="title"
                    label="Title" 
                    component={this.renderField}/>
                <Field  
                    name="categories"
                    label="Categories" 
                    component={this.renderField}/>
                <Field  
                    name="content"
                    label="Post Content" 
                    component={this.renderField}/>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = " Pleae enter Title";
    }
    if (!values.categories) {
        errors.categories = " Pleae enter Categories";
    }
    if (!values.content) {
        errors.content = " Pleae enter Content";
    }

    return errors;
}

export default reduxForm({
    form: "PostNewForm",
    validate
})(
    connect(null,{ createPost})(PostsNew)
);