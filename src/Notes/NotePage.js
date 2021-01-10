import React from 'react';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext';


class NotePage extends React.Component {
    static contextType = NotesContext;

    handleGoBack = () => {
        this.props.history.goBack()
    }

    render(){
        const {folders=[], notes=[]} = this.context
       
        let note = notes.find(n => n.id.toString() === this.props.match.params.noteId
        ) || {}
       
        let folder = folders.filter(f => f.id.toString() === note.folder_id
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
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
}


export default NotePage