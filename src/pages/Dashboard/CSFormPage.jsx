import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileDown, 
  AlertCircle,
  CheckCircle,
  Building2,
  Monitor,
  Calendar,
  User,
  Shield
} from 'lucide-react';

function CSFormPage() {
  const [formData, setFormData] = useState({
    department_factory: '',
    observation_id: '',
    equipment_type: '',
    observation_description: '',
    severity: '',
    status: '',
    date_observed: '',
    assigned_to: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const departments = [
    'HR', 'Manufacturing', 'Factory A', 'Factory B',
    'IT Department', 'Finance', 'Operations', 'Quality Control'
  ];

  const equipmentTypes = ['PC','Laptop','Printer','Scanner','Other'];
  const observationOptions = [
    'Outdated antivirus software detected',
    'Unauthorized software installed',
    'Equipment accessible via public IP without firewall protection',
    'Missing security patches on operating system',
    'Weak password policy detected',
    'Unencrypted data transmission detected',
    'Physical access to equipment unsecured'
  ];

  const severityOptions = ['Low','Medium','High','Critical'];
  const statusOptions = ['Open','In Progress','Resolved'];
  const assignedUsers = ['Alice','Bob','Charlie','David','Eve'];

  // Auto-generate observation ID
  const generateObservationID = () => {
    return 'OBS-' + Math.floor(1000 + Math.random() * 9000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.department_factory) newErrors.department_factory = 'Department/Factory is required';
    if (!formData.equipment_type) newErrors.equipment_type = 'Equipment type is required';
    if (!formData.observation_description) newErrors.observation_description = 'Observation is required';
    if (!formData.severity) newErrors.severity = 'Severity is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.date_observed) newErrors.date_observed = 'Date observed is required';
    if (!formData.assigned_to) newErrors.assigned_to = 'Assigned user is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Generate Observation ID on submission
      const observationID = generateObservationID();
      setFormData(prev => ({ ...prev, observation_id: observationID }));

      await new Promise(resolve => setTimeout(resolve, 1000)); // mock API
      setSubmitStatus('success');

      setTimeout(() => {
        setFormData({
          department_factory: '',
          observation_id: '',
          equipment_type: '',
          observation_description: '',
          severity: '',
          status: '',
          date_observed: '',
          assigned_to: ''
        });
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportCSV = () => {
    alert('CSV export functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between py-6 items-center">
          <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          <button onClick={handleExportCSV} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            <FileDown className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600"/>
            <p className="text-green-800 font-medium">Observation submitted successfully!</p>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600"/>
            <p className="text-red-800 font-medium">Error submitting form. Please try again.</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <form onSubmit={handleSubmit}>
            {/* Department/Factory */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                <Building2 className="w-4 h-4"/>
                <span>Department/Factory *</span>
              </label>
              <select
                name="department_factory"
                value={formData.department_factory}
                onChange={handleInputChange}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 transition ${
                  errors.department_factory ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select Department/Factory</option>
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
              {errors.department_factory && <p className="mt-1 text-sm text-red-600">{errors.department_factory}</p>}
            </div>

            {/* Equipment Type & Observation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <Monitor className="w-4 h-4"/>
                  <span>Equipment Type *</span>
                </label>
                <select
                  name="equipment_type"
                  value={formData.equipment_type}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 transition ${
                    errors.equipment_type ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Equipment Type</option>
                  {equipmentTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                {errors.equipment_type && <p className="mt-1 text-sm text-red-600">{errors.equipment_type}</p>}
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <Shield className="w-4 h-4"/>
                  <span>Observation *</span>
                </label>
                <select
                  name="observation_description"
                  value={formData.observation_description}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 transition ${
                    errors.observation_description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Observation</option>
                  {observationOptions.map(obs => <option key={obs} value={obs}>{obs}</option>)}
                </select>
                {errors.observation_description && <p className="mt-1 text-sm text-red-600">{errors.observation_description}</p>}
              </div>
            </div>

            {/* Severity & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <Shield className="w-4 h-4"/>
                  <span>Severity *</span>
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 transition ${
                    errors.severity ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Severity</option>
                  {severityOptions.map(level => <option key={level} value={level}>{level}</option>)}
                </select>
                {errors.severity && <p className="mt-1 text-sm text-red-600">{errors.severity}</p>}
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <Shield className="w-4 h-4"/>
                  <span>Status *</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 transition ${
                    errors.status ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Status</option>
                  {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
                {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
              </div>
            </div>

            {/* Date Observed & Assigned To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4"/>
                  <span>Date Observed *</span>
                </label>
                <input
                  type="date"
                  name="date_observed"
                  value={formData.date_observed}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 transition ${
                    errors.date_observed ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.date_observed && <p className="mt-1 text-sm text-red-600">{errors.date_observed}</p>}
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4"/>
                  <span>Assigned To *</span>
                </label>
                <select
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 transition ${
                    errors.assigned_to ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select User</option>
                  {assignedUsers.map(user => <option key={user} value={user}>{user}</option>)}
                </select>
                {errors.assigned_to && <p className="mt-1 text-sm text-red-600">{errors.assigned_to}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CSFormPage;
