import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, getContacts, removeContact } from 'redux/contactsSlice';
import { getFilter, setFilter } from 'redux/filterSlice';

export default function App() {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const formSubmitHandler = (name, number) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    const existedContact = contacts.find(contact => contact.name === name);

    if (existedContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact(newContact));
  };

  const deleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  const changeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm formSubmitHandler={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
}

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     if (contacts) {
//       this.setState({ contacts: JSON.parse(contacts) });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   formSubmitHandler = (name, number) => {
//     const newContact = {
//       name,
//       number,
//       id: nanoid(),
//     };

//     const existedContact = this.state.contacts.find(
//       contact => contact.name === name
//     );

//     if (existedContact) {
//       alert(`${name} is already in contacts.`);
//       return;
//     }

//     this.setState(({ contacts }) => ({ contacts: [newContact, ...contacts] }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;

//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(
//       contact =>
//         contact.name.toLowerCase().includes(normalizedFilter) ||
//         contact.number.includes(normalizedFilter)
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const { filter } = this.state;

//     return (
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <h1>Phonebook</h1>
//         <ContactForm formSubmitHandler={this.formSubmitHandler} />
//         <h2>Contacts</h2>
//         <Filter value={filter} changeFilter={this.changeFilter} />
//         <ContactList
//           contacts={this.getFilteredContacts()}
//           deleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }

// export default App;
