import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

export default function ContactForm({ contacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const onInputHandler = evt => {
    const { value } = evt.currentTarget;

    switch (evt.currentTarget.name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

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

  const onFormSubmit = e => {
    e.preventDefault();

    formSubmitHandler(name, number);

    setName('');
    setNumber('');
  };

  return (
    <form className={css.contactForm} onSubmit={onFormSubmit}>
      <label htmlFor="name" className={css.contactLabel}>
        Name
        <input
          className={css.contactInput}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onInputHandler}
        />
      </label>
      <label htmlFor="number" className={css.contactLabel}>
        Number
        <input
          className={css.contactInput}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={onInputHandler}
        />
      </label>
      <button className={css.contactBtn} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  formSubmitHandler: PropTypes.func.isRequired,
};
