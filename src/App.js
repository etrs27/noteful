import React from 'react';
import { Route, Switch } from 'react-router-dom';
import config from './config';
import NotesContext from './NotesContext';
import Header from './Header/Header';
import Main from './Main';
import NotePage from './Notes/NotePage';
import FolderPage from './Folders/FolderPage';
import NotFoundPage from './NotFoundPage';
import AddNote from './Forms/AddNote';
import AddFolder from './Forms/AddFolder';
import ErrorBoundaries from './ErrorBoundaries';
import './App.css';


class App extends React.Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    Promise
      .all([
        fetch(`${config.API_ENDPOINT}/notes`),
        fetch(`${config.API_ENDPOINT}/folders`)
      ])
      .then(([resNotes, resFolders]) => {
        if (!resNotes.ok) {
          throw new Error(`Something went wrong with fetching notes`)
        }
        if (!resFolders.ok) {
          throw new Error(`Something went wrong with fetching folders`)
        }
        return ([resNotes, resFolders])
      })
      .then(([notes, folders]) => Promise.all([notes.json(), folders.json()]))
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addNote: this.handleAddNote,
      addFolder: this.handleAddFolder,
    }

    return (
      <main className='App'>
        <ErrorBoundaries>
          <NotesContext.Provider value={contextValue}>
            <Header />
            <Switch>
              <Route
                exact
                path='/'
                component={Main}
              />
              <Route
                exact
                path='/note/:noteId'
                component={NotePage}
              />
              <Route
                exact
                path='/folder/:folderId'
                component={FolderPage}
              />
              <Route
                exact
                path='/add-note'
                component={AddNote}
              />
              <Route
                exact
                path='/add-folder'
                component={AddFolder}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </NotesContext.Provider>
        </ErrorBoundaries>
       </main>
    );
  }
}


export default App