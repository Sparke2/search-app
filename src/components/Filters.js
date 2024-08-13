import React, { useState, useMemo } from 'react';
import ReactSelect from './ReactSelect';
import Checkbox from './Checkbox';
import OptionsForEditions from '../filterdata/OptionsForEditions';
import OptionsForPublishers from '../filterdata/OptionsForPublishers';
import OptionsForAvailability from '../filterdata/OptionsForAvailability';
import OptionsForYears from '../filterdata/OptionsForYears';
import OptionsForTarget from '../filterdata/OptionsForTarget';
import ReactSelectWithLabel from './ReactSelectWithLabel';

function Filters({ onApply }) {
  const defaultSelectedOptionsForAvailability = OptionsForAvailability.filter(option => option.selected);
  const [selectedFromYear, setSelectedFromYear] = useState(null);
  const [selectedToYear, setSelectedToYear] = useState(null);

  const filteredToYearOptions = useMemo(() => {
    if (!selectedFromYear) return OptionsForYears;
    return OptionsForYears.filter(option => option.value >= selectedFromYear.value);
  }, [selectedFromYear]);

  const initialFilters = {
    searchBooks: false,
    searchPeriodicals: false,
    searchAudio: false,
    searchVideo: false,
    searchArchives: false,
    searchAuthor: false,
    searchTitle: false,
    searchInText: false,
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleCheckboxChange = (id, checked) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [id]: checked,
    }));
  };

  const handleApplyFilters = () => {
    onApply(filters);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    onApply(initialFilters);
  };

  const searchByOptions = [
    { id: 'searchBooks', label: 'Книгам' },
    { id: 'searchPeriodicals', label: 'Журналам' },
    { id: 'searchAudio', label: 'Аудио' },
    { id: 'searchVideo', label: 'Видео' },
    { id: 'searchArchives', label: 'Архивам' },
  ];

  const searchAreaOptions = [
    { id: 'searchAuthor', label: 'По автору' },
    { id: 'searchTitle', label: 'По названию' },
    { id: 'searchInText', label: 'В тексте' },
  ];



  return (
    <div className="row g-4 pt-4">
       <div className="col-12">
        <h6 className='mb-3'>Поиск по</h6>
        {searchByOptions.map(({ id, label }) => (
          <Checkbox 
            key={id} 
            id={id} 
            label={label} 
            checked={filters[id]} 
            onChange={handleCheckboxChange} 
          />
        ))}
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Область поиска</h6>
        {searchAreaOptions.map(({ id, label }) => (
          <Checkbox 
            key={id} 
            id={id} 
            label={label} 
            checked={filters[id]} 
            onChange={handleCheckboxChange} 
          />
        ))}
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Год издания</h6>
        <div className='row g-4 pt-1'>
          <div className='col-6'>
            <ReactSelectWithLabel 
              options={OptionsForYears} 
              placeholder="От" 
              value={selectedFromYear} 
              onChange={setSelectedFromYear} 
            />
          </div>
          <div className='col-6'>
            <ReactSelectWithLabel 
              options={filteredToYearOptions} 
              placeholder="До" 
              value={selectedToYear} 
              onChange={setSelectedToYear} 
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Доступность изданий</h6>
        <ReactSelect options={OptionsForAvailability} placeholder="Выберите из списка" defaultValue={defaultSelectedOptionsForAvailability}/>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Издательство</h6>
        <ReactSelect options={OptionsForPublishers} placeholder="Введите или выберите из списка"/>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Укрупненная группа специальностей</h6>
        <button className="btn btn-outline-primary w-100">Выберите УГСН</button>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Вид издания</h6>
        <ReactSelect options={OptionsForEditions} placeholder="Выберите из списка" isMulti/>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Целевое назначение</h6>
        <ReactSelect options={OptionsForTarget} placeholder={"Выберите из списка"} isMulti/>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>ББК</h6>
        <button className="btn btn-outline-primary w-100">Выберите ББК</button>
      </div>
      <div className='col-12'>
        <button className='btn btn-primary w-100' onClick={handleApplyFilters}>Применить параметры</button>
        <button className='btn btn-secondary w-100 mt-2' onClick={handleClearFilters}>Очистить всё</button>
      </div>
    </div>
  );
}

export default Filters;
