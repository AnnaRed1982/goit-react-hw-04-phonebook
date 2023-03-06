import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

const LS_KEY = 'list_phonebook';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const savedItems = JSON.parse(localStorage.getItem(LS_KEY));

    if (savedItems !== null) {
      this.setState({ contacts: savedItems });
      return;
    }
    this.setState({ contacts: [] });
  }

  componentDidUpdate(prevProps, { contacts: prevContacts }) {
    const { contacts: newContacts } = this.state;

    if (prevContacts !== newContacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(newContacts));
    }
  }

  render() {
    const { filter, contacts } = this.state;

    const filteredContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onCnange={this.changeFilter} />
        <ContactList
          onDelete={this.deleteContact}
          contacts={filteredContacts}
        />
      </div>
    );
  }
}
