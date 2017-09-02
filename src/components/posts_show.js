import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost,deletePost} from '../actions/index';
import {Link} from 'react-router-dom'

class PostsShow extends Component {

    componentWillMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.match.params.id,() => {
            this.props.history.push("/");
        });
    }

    render() {
        const {post} = this.props;
        if(!post) {
            return <div>Loading..</div>
        }
        return (
                <div> 
                    <Link to="/">Back </Link>
                    <button onClick={() => this.onDeleteClick()} className="btn btn-danger pull-xs-right">
                        Delete Post
                    </button>
                    <h3>{post.title}</h3>
                    <h6>Categories {post.categories}</h6>
                    <p>{post.content}</p>
                </div>
            );
    }
}

function mapStateToProps(state,ownProps) {
    return {post:state.posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchPost,deletePost})(PostsShow);