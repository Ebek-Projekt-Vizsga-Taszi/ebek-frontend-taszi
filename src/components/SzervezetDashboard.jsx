import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const SzervezetDashboard = () => {
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if organization is authenticated
    const orgToken = localStorage.getItem('orgToken');
    if (!orgToken) {
      navigate('/SzervezetBejelentkezes');
      return;
    }

    // Fetch forms from the backend
    fetchForms();
  }, [navigate]);

  const fetchForms = async () => {
    try {
      const response = await fetch('http://localhost:8000/felhasznalok/szervezet/urlapok', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('orgToken')}`
        }
      });
      if (!response.ok) {
        throw new Error('Hiba történt az űrlapok lekérése során');
      }
      const data = await response.json();
      setForms(data);
      setFilteredForms(data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const handleSort = (type) => {
    setSortBy(type);
    const sortedForms = [...filteredForms].sort((a, b) => {
      switch (type) {
        case 'date':
          return new Date(b.bekuldesDatuma) - new Date(a.bekuldesDatuma);
        case 'name':
          return a.tulajdonosNeve.localeCompare(b.tulajdonosNeve);
        case 'municipality':
          return a.tulajdonosCim.localeCompare(b.tulajdonosCim);
        default:
          return 0;
      }
    });
    setFilteredForms(sortedForms);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = forms.filter(form => 
      form.tulajdonosNeve.toLowerCase().includes(term.toLowerCase()) ||
      form.tulajdonosCim.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredForms(filtered);
  };

  const handleApprove = async (formId) => {
    try {
      const response = await fetch(`http://localhost:8000/felhasznalok/szervezet/urlap/${formId}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('orgToken')}`
        }
      });
      if (!response.ok) {
        throw new Error('Hiba történt az űrlap jóváhagyása során');
      }
      fetchForms(); // Refresh the forms list
    } catch (error) {
      console.error('Error approving form:', error);
    }
  };

  const handleReject = async (formId) => {
    try {
      const response = await fetch(`http://localhost:8000/felhasznalok/szervezet/urlap/${formId}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('orgToken')}`
        }
      });
      if (!response.ok) {
        throw new Error('Hiba történt az űrlap elutasítása során');
      }
      fetchForms(); // Refresh the forms list
    } catch (error) {
      console.error('Error rejecting form:', error);
    }
  };

  const downloadPDF = (form) => {
    try {
      const doc = new jsPDF();
      
      // Add form data to PDF
      doc.setFontSize(16);
      doc.text('Űrlap adatai', 20, 20);
      
      doc.setFontSize(12);
      doc.text(`Tulajdonos neve: ${form.tulajdonosNeve || 'N/A'}`, 20, 40);
      doc.text(`Tulajdonos címe: ${form.tulajdonosCim || 'N/A'}`, 20, 50);
      doc.text(`Tulajdonos telefonszáma: ${form.tulajdonosTel || 'N/A'}`, 20, 60);
      doc.text(`Tulajdonos email címe: ${form.tulajdonosEmail || 'N/A'}`, 20, 70);
      
      doc.text(`Kutya hivatalos neve: ${form.ebHivoneve || 'N/A'}`, 20, 90);
      doc.text(`Kutya fajtája: ${form.ebFajtaja || 'N/A'}`, 20, 100);
      doc.text(`Kutya neme: ${form.ebNeme || 'N/A'}`, 20, 110);
      doc.text(`Kutya születési dátuma: ${form.ebSzulIdeje ? new Date(form.ebSzulIdeje).toLocaleDateString() : 'N/A'}`, 20, 120);
      doc.text(`Kutya színe: ${form.ebSzine || 'N/A'}`, 20, 130);
      doc.text(`Chip sorszáma: ${form.chipSorszam || 'N/A'}`, 20, 140);
      
      doc.text(`Beküldés dátuma: ${form.bekuldesDatuma ? new Date(form.bekuldesDatuma).toLocaleDateString() : 'N/A'}`, 20, 160);
      doc.text(`Státusz: ${form.status || 'Feldolgozás alatt'}`, 20, 170);
      
      doc.save(`urlap_${form.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Szervezeti Irányítópult</h1>
      
      {/* Filters and Search */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium">Rendezés:</label>
          <select
            className="border rounded px-3 py-1"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="date">Dátum</option>
            <option value="name">Név</option>
            <option value="municipality">Település</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Keresés név vagy település alapján..."
            className="border rounded px-3 py-1 w-64"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Forms Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tulajdonos neve
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Cím
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Beküldés dátuma
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Státusz
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Műveletek
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredForms.map((form) => (
              <tr key={form.id}>
                <td className="px-6 py-4 border-b border-gray-200">
                  {form.tulajdonosNeve || 'N/A'}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {form.tulajdonosCim || 'N/A'}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {form.bekuldesDatuma ? new Date(form.bekuldesDatuma).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {form.status || 'Feldolgozás alatt'}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <div className="flex space-x-2">
                    {(!form.status || form.status === 'feldolgozas_alatt') && (
                      <>
                        <button
                          onClick={() => handleApprove(form.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Elfogad
                        </button>
                        <button
                          onClick={() => handleReject(form.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Elutasít
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => downloadPDF(form)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      PDF
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SzervezetDashboard; 