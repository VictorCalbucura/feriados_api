import { useEffect, useState } from 'react';

const Holidays = ({ code }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    fetch(`https://api.boostr.cl/holidays.json`)
      .then(response => response.json())
      .then(data => setData(data.data))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false))
  }, [code]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error.message}</p>
  }

  return (
    <>
      {data.length > 0 ? (
        <div>
          {data.map((holidays, index) => (
            <div key={index}>
              <h2>Fecha de Feriado: {holidays.date}</h2>
              <p>Razón de Feriado: {holidays.title}</p>
              <p>Tipo: {holidays.type}</p>
              <p>Irrenunciable: {holidays.inalienable}</p>
              <p>Extra: {holidays.extra}</p>
              <p>------------------------</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron farmacias abiertas.</p>
      )}
    </>
  );
};

export default Holidays;