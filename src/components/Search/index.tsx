import search from '../../assets/img/search.svg';
import close from '../../assets/img/close.svg';
import style from './style.module.scss';
import React, { ChangeEvent, useCallback, useContext, useRef, useState } from 'react';
import { SearchContext } from '../../App';
import { debounce } from '../../actions';

function Search() {
  const { setSearchValue } = useContext(SearchContext);
  const [localSearch, setLocalSearch] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // or can be written like this
  // const onInputChange:(str:string) => void = useCallback((str: string) => {
  //   setLocalSearch(str);
  //   debounce(setSearchValue?.(str), 1000);
  //   console.log(123);
  // }, []);

  // useEffect(() => {

  // }, [searchValue])

  const onClickClear = () => {
    setLocalSearch('');
    setSearchValue?.('');
    inputRef.current?.focus();
  };

  const updateSearchValue: (str: string) => void = useCallback(
    debounce((str: string) => {
      setSearchValue?.(str);
    }, 500),
    []
  );

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={style.root}>
      <img className={style.searchIcon} src={search} />
      <input
        className={style.input}
        placeholder="Search pizza ..."
        value={localSearch}
        onChange={onInputChange}
        ref={inputRef}
      />
      {localSearch && (
        <img className={style.closeIcon} src={close} onClick={() => onClickClear()} />
      )}
    </div>
  );
}

export default Search;
