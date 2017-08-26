import React,{Component,PropTypes} from 'react';
import _ from 'lodash';
import {reduxForm } from 'redux-form';
import {createPost} from '../actions/index';
import {Link} from 'react-router';

const FIELDS = {
    'title' : {
        'type':'input',
        'label':'Title'
    },
    'categories':{
        'type':'input',
        'label':'Categories'
    },
    'content':{
        'type':'textarea',
        'label':'Content'
    }
}

class PostsNew extends Component {
    static contextTypes = {
        router : PropTypes.object
    }
    sumbmitPost(props) {
        this.props.createPost(props)
        .then(() => {
            this.context.router.push("/");
        });
    }
    renderField(fieldConfig,field) {
        const fieldHelper = this.props.fields[field];
        return (
            <div key={field} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
                <label>{fieldConfig.label}</label>
                <fieldConfig.type type="text" className="form-control" {...fieldHelper}/>  
                <div className="text-help">
                    {fieldHelper.touched ? fieldHelper.error: ""}
                </div> 
            </div>
        );
    }
    render() {
        const {fields:{title,categories,content},handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit((props)=> this.sumbmitPost(props))}> 
                <h3> Create New Post </h3>
               {_.map(FIELDS,(fieldConfig,field) => this.renderField(fieldConfig,field))}
               {/*{_.map(FIELDS,this.renderField.bind(this))}*/}
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}
function validate(values) {
    const errors = {};
     
    _.each(FIELDS,(type,field) => {
        if (!values[field]) {
            errors[field] = `Enter a ${field}`;
        }
    });

    return errors;
}
export default reduxForm({
    form: 'PostNewForm',
    fields:_.keys(FIELDS),
    validate:validate
},null,{createPost})(PostsNew);


