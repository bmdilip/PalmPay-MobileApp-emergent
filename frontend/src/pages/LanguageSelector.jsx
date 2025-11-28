import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Check, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../i18n/translations';

const LanguageSelector = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white px-5 py-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Language / भाषा</h1>
              <p className="text-xs text-white/80">Choose your preferred language</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        <Card className="p-4 bg-blue-50 border-blue-200 mb-6">
          <div className="flex gap-3">
            <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Multi-Language Support</p>
              <p className="text-xs text-gray-600">
                PalmPay supports 6 Indian languages. Select your preferred language to use the app in your native language.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          {languages.map((lang) => (
            <Card
              key={lang.code}
              className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                language === lang.code ? 'border-2 border-[#586BFF] bg-[#586BFF]/5' : ''
              }`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{lang.nativeName}</p>
                  <p className="text-sm text-gray-500">{lang.name}</p>
                </div>
                {language === lang.code && (
                  <div className="w-8 h-8 bg-[#586BFF] rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            ℹ️ More languages coming soon: Marathi, Bengali, Gujarati, Punjabi, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;