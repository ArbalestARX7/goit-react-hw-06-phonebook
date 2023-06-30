import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <>
      <ul className={css.contactList}>
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={css.contactItem}>
            {name}:<span className={css.contactNumber}>{number}</span>
            <button className={css.listBtn} onClick={() => deleteContact(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
