import { useEffect, useState } from 'react';
import Urlapok from './components/Urlapok';

const UrlapokOldal = () => {
  const [formList, setFormList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('http://localhost:8000/felhasznalok/bekuldott-urlapok');
        const data = await response.json();
        setFormList(data);
      } catch (error) {
        console.error('Hiba az űrlapok betöltésekor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  if (loading) {
    return <div>Betöltés...</div>;
  }

  return <Urlapok formList={formList} />;
};

export default UrlapokOldal;