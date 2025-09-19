import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function ReportPage() {
  const [hwData, setHwData] = useState([]);
  const [csData, setCsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const hwRes = await axios.get('/api/hw/');
        const csRes = await axios.get('/api/cs/');
        setHwData(hwRes.data);
        setCsData(csRes.data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // HW summary
  const equipmentSummary = hwData.reduce((acc, hw) => {
    acc[hw.equipment_type] = (acc[hw.equipment_type] || 0) + Number(hw.quantity);
    return acc;
  }, {});

  // CS severity summary
  const severitySummary = csData.reduce((acc, cs) => {
    acc[cs.severity] = (acc[cs.severity] || 0) + 1;
    return acc;
  }, {});

  if (loading) return <p className="text-center mt-10">Loading report...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Summary Report</h1>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hardware Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Hardware Inventory Summary</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Equipment Type</th>
                <th className="p-3 border">Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(equipmentSummary).length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-3 text-center text-gray-500">
                    No hardware data available
                  </td>
                </tr>
              ) : (
                Object.entries(equipmentSummary).map(([type, qty]) => (
                  <tr key={type} className="hover:bg-gray-50">
                    <td className="p-3 border">{type}</td>
                    <td className="p-3 border">{qty}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Cybersecurity Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Cybersecurity Observations Summary</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Severity</th>
                <th className="p-3 border">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(severitySummary).length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-3 text-center text-gray-500">
                    No cybersecurity observations
                  </td>
                </tr>
              ) : (
                Object.entries(severitySummary).map(([severity, count]) => (
                  <tr key={severity} className="hover:bg-gray-50">
                    <td className="p-3 border">{severity}</td>
                    <td className="p-3 border">{count}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
