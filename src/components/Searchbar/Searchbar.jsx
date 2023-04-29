import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const hendleSearchChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const hendleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.warn('Please enter Search Request !', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    onSubmit(query);
  };

  return (
    <Header className="searchbar">
      <SearchForm className="form" onSubmit={hendleSubmit}>
        <SearchFormBtn type="submit">
          <FiSearch style={{ width: 20, height: 20 }} />
        </SearchFormBtn>

        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={hendleSearchChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
