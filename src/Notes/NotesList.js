import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Note from './Note';
import NotesContext from '../NotesContext';
 

class NotesList extends React.Component {
    static contextType = NotesContext
    
    render(){
        let {notes=[]} = this.context
        notes = !this.props.notes ? this.context : this.props.notes
    
        return (
            <>
                <ul className='Notes_list'>
                    {notes.map(note =>
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.name}
                                modified={note.modified}                            
                            />
                        </li>
                    )}
                </ul>
                <br/>
                <div className="Notes_button">
                    <Link to={'/add-note'}>
                        Add Note
                    </Link>
                </div>
            </>
        )
    }
}

NotesList.propTypes = {
    notes: PropTypes.array.isRequired
}

NotesList.defaultProps = {
    notes: []
}


export default NotesList