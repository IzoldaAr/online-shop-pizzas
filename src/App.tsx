import { createContext, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Home, Cart, NotFound, RegistrationForm } from './pages';

export const SearchContext = createContext<{
  searchValue: string;
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
}>({ searchValue: '' });

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  // const [value, setValue] = useState('initial');
  // const prev = useRef('');

  // // const modifyValue = (e) => {
  // //   prev.current = value;
  // //   setValue(e.target.value);

  // //   console.log({
  // //     'prev.current': prev.current,
  // //     'e.target.value': e.target.value,
  // //   });
  // // };

  // useEffect(() => {
  //   prev.current = value;

  //   console.log({ value, 'prev.current': prev.current });
  // }, [value]);

  return (
    <div>
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          {/* <input value={value} onChange={(e) => setValue(e.target.value)} />

        <div>Current Value: {value}</div>
        <div>Prev Value: {prev.current}</div> */}
          <Header />

          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/registration" element={<RegistrationForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
