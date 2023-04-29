import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = { query: '' };

  hendleSearchChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  hendleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      toast.warn('Please enter Search Request !', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <Header className="searchbar">
        <SearchForm className="form" onSubmit={this.hendleSubmit}>
          <SearchFormBtn type="submit">
            <FiSearch style={{ width: 20, height: 20 }} />
          </SearchFormBtn>

          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.hendleSearchChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
