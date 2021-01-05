import React from 'react';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext';


class NotePage extends React.Component {
    static contextType = NotesContext;

    handleGoBack = () => {
        this.props.history.goBack()
    }

    render(){
        const note = this.context.notes.find(n =>
            n.id === this.props.match.params.noteId
        ) || {}
    
        const folder = this.context.folders.find(f =>
            f.id === note.folderId
        ) || {}    
        
        return (
            <>
            <div className="NotePage_folder">
                <h2>{folder.name}</h2>
            </div>
            <div className="NotePage">
                <h3>{note.name}</h3>
                {note.content}
                <br/>
                <br/>
                <span className="NotePage_backButton">
                    <button 
                        type="button"
                        onClick={this.handleGoBack}>
                        Back
                    </button>
                </span>
                <br/>
                {note.modified}
            </div>
            </>
        )
    }
    
}

NotePage.propTypes = {
    history: PropTypes.func.isRequired,
    match: PropTypes.string.isRequired
}


export default NotePage