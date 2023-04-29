import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { fetchImages } from 'Servises/FetchImagesApi';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import { AppContainer } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    const fetchData = async () => {
      const { hits, totalHits } = await fetchImages(query, page);

      if (totalHits === 0) {
        toast.error('Nothing was found for your request');
        setIsLoading(false);
        return;
      }

      setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
      setTotalHits(prevTotalHits =>
        page === 1 ? totalHits - hits.length : prevTotalHits - hits.length
      );
      setIsLoading(false);
    };

    fetchData().catch(error => {
      toast.error(`Oops! Something went wrong! ${error}`);
      setIsLoading(false);
    });
  }, [page, query]);

  const hendleSearchSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={hendleSearchSubmit} />
      {images && <ImageGallery images={images} />}
      {!!totalHits && (
        <Button onLoadMore={handleLoadMore} disabled={isLoading} />
      )}
      {isLoading && <Loader />}
      <ToastContainer autoClose={2000} />
    </AppContainer>
  );
};
