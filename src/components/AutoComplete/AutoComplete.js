import React, { Component} from "react";
import './AutoComplete.css'
import {GeneralApiServices} from '../../services/api-service'

class Autocomplete extends Component {
    static defaultProps = {
        suggestions: [''],
        cast: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            artists:[],
            activeSuggestion: 0,// The active selection's index
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: this.props.cast.full_name,
            inputId: this.props.cast.id
        };
    }
    componentDidMount(){
        GeneralApiServices.getAllItems('artists').then(json=>{
            this.setState({artists:json})
        })
    }
    onChange = e => {
        const suggestions= this.state.artists.map(obj=>obj.full_name)
        //const { suggestions } = this.props;
        const userInput = e.currentTarget.value;
        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
        suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        let artist= this.state.artists.find(obj=>obj.full_name===userInput)
        const id = (artist)? artist.id: null
        // Update the user input and filtered suggestions, reset the active suggestion and make sure the suggestions are shown
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value,
            inputId: id
        });

    };
    // Event fired when the user clicks on a suggestion
    onClick = e => {
        // Update the user input and reset the rest of the state
        let name= e.currentTarget.innerText
        let artist= this.state.artists.find(obj=>obj.full_name===name)
        const id = (artist)? artist.id: ''
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText,
            inputId: id
        });
    };
    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key, update the input and close the suggestions
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) return;
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length)  return;
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };
    onAdd= e =>{
        if (this.state.userInput) {
            const data= {full_name: this.state.userInput}
            console.log(data)
            
            GeneralApiServices.postItem('artists',data)
            .then(json=>{
                this.setState({inputId: json.id})
                GeneralApiServices.getAllItems('artists').then(json=>{
                    this.setState({artists:json})
                })
            }).catch(err=>console.log(err))
        }
        
    }

    renderSuggestionList(){
        const { onClick, state: {activeSuggestion,filteredSuggestions,showSuggestions,userInput}
                } = this;
        const suggestionsListComponent= (showSuggestions && userInput && filteredSuggestions.length)
        ?   (<ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                    let className;
                    // Flag the active suggestion with a class
                    if (index === activeSuggestion) className = "suggestion-active";
                    return (
                        <li className={className} key={suggestion} onClick={onClick}>
                            {suggestion}
                        </li>);
                })}
            </ul>)
        : false
        
        return suggestionsListComponent
            
    }

    render() {
        //console.log(this.props.cast)
        const { onChange,onKeyDown, state: {userInput}} = this;
        let suggestionsListComponent= this.renderSuggestionList()
        const artistId= (this.state.inputId)? this.state.inputId : ''
        
        return (
        <div>
            <div className='castSearch'>
                <input type="text" onChange={onChange} onKeyDown={onKeyDown} 
                value={userInput} id='name'/>
                <button id='add' onClick={this.onAdd} disabled={this.state.inputId || !this.state.userInput}>
                    ADD
                </button>
                <span>Artist ID: </span>
                <input type="number" name={this.props.name} value={artistId} className='castId' readOnly/>
            </div>
            
            {suggestionsListComponent}
        </div>
        );
    }
    }

export default Autocomplete;