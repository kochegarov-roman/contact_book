import React, { Component } from 'react';
import {Loader} from "./Loader";
import {Contacts} from "./Contacts";
import {SearchBar} from "./SearchBar";
import {checkPhone} from "../other";


/**
 * Main application component
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        contacts: undefined,
        filterContacts: undefined,
      };
    this.handlerSearch = this.handlerSearch.bind(this);
  }

  /**
   * Initialization of the contact list, download from server and saving to localStorage
   */
  async componentDidMount() {
    const localContactBook = localStorage.getItem('contact_book');
    const response = localContactBook || await fetch('http://demo.sibers.com/users');
    const contacts = JSON.parse(localContactBook) || await response.json();
    if (!localContactBook) localStorage.setItem('contact_book', JSON.stringify(contacts));
    this.setState({contacts: contacts, filterContacts: contacts});
  }

  /**
   * contact search handler. Its props include "search" - search string.
   */
  handlerSearch(search){
    const filterContacts = this.state.contacts.filter( contact =>
        contact.name.toLowerCase().includes(search.toLowerCase())
          || contact.email.toLowerCase().includes(search.toLowerCase())
            || contact.website.toLowerCase().includes(search.toLowerCase())
              || checkPhone(contact.phone, search)
                || contact.company.name.toLowerCase().includes(search.toLowerCase())
                    || contact.address.country.toLowerCase().includes(search.toLowerCase())
    );
    this.setState({filterContacts});
  }


  render() {
    return (
      <div className="container">
        <h1>Contact Book</h1>
        <SearchBar handlerSearch={this.handlerSearch} />
        <div className="row">
            {this.state.contacts ?
                <Contacts contacts={this.state.filterContacts}/>
                : <Loader />}
        </div>
      </div>
    );
  }
}

export default App;
