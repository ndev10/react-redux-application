import React , {Component} from 'react';
import {connect} from 'react-redux';

class BookDetail extends Component {
   
    render () {
        if(!this.props.book) {
            return <div> Please click on book to start </div>
        }
        return (
           <h3> <div> {this.props.book.title} </div></h3>
        );
    }
}

function mapStateToProps(state) {
    return {
        book:state.activeBook
    }
}

export default connect(mapStateToProps)(BookDetail);