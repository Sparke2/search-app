import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';

function SearchForm({ filters, setFilters }) {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleRemoveFilter = (key) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: false,
    }));
  };

  const handleClearAll = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setFilters(clearedFilters);
  };

  const activeFilters = Object.entries(filters)
    .filter(([key, value]) => value)
    .map(([key]) => {
      const labelMapping = {
        searchBooks: 'Поиск по: книгам',
        searchPeriodicals: 'Поиск по: журналам',
        searchAudio: 'Поиск по: аудио',
        searchVideo: 'Поиск по: видео',
        searchArchives: 'Поиск по: архивам',
        searchAuthor: 'Область поиска: по автору',
        searchTitle: 'Область поиска: по названию',
        searchInText: 'Область поиска: в тексте'
      };
      return (
        <span key={key} className="badge bg-secondary me-2">
          {labelMapping[key]}
          <button 
            type="button" 
            className="btn-close btn-close-white ms-2" 
            aria-label="Close" 
            onClick={() => handleRemoveFilter(key)}
          ></button>
        </span>
      );
    });

  const labelContent = searchText 
    ? `Искать в найденном : <strong>${searchText}</strong>` 
    : 'Искать в найденном';

  return (
    <div>
      <div className='position-relative'>
        <div className={`overlay ${isFocused ? 'overlay-show' : ''}`}>
          <label className="overlay-label">
            Поиск по библиотеке
          </label>
        </div>
        <div className="input-group search">
          <input
            type="text"
            name="q"
            className="form-control search-main"
            placeholder={isFocused ? '' : 'Введите запрос'}
            value={searchText}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button className="btn" type="submit" id="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} className='fs-20' />
          </button>
        </div>
      </div>
      <div className="form-check mt-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="searchInFound"
        />
        <label className="form-check-label" htmlFor='searchInFound' dangerouslySetInnerHTML={{ __html: labelContent }} />
      </div>
      {activeFilters.length > 0 && (
        <div className="mt-3">
          <strong>Выбранные фильтры:</strong>
          <div className="d-flex flex-wrap mt-2">
            {activeFilters}
          </div>
          <button 
            className="btn btn-outline-danger mt-3"
            onClick={handleClearAll}
          >
            Очистить всё
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
