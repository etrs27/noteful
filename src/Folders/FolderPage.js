import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import NotesList from '../Notes/NotesList';
import NotesContext from '../NotesContext';


class FolderPage extends React.Component {
    static contextType = NotesContext;

    render(){
        const folders = this.context.folders.find(f =>
            f.id.toString() === this.props.match.params.folderId
        ) || {}

        const notes = this.context.notes.filter(n =>
            n.folder_id.toString() === this.props.match.params.folderId
        ) || {}
        
        return (
            <>
            <div className="FolderPage">
                <h2>{folders.name}</h2>
                <br/>
                <span className="FolderPage_backButton">
                    <Link to={'/'}>
                        Back
                    </Link>
                </span>
            </div>
            <div className="FolderPage_noteList">
                <NotesList notes={notes}/>
            </div>
            </>
        )
    }
}

FolderPage.propTypes = {
    match: PropTypes.object.isRequired
}


export default FolderPage