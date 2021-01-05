import React from 'react';

const NotesContext = React.createContext({
    notes: [],
    folders: [],
    addNote: ()=> {},
    addFolder: ()=> {},
    deleteNote: ()=> {},
})


export default NotesContext