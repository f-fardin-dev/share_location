import { useEffect, useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import ButtonControl from './components/ButtonControl';
import DataInterface from './interfaces/data.interface';
import Map from './components/Map';
import FormDialog from './components/FormDialog';
import DataContext from './context/DataContext';
import MarkersList from './components/MarkersList';

function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DataInterface[]>([]);
  const matches = useMediaQuery('(min-width:992px)', { noSsr: true });

  useEffect(() => {
    const dataSet = localStorage.getItem('dataSet');
    if (dataSet !== null) setData(JSON.parse(dataSet));
  }, []);

  if (!matches)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>
          This App is not working with this size of screen!
        </h1>
      </div>
    );

  return (
    <DataContext.Provider value={{ data, setData }}>
      <Map height={'100vh'}>
        <>
          <MarkersList />
          <ButtonControl handleOpen={() => setOpen(true)} />
        </>
      </Map>
      <FormDialog open={open} handleClose={() => setOpen(false)} />
    </DataContext.Provider>
  );
}

export default App;
