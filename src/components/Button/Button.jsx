import PropTypes from 'prop-types';
import { BtnLoadMore } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <BtnLoadMore type="button" onClick={onLoadMore}>
      Load more
    </BtnLoadMore>
  );
};

Button.propTypes = { onLoadMore: PropTypes.func.isRequired };
