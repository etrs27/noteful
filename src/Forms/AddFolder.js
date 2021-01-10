import React from 'react';
import config from '../config';
import PropTypes from 'prop-types';
import NotefulForm from './NotefulForm';
import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError';


class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            formValid: false,
            validationMessages: {
                name: "",
            },
        };
    }

    static contextType = NotesContext;

    static defaultProps = {
        history: { push: () => {} },
    };

    updateName(name) {
        this.setState({name}, () => {
            this.validateName(name);
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const folder = {
            name: e.target.folderName.value,
        };

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(folder),
        })
            .then(res => {
                if (!res.ok) return res.json()
                .then(e => Promise.reject(e));
                return res.json();
            })
            .then(folder => {
                this.context.addFolder(folder);
                this.props.history.push(`/folder/${folder.id}`);
            })
            .catch(error => {
                console.error({ error });
            });
    };

    handleClickCancel = () =>{
        this.props.history.push('/')
    };

    validateName(fieldValue) {
        const fieldErrors = { ...this.state.validationMessages };
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            fieldErrors.name = "A name is required.";
            hasError = true;
        } else {
            if (fieldValue.length < 3) {
                fieldErrors.name = "The name must be at least 3 characters long.";
                hasError = true;
            } else {
                fieldErrors.name = "";
                hasError = false;
            }
        }

        this.setState(
            {
                validationMessages: fieldErrors,
                nameValid: !hasError,
            },
            ()=> {this.validateForm()}
        );
    }

    validateForm = () => {
        this.setState({
            formValid: this.state.nameValid,
        });
    };

    render() {
        return (
            <div className="AddFolder">
                <h2>Create a folder</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className="AddFolder_field">
                        <label htmlFor="folderName-input">Name</label>
                        <input
                            type="text"
                            id="folderName-input"
                            name="folderName"
                            onChange={e => this.updateName(e.target.value)}
                        />
                    </div>
                    <div className="AddFolder_buttons">
                        <button 
                            disabled={!this.state.formValid} 
                            type="submit">
                            Add folder
                        </button>
                        <button
                            type="button"
                            onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                    </div>
                </NotefulForm>
                <ValidationError
                    hasError={!this.state.nameValid}
                    message={this.state.validationMessages.name}
                />
            </div>
        );
    }
}

AddFolder.propTypes = {
    name: PropTypes.string.isRequired,
    formValid: PropTypes.bool,
    history: PropTypes.object.isRequired
}


export default AddFolder