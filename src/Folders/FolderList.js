import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import NotesContext from '../NotesContext';


class FolderList extends React.Component {
    static contextType = NotesContext;
    
    render(){
        const {folders=[], notes=[]} = this.context

        const noteCount = (notes=[], folderId) => 
        notes.filter(note => 
        note.folderId === folderId).length   

        return (
            <>
                <div>
                    <ul className="Folders_list">
                        {folders.map(folder =>                           
                            <li key={folder.id}>
                                <NavLink to={`/folder/${folder.id}`}>
                                    {folder.name} - {noteCount(notes, folder.id)}
                                </NavLink>                                
                            </li>                      
                        )}
                    </ul>
                </div>
                <br/>                
                <div className="Folders_button">
                    <Link to={'/add-folder'}>
                        Add Folder
                    </Link>
                </div>
            </>
        )
    }
}

FolderList.propTypes = {
    folders: PropTypes.array.isRequired
}

FolderList.defaultProps = {
    folders: []
}


export default FolderList