import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { ChevronLeft, FileText } from "lucide-react";
import { FormField } from "../../components/Form/Form";
import { CustomButton } from "../../components/Button/CustomButton";

// Unified document state type
interface DocumentField {
  file?: File;
  previewUrl?: string;
  error?: string;
}

export function CategoryContd() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();

  // Text form state
  const [form, setForm] = useState({
    businessIdea: "",
    businessName: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Documents state
  const [documents, setDocuments] = useState<Record<string, DocumentField>>({
    businessPlan: {},
    pitchDeck: {},
    companyLogo: {},
    businessModel: {},
  });

  const handleGoBack = () => navigate(-1);

  // Handle text inputs
  const handleTextChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: "" }));
  };

  // Handle file selection and preview generation
  const handleDocumentChange = (field: string, fileList: FileList | null) => {
    if (!fileList?.length) return;
    const file = fileList[0];
    const isImage = file.type.startsWith("image/");
    setDocuments(prev => ({
      ...prev,
      [field]: {
        file,
        previewUrl: isImage ? URL.createObjectURL(file) : undefined,
        error: "",
      },
    }));
  };

  // Validation
  const validate = () => {
    const newFormErrors: Record<string, string> = {};
    if (!form.businessIdea.trim()) newFormErrors.businessIdea = "Required.";
    else if (form.businessIdea.length > 500) newFormErrors.businessIdea = "Max 500 chars.";
    if (!form.businessName.trim()) newFormErrors.businessName = "Required.";
    else if (form.businessName.length > 100) newFormErrors.businessName = "Max 100 chars.";

    const newDocs = { ...documents };
    (Object.keys(newDocs) as Array<keyof typeof documents>).forEach(key => {
      if (!newDocs[key].file) newDocs[key].error = `${key.replace(/([A-Z])/g, ' $1')} required.`;
    });
    setFormErrors(newFormErrors);
    setDocuments(newDocs);

    return Object.keys(newFormErrors).length === 0 && Object.values(newDocs).every(d => d.file);
  };

  const handleSubmit = () => {
    if (!validate()) return;
    console.log("Submitting: text=>", form, "docs=>", documents);
    navigate('/dashboard');
  };

  const truncateFileName = (name: string) => {
    const parts = name.split(/\s+/);
    return parts.length > 2 ? `${parts.slice(0, 2).join(' ')}...` : name;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        name={categoryName || ""}
        containerStyle="bg-white h-[15vh] shadow-sm"
        handlePress={handleGoBack}
        icon={<ChevronLeft />}
      />
      
      {/* Main Content */}
      <div className="px-6 pt-8 pb-8">
        {/* Form Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Tell us about your business</h2>
          
          {/* Business Idea */}
          <div className="mb-6">
            <FormField
              name="businessIdea"
              type="textarea"
              rows={6}
              value={form.businessIdea}
              placeholder="Tell us about your business ideas*"
              errorMessage={formErrors.businessIdea}
              handleChange={value => handleTextChange('businessIdea', value)}
              containerStyles=""
              inputStyles="border-gray-200 focus-within:border-dpurple"
            />
          </div>
          
          {/* Business Name */}
          <div className="mb-8">
            <FormField
              name="businessName"
              type="text"
              value={form.businessName}
              placeholder="Business Name*"
              errorMessage={formErrors.businessName}
              handleChange={value => handleTextChange('businessName', value)}
              containerStyles=""
              inputStyles="border-gray-200 focus-within:border-dpurple"
            />
          </div>
        </div>
        
        {/* Upload Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h3 className="font-poppins font-semibold text-lg mb-6 text-gray-900">Upload available documents</h3>
        {(
          [
            { key: 'businessPlan', label: 'Business Plan' },
            { key: 'pitchDeck', label: 'Pitch Deck' },
            { key: 'companyLogo', label: 'Company Logo' },
            { key: 'businessModel', label: 'Business Model' },
          ] as const
        ).map(({ key, label }) => {
          const doc = documents[key];
          return (
            <div className="flex items-center justify-between py-2" key={key}>
              <label className="font-opensans text-base flex-1">{label}*</label>
              <div className="flex-1 flex flex-col items-end">
                <div className="relative">
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">
                    Choose File
                  </button>
                  <input
                    type="file"
                    accept={key === 'companyLogo' ? 'image/*' : undefined}
                    onChange={e => handleDocumentChange(key, e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {doc.file && (
                  <div className="mt-2 flex items-center space-x-2">
                    {doc.previewUrl ? (
                      <img src={doc.previewUrl} alt={label} className="h-16 w-16 object-cover rounded" />
                    ) : (
                      <>
                        <FileText size={24} className="text-gray-600" />
                        <span className="text-gray-700 text-sm truncate max-w-xs">
                          {truncateFileName(doc.file.name)}
                        </span>
                      </>
                    )}
                  </div>
                )}
                {doc.error && <p className="text-red-500 text-xs mt-1">{doc.error}</p>}
              </div>
            </div>
          );
        })}
        </div>
        
        {/* Submit Button */}
        <div className="mt-8">
          <CustomButton name="Submit" containerStyle="w-full text-white" handlePress={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
