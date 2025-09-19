import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Shield, 
  Monitor, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Filter,
  Building2,
  TrendingUp,
  HardDrive,
  Laptop,
  Printer,
  Router
} from 'lucide-react';

function DashboardPage() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [loading, setLoading] = useState(true);
  const [hwData, setHwData] = useState([]);
  const [csData, setCsData] = useState([]);

  // Mock data - replace with your actual API calls
  const departments = ['All', 'HR', 'Manufacturing', 'Factory A', 'Factory B', 'IT Department'];
  const userRole = 'admin'; // Replace with actual role from context/auth

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API calls
        // const hwRes = await axios.get('/api/hw/');
        // const csRes = await axios.get('/api/cs/');
        
        // Mock data for demonstration
        setTimeout(() => {
          setHwData([
            { department_factory: 'Factory A', equipment_type: 'PC', quantity: 15 },
            { department_factory: 'Factory A', equipment_type: 'Laptop', quantity: 10 },
            { department_factory: 'HR', equipment_type: 'PC', quantity: 20 },
            { department_factory: 'HR', equipment_type: 'Printer', quantity: 5 },
            { department_factory: 'Manufacturing', equipment_type: 'PC', quantity: 25 },
            { department_factory: 'Manufacturing', equipment_type: 'Scanner', quantity: 3 },
            { department_factory: 'Factory B', equipment_type: 'Laptop', quantity: 12 },
            { department_factory: 'Factory B', equipment_type: 'Printer', quantity: 4 },
          ]);
          
          setCsData([
            { department_factory: 'Factory A', severity: 'Critical' },
            { department_factory: 'Factory A', severity: 'High' },
            { department_factory: 'Factory A', severity: 'Medium' },
            { department_factory: 'HR', severity: 'Medium' },
            { department_factory: 'HR', severity: 'Low' },
            { department_factory: 'Manufacturing', severity: 'High' },
            { department_factory: 'Manufacturing', severity: 'Medium' },
            { department_factory: 'Factory B', severity: 'Critical' },
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching data:', err);
        setHwData([]);
        setCsData([]);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Get equipment icon
  const getEquipmentIcon = (type) => {
    switch(type) {
      case 'PC': return <Monitor className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Printer': return <Printer className="w-5 h-5" />;
      case 'Scanner': return <Router className="w-5 h-5" />;
      default: return <HardDrive className="w-5 h-5" />;
    }
  };

  // Get severity color
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return 'from-red-500 to-red-600 text-white';
      case 'High': return 'from-orange-500 to-orange-600 text-white';
      case 'Medium': return 'from-yellow-500 to-yellow-600 text-white';
      case 'Low': return 'from-green-500 to-green-600 text-white';
      default: return 'from-gray-500 to-gray-600 text-white';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Filter data by department
  const filteredHW = selectedDept === 'All' ? hwData : hwData.filter(hw => hw.department_factory === selectedDept);
  const filteredCS = selectedDept === 'All' ? csData : csData.filter(cs => cs.department_factory === selectedDept);

  // Calculate summaries
  const hwSummary = filteredHW.reduce((acc, hw) => {
    acc[hw.equipment_type] = (acc[hw.equipment_type] || 0) + hw.quantity;
    return acc;
  }, {});

  const csSummary = filteredCS.reduce((acc, cs) => {
    acc[cs.severity] = (acc[cs.severity] || 0) + 1;
    return acc;
  }, {});

  const totalEquipment = Object.values(hwSummary).reduce((sum, count) => sum + count, 0);
  const totalObservations = Object.values(csSummary).reduce((sum, count) => sum + count, 0);
  const criticalIssues = csSummary.Critical || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">IT Audit Dashboard</h1>
                <p className="text-gray-600">Hardware Inventory & Cybersecurity Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Department Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <label className="text-sm font-semibold text-gray-700">
                Filter by Department/Factory:
              </label>
            </div>
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Equipment</p>
                <p className="text-2xl font-bold text-gray-900">{totalEquipment}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Issues</p>
                <p className="text-2xl font-bold text-gray-900">{criticalIssues}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Observations</p>
                <p className="text-2xl font-bold text-gray-900">{totalObservations}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">{departments.length - 1}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Hardware Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Monitor className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Hardware Inventory Summary</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(hwSummary).map(([type, count]) => (
              <div key={type} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3 mb-2">
                  {getEquipmentIcon(type)}
                  <h3 className="font-semibold text-gray-900">{type}</h3>
                </div>
                <p className="text-2xl font-bold text-blue-600">{count}</p>
                <p className="text-xs text-gray-500">units</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cybersecurity Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-red-100 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Cybersecurity Observations</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(csSummary).map(([severity, count]) => (
              <div key={severity} className={`bg-gradient-to-r ${getSeverityColor(severity)} rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{severity}</h3>
                  {severity === 'Critical' && <AlertTriangle className="w-5 h-5" />}
                  {severity === 'High' && <AlertTriangle className="w-5 h-5" />}
                  {severity === 'Medium' && <Clock className="w-5 h-5" />}
                  {severity === 'Low' && <CheckCircle className="w-5 h-5" />}
                </div>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm opacity-90">observations</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* HW Form Button */}
            <Link to="/dashboard/hwform">
              <button className="w-full group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Monitor className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold">Hardware Form</h3>
                </div>
                <p className="text-sm opacity-90 text-left">Add new hardware inventory</p>
              </button>
            </Link>

            {/* CS Form Button */}
            <Link to="/dashboard/csform">
              <button className="w-full group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold">Security Form</h3>
                </div>
                <p className="text-sm opacity-90 text-left">Record security observations</p>
              </button>
            </Link>

            {/* View Reports Button */}
            <Link to="/dashboard/reports">
              <button className="w-full group bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold">View Reports</h3>
                </div>
                <p className="text-sm opacity-90 text-left">Access detailed analytics</p>
              </button>
            </Link>

            {/* Generate Summary Report Button */}
            {/* Generate Summary Report Button */}
{(userRole === 'admin' || userRole === 'auditor') && (
  <Link to="/dashboard/ReportPage">
    <button className="w-full group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center space-x-3 mb-2">
        <FileText className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <h3 className="font-semibold">Summary Report</h3>
      </div>
      <p className="text-sm opacity-90 text-left">Generate audit reports</p>
    </button>
  </Link>
)}

          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;