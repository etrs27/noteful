import React from 'react';
import config from '../config';
import PropTypes from 'prop-types';
import NotefulForm from './NotefulForm';
import NotesContext from '../NotesContext';


class AddNote extends React.Component {
    state = {
        name: '',
        folder_id: '',
        content: '',
        error: null,
    };

    static contextType = NotesContext;

    static defaultProps = {
        history: { push: () => {} },
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.state.name) {
            this.setState({
                error: "A name is required.",
            });
        } else if (!this.state.folder_id) {
            this.setState({
                error: "Please choose a folder.",
            });
        } else if (!this.state.content) {
            this.setState({
                error: "Content is required.",
            });
        } else {

            const newNote = {
                name: e.target.name.value,
                content: e.target.content.value,
                folder_id: e.target.folder_id.value,
                modified: new Date(),
            };

            fetch(`${config.API_ENDPOINT}/notes`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(newNote),
            })
                .then(res => {
                    if (!res.ok) return res.json()
                    .then(e => Promise.reject(e));
                    return res.json();
                })
                .then(note => {
                    this.context.addNote(note);
                    this.props.history.push(`/folder/${note.folder_id}`);
                })
                .catch(error => {
                    console.error({ error });
                });
        }
    };

    handleClickCancel = () =>{
        this.props.history.push('/')
    };

    render() {
        const { folders = [] } = this.context;
        
        return (
            <div className="AddNote">
                <h2>Create a note</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className="AddNote_field">
                        <label htmlFor="AddNote_name">Name</label>
                        <input
                            type="text"
                            id="AddNote_name"
                            name="name"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="AddNote_field">
                        <label htmlFor="AddNote_folder">Folder</label>
                        <select
                            id="AddNote_folder"
                            name="folder_id"
                            onChange={this.onChange}
                        >
                            <option value={null}>...</option>
                            {folders.map(folder => (
                                <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="AddNote_field">
                        <label htmlFor="AddNote_content">Content</label>
                        <textarea
                            id="AddNote_content"
                            name="content"
                            onChange={this.onChange}
                        />
                    </div>
                    {this.state.error && (
                        <p>{this.state.error}</p>
                    )}
                    <div className="AddNote_buttons">
                        <button type="submit">
                            Add note
                        </button>
                        <button
                            type="button"
                            onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                    </div>
                </NotefulForm>
            </div>
        );
    }
}

AddNote.propTypes = {
    note: PropTypes.string.isRequired,
    folder_id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
}


export default AddNote