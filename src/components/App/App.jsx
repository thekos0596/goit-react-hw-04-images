import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Searchbar from 'components/Searchbar/Searchbar';
import { fetchImages } from 'Servises/FetchImagesApi';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import { AppContainer } from './App.styled';

export default class App extends React.Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });

        const { totalHits, hits } = await fetchImages(query, page);

        if (totalHits === 0) {
          toast.error('Nothing was found for your request');
          this.setState({ isLoading: false });
          return;
        }

        this.setState(prevState => ({
          images: page === 1 ? hits : [...prevState.images, ...hits],

          totalHits:
            page === 1
              ? totalHits - hits.length
              : totalHits - [...prevState.images, ...hits].length,
        }));

        this.setState({ isLoading: false });
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      }
    }
  }

  hendleSearchSubmit = query => {
    this.setState({ query, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, totalHits, isLoading } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.hendleSearchSubmit} />
        {images && <ImageGallery images={images} />}
        {!!totalHits && (
          <Button onLoadMore={this.handleLoadMore} disabled={isLoading} />
        )}
        {isLoading && <Loader />}
        <ToastContainer autoClose={2000} />
      </AppContainer>
    );
  }
}
