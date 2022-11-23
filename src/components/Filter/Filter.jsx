import propTypes from './FilterPropTypes';
import styles from './Filter.module.css';
import { useState } from 'react';

export default function Filter({ onChange }) {
  const [filter, setFilter] = useState(``);
  const { 'filter-title': filterTitleClassName } = styles;

  return (
    <>
      <span className={filterTitleClassName}>Find contacts by name</span>
      <input
        type="text"
        value={filter}
        onChange={e => {
          const value = e.target.value;
          setFilter(value);
          onChange(value);
        }}
      />
    </>
  );
}

Filter.propTypes = propTypes;
