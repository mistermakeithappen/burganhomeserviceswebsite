'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { serviceFormConfigs, FormField } from '@/lib/serviceFormConfigs';
import { useWebhookSubmission } from '@/lib/webhookSubmission';

interface QuoteFormProps {
  serviceId: string;
  onClose: () => void;
}

export default function QuoteForm({ serviceId, onClose }: QuoteFormProps) {
  const config = serviceFormConfigs[serviceId];
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const { submitForm } = useWebhookSubmission();

  // Group fields into steps for better UX
  const fieldGroups = [
    config?.fields.filter(f => !['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode'].includes(f.name)) || [],
    config?.fields.filter(f => ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode'].includes(f.name)) || []
  ];

  const currentFields = fieldGroups[currentStep];

  // Check if a field should be visible based on dependencies
  const isFieldVisible = (field: FormField) => {
    if (!field.dependsOn) return true;
    
    const { field: dependentField, value: dependentValue, condition = 'equals' } = field.dependsOn;
    const currentValue = formData[dependentField];
    
    switch (condition) {
      case 'equals':
        return currentValue === dependentValue;
      case 'includes':
        if (Array.isArray(currentValue)) {
          return Array.isArray(dependentValue) 
            ? dependentValue.some(v => currentValue.includes(v))
            : currentValue.includes(dependentValue);
        }
        return false;
      case 'notEquals':
        return currentValue !== dependentValue;
      default:
        return currentValue === dependentValue;
    }
  };

  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
    
    if (field.validation?.pattern) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        return field.validation.message || `Invalid ${field.label}`;
      }
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    if (field.type === 'tel' && value) {
      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (!phoneRegex.test(value)) {
        return 'Please enter a valid phone number';
      }
    }

    return null;
  };

  const handleInputChange = (field: FormField, value: any) => {
    setFormData(prev => ({ ...prev, [field.name]: value }));
    
    // Clear error when user starts typing
    if (errors[field.name]) {
      setErrors(prev => ({ ...prev, [field.name]: '' }));
    }
  };

  const handleNext = () => {
    // Validate current step fields
    const currentErrors: Record<string, string> = {};
    let hasErrors = false;

    currentFields.forEach(field => {
      if (!isFieldVisible(field)) return;
      
      const error = validateField(field, formData[field.name]);
      if (error) {
        currentErrors[field.name] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(currentErrors);
      return;
    }

    if (currentStep < fieldGroups.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Submit form data through webhook
      const response = await submitForm(serviceId, formData);

      if (response.success) {
        setIsSuccess(true);
        
        // Close form after showing success message
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        // Show error message
        setSubmissionError(response.error || 'Failed to submit form. Please try again.');
        console.error('Form submission failed:', response.error);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    // This check is now redundant since we check in the parent, but keeping for safety
    if (!isFieldVisible(field)) return null;

    const commonProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder,
      required: field.required,
      className: "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent",
      onChange: (e: any) => handleInputChange(field, e.target.value),
      value: formData[field.name] || ''
    };

    switch (field.type) {
      case 'select':
        return (
          <select {...commonProps} className={commonProps.className + " cursor-pointer"}>
            <option value="" className="bg-slate-800">Select an option...</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value} className="bg-slate-800">
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-4 h-4 text-yellow-400 focus:ring-yellow-400"
                />
                <span className="text-white">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name={`${field.name}-${option.value}`}
                  value={option.value}
                  checked={formData[field.name]?.includes(option.value) || false}
                  onChange={(e) => {
                    const currentValues = formData[field.name] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v: string) => v !== option.value);
                    handleInputChange(field, newValues);
                  }}
                  className="w-4 h-4 text-yellow-400 focus:ring-yellow-400 rounded"
                />
                <span className="text-white">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={4}
            className={commonProps.className}
          />
        );

      default:
        return (
          <input
            {...commonProps}
            type={field.type}
            className={commonProps.className}
          />
        );
    }
  };

  if (!config) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{config.title}</h2>
                <p className="text-blue-200 mt-1">{config.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-blue-200">
                  We've received your quote request and will contact you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Progress indicator */}
                {fieldGroups.length > 1 && (
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    {fieldGroups.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all ${
                          index === currentStep
                            ? 'w-8 bg-yellow-400'
                            : index < currentStep
                            ? 'w-8 bg-green-400'
                            : 'w-8 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Step title */}
                <h3 className="text-lg font-semibold text-white">
                  {currentStep === 0 ? 'Service Details' : 'Contact Information'}
                </h3>

                {/* Form fields */}
                {currentFields.map(field => {
                  // Don't render the entire field container if it's not visible
                  if (!isFieldVisible(field)) return null;
                  
                  return (
                    <motion.div 
                      key={field.name}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-white font-medium mb-2">
                        {field.label}
                        {field.required && <span className="text-red-400 ml-1">*</span>}
                      </label>
                      {renderField(field)}
                      {errors[field.name] && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-1 flex items-center"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors[field.name]}
                        </motion.p>
                      )}
                    </motion.div>
                  );
                })}

                {/* Error message */}
                {submissionError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
                  >
                    <p className="text-red-200 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      {submissionError}
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="p-6 border-t border-white/20">
              <div className="flex justify-between">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="ml-auto px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : currentStep < fieldGroups.length - 1 ? (
                    'Next'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Quote Request
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}