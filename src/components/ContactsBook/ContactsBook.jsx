import { useState, useEffect, useRef, useCallback } from 'react';
import shortid from 'shortid';
import ContactForm from 'components/ContactForm/ContactForm';
import Section from 'components/Section/Section';
import ContactList from 'components/ContactList/ContactList';
import styles from './ContactsBook.module.css';
import Filter from 'components/Filter/Filter';
import Storage from '../../services/storage';

export default function ContactsBook() {
  const [contacts, setContacts] = useState([
    { id: `id-1`, name: `Rosie Simpson`, number: `459-12-56` },
    { id: `id-2`, name: `Hermione Kline`, number: `443-89-12` },
    { id: `id-3`, name: `Eden Clements`, number: `645-17-79` },
    { id: `id-4`, name: `Annie Copeland`, number: `227-91-26` },
  ]);
  const [filter, setFilter] = useState(``);
  const { 'contact-book': contactsBookClassName } = styles;
  const filteredContacts = contacts.filter(x =>
    x.name.toLowerCase().includes(filter.toLowerCase())
  );
  const storage = useRef(new Storage());
  const handleDeleteContact = useCallback(id => {
    setContacts(prev => {
      const newContacts = prev.filter(x => x.id !== id);
      storage.current.setContacts(newContacts);
      return newContacts;
    });
  }, []);
  const handleFormSubmit = useCallback(
    values => {
      const { name, number } = values;

      const hasContactWithSameName = contacts.some(
        x => x.name.toLowerCase() === name.toLowerCase()
      );

      if (hasContactWithSameName) {
        alert(`${name} is already in contacts.`);
        return;
      }
      setContacts(prev => {
        const newContacts = [
          ...prev,
          {
            id: `id-${shortid.generate()}`,
            name,
            number,
          },
        ];
        storage.current.setContacts(newContacts);
        return newContacts;
      });
    },
    [contacts]
  );

  useEffect(() => setContacts(storage.current.getContacts()), []);

  return (
    <div className={contactsBookClassName}>
      <h1>PhoneBook</h1>
      <ContactForm onSubmit={handleFormSubmit} />

      <Section title="Contacts">
        <Filter onChange={setFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </Section>
    </div>
  );
}
