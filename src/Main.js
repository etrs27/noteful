import React from 'react';
import FolderList from './Folders/FolderList';
import NotesList from './Notes/NotesList';
import NotesContext from './NotesContext'


class Main extends React.Component {
    static contextType = NotesContext;

    render() {
        const { folders = [], notes = [] } = this.context

        return (
            <>
                <nav className='Nav_Folders'>
                    <FolderList folders={folders} />
                </nav>
                <div className='Main_Page'>
                    <span className='Main_Page-Notes'>
                        <NotesList notes={notes} />
                    </span>
                </div>
            </>
        )
    }
}


export default Main