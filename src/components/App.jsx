import { Component, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

const LS_KEY = 'list_phonebook';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(() => [contact, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(() => contacts.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter( e.currentTarget.value );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onCnange={changeFilter} />
      <ContactList onDelete={deleteContact} contacts={contacts} />
      {/* <ContactList onDelete={this.deleteContact} contacts={filteredContacts} /> */}
    </div>
  );

  // state = {
  //   contacts: [],
  //   filter: '',
  // };
  // addContact = (name, number) => {
  //   const contact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };
  //   this.setState(({ contacts }) => ({
  //     contacts: [contact, ...contacts],
  //   }));
  // };
  // deleteContact = id => {
  //   this.setState(({ contacts }) => ({
  //     contacts: contacts.filter(contact => contact.id !== id),
  //   }));
  // };
  // changeFilter = e => {
  //   this.setState({ filter: e.currentTarget.value });
  // };
  // getVisibleContacts = () => {
  //   const { contacts, filter } = this.state;
  //   const normalizedFilter = filter.toLowerCase();
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };
  // componentDidMount() {
  //   const savedItems = JSON.parse(localStorage.getItem(LS_KEY));
  //   if (savedItems !== null) {
  //     this.setState({ contacts: savedItems });
  //     return;
  //   }
  //   this.setState({ contacts: [] });
  // }
  // componentDidUpdate(prevProps, { contacts: prevContacts }) {
  //   const { contacts: newContacts } = this.state;
  //   if (prevContacts !== newContacts) {
  //     localStorage.setItem(LS_KEY, JSON.stringify(newContacts));
  //   }
  // }
};
