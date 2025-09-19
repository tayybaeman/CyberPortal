import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  ArrowLeft, 
  FileDown, 
  AlertCircle,
  CheckCircle,
  Building2,
  Hash,
  Network,
  Shield,
  Tag
} from 'lucide-react';

function HWFormPage() {
  const [formData, setFormData] = useState({
    department_factory: '',
    equipment_type: '',
    quantity: '',
    network_status: [],
    policy_compliance: '',
    tagged_labelled: '',
    comments: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const departments = [
    'HR', 'Manufacturing', 'Factory A', 'Factory B',
    'IT Department', 'Finance', 'Operations', 'Quality Control'
  ];

  const equipmentTypes = ['PC','Laptop','Printer','Scanner','Server','Router','Switch','Other'];
  const networkOptions = ['Intranet','Internet','Both'];
  const policyOptions = ['Compliant','Non-Compliant'];
  const taggedOptions = ['Yes','No'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'network_status') {
      if (checked) {
        setFormData(prev => ({ ...prev, network_status: [...prev.network_status, value] }));
      } else {
        setFormData(prev => ({ ...prev, network_status: prev.network_status.filter(item => item !== value) }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.department_factory) newErrors.department_factory = 'Department/Factory is required';
    if (!formData.equipment_type) newErrors.equipment_type = 'Equipment type is required';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Quantity must be a positive number';
    if (formData.network_status.length === 0) newErrors.network_status = 'Please select at least one network status';
    if (!formData.policy_compliance) newErrors.policy_compliance = 'Policy compliance status is required';
    if (!formData.tagged_labelled) newErrors.tagged_labelled = 'Tagged/Labelled status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // mock API
      setSubmitStatus('success');
      setTimeout(() => {
        setFormData({
          department_factory: '',
          equipment_type: '',
          quantity: '',
          network_status: [],
          policy_compliance: '',
          tagged_labelled: '',
          comments: ''
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
            <p className="text-green-800 font-medium">Hardware inventory submitted successfully!</p>
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
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 transition ${
                  errors.department_factory ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select Department/Factory</option>
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
              {errors.department_factory && <p className="mt-1 text-sm text-red-600">{errors.department_factory}</p>}
            </div>

            {/* Equipment Type & Quantity */}
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
                  className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 transition ${
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
                  <Hash className="w-4 h-4"/>
                  <span>Quantity *</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 transition ${
                    errors.quantity ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter quantity"
                />
                {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
              </div>
            </div>

            {/* Network Status */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <Network className="w-4 h-4"/>
                <span>Network Status *</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {networkOptions.map(option => (
                  <label key={option} className="flex items-center space-x-2 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="network_status"
                      value={option}
                      checked={formData.network_status.includes(option)}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              {errors.network_status && <p className="mt-1 text-sm text-red-600">{errors.network_status}</p>}
            </div>

            {/* Policy Compliance & Tagged/Labelled */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                  <Shield className="w-4 h-4"/>
                  <span>Policy Compliance *</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {policyOptions.map(option => (
                    <label key={option} className="flex items-center space-x-2 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="policy_compliance"
                        value={option}
                        checked={formData.policy_compliance === option}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {errors.policy_compliance && <p className="mt-1 text-sm text-red-600">{errors.policy_compliance}</p>}
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                  <Tag className="w-4 h-4"/>
                  <span>Tagged/Labelled *</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {taggedOptions.map(option => (
                    <label key={option} className="flex items-center space-x-2 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="tagged_labelled"
                        value={option}
                        checked={formData.tagged_labelled === option}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {errors.tagged_labelled && <p className="mt-1 text-sm text-red-600">{errors.tagged_labelled}</p>}
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Comments</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 border-gray-300 transition"
                placeholder="Additional notes (optional)"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
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

export default HWFormPage;
