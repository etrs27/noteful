import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext';

export default class Note extends React.Component {
    static contextType = NotesContext;

    static defaultProps = {
        deleteNote: () => {},
    }

    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.text()
                    .then(e => Promise.reject(e))
                return res.text()
            })
            .then(() => {
                this.context.deleteNote(noteId)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        return (
            <>
                <h3 className='Note_title'>
                    <Link to={`/note/${this.props.id}`}>
                        {this.props.name}
                    </Link>
                </h3>
                <button
                    className='Note_deleteButton'
                    type='button'
                    onClick={this.handleClickDelete}>
                    Remove
                </button>
                <br/>
                <span>
                    {this.props.modified}
                </span>
            </>
        )
    }
}

Note.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
}