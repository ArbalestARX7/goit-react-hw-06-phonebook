import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
}
