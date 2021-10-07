import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import get from "lodash/get";

import "./form-search.styles.css";

const FormSearch = (props) => {
  const {
    searchQuery,
    searchOptions,
    setMoviesPage,
    moviesPage,
    setSearchQuery,
  } = props;
  const [shouldFetchMovies, setShouldFetchMovies] = useState(false);
  const [textInput, setTextInput] = useState(null);

  const useKeyDownOptions = (searchOptions, setSearchQuery) => {
    const [selected, setSelected] = useState({
      index: -1,
      isUpdate: false,
    });

    const _setSearchQuery = useCallback(() => {
      const title = get(searchOptions[selected.index], "Title", "");
      if (title) {
        setSearchQuery(title);
      }
    }, [searchOptions, selected.index, setSearchQuery]);

    useEffect(() => {
      const onKeyDown = (e) => {
        switch (e.keyCode) {
          case 38:
            setSelected(({ index }) => ({
              index: index === -1 ? -1 : index - 1,
              isUpdate: true,
            }));
            break;
          case 40:
            const lastIndex = searchOptions.length - 1;

            setSelected(({ index }) => ({
              index: index === lastIndex ? lastIndex : index + 1,
              isUpdate: true,
            }));
            break;
          default:
            break;
        }
      };

      if (selected.isUpdate) {
        _setSearchQuery();
        setSelected({
          ...selected,
          isUpdate: false,
        });
      }

      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [searchOptions, selected, _setSearchQuery]);

    const resetKeyDownOptions = () => {
      setSelected({
        index: -1,
        isUpdate: false,
      });
    };

    return [selected, resetKeyDownOptions];
  };

  const [selected, resetKeyDownOptions] = useKeyDownOptions(
    searchOptions,
    setSearchQuery
  );

  const getMoviesList = async (searchQuery, pageNumber) => {
    try {
      const url = `http://www.omdbapi.com/?apikey=369f7d44&s=${encodeURIComponent(
        searchQuery
      )}&page=${pageNumber}`;
      const result = await axios.get(url);
      const list = get(result, "data.Search", []);
      const error = get(result, "data.Error", "");

      return { list, error };
    } catch (error) {
      throw error;
    }
  };

  const filterSearchPattern = (options, keyword) => {
    const searchPattern = new RegExp("^" + keyword, "i");
    const result = options.filter((option) => searchPattern.test(option.Title));
    return result;
  };

  const setAutocompleteOptions = async (keyword, currentOptions, callback) => {
    try {
      const { list } = await getMoviesList(keyword);
      if (list.length) {
        const filteredOptions = filterSearchPattern(list, keyword);
        return callback(filteredOptions);
      } else if (currentOptions.length) {
        const filteredOptions = filterSearchPattern(currentOptions, keyword);
        return callback(filteredOptions);
      }
    } catch (error) {
      return callback([], error);
    }
  };

  const textInputRef = useCallback((textInputNode) => {
    setTextInput(textInputNode);
  }, []);

  useEffect(() => {
    const _fetchMovies = async ({ isNextPage }) => {
      const {
        searchQuery,
        searchOptions,
        setMoviesList,
        setIsLoadingSearch,
        setSearchError,
        setSearchOptions,
        moviesPage,
        moviesList,
      } = props;

      setIsLoadingSearch(true);

      try {
        const { list, error } = await getMoviesList(
          searchQuery,
          moviesPage.index
        );

        if (list.length) {
          if (isNextPage) {
            const concatList = moviesList.concat(list);
            setMoviesList(concatList);
          } else {
            setMoviesList(list);
          }
        } else if (searchOptions.length) {
          const filteredCollections = filterSearchPattern(
            searchOptions,
            searchQuery
          );
          if (filteredCollections.length) {
            setMoviesList(filteredCollections);
          }
        }

        if (error) {
          setMoviesList([]);
          setSearchError(error);
        } else {
          setSearchError("");
        }

        setIsLoadingSearch(false);
        setSearchOptions([]);
        textInput.blur();
      } catch (error) {
        setIsLoadingSearch(false);
        setMoviesList([]);
        setSearchError(error);
      }
    };

    if (shouldFetchMovies) {
      _fetchMovies({ isNextPage: false });
      setShouldFetchMovies(false);
    }

    if (moviesPage.shouldFetchMovies) {
      _fetchMovies({ isNextPage: true });
      setMoviesPage({
        index: moviesPage.index,
        shouldFetchMovies: false,
      });
    }
  }, [shouldFetchMovies, textInput, props, moviesPage, setMoviesPage]);

  const _onOptionClick = (title) => () => {
    props.setSearchQuery(title);
    setShouldFetchMovies(true);
  };

  const _onChangeInput = (keyword) => {
    const { setSearchQuery, setSearchOptions, searchOptions } = props;

    setSearchQuery(keyword);
    resetKeyDownOptions();

    if (keyword) {
      setAutocompleteOptions(keyword, searchOptions, (options, error) => {
        if (options.length) {
          setSearchOptions(options);
        } else {
          setSearchOptions([]);
        }
      });
    } else {
      setSearchOptions([]);
    }
  };

  const _onSubmit = (event) => {
    event.preventDefault();
    const { searchQuery } = props;

    if (searchQuery.trim()) {
      setShouldFetchMovies(true);
    }
  };

  return (
    <div className="form-search">
      <form onSubmit={(event) => _onSubmit(event)}>
        <div className="form-group">
          <input
            autoComplete="off"
            ref={textInputRef}
            id="searchMovies"
            type="text"
            name="searchMovies"
            placeholder="Search Movies.."
            onChange={({ target: { value } }) => _onChangeInput(value)}
            value={searchQuery}
          />

          <button type="submit">
            <span className="submit-text">Search</span>
          </button>
        </div>
      </form>

      <ul className="options">
        {searchOptions.map((option, index) => {
          const { Title, Year, imdbID } = option;
          const isSelected = index === selected.index;

          return (
            <li
              key={imdbID}
              className={isSelected ? "selected" : ""}
              onClick={_onOptionClick(Title)}
            >
              {Title} - {Year}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default FormSearch;
