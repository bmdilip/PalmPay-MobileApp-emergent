import React from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceLayout from '../../components/ServiceLayout';

const ComingSoon = ({ 
  title = 'Coming Soon', 
  subtitle = 'This service will be available soon',
  icon: Icon = Sparkles,
  iconColor = '#586BFF',
  headerGradient = 'from-[#586BFF] via-[#6B7AFF] to-[#8B8FFF]'
}) => {
  const navigate = useNavigate();

  return (
    <ServiceLayout
      title={title}
      subtitle={subtitle}
      icon={Icon}
      iconColor={iconColor}
      headerGradient={headerGradient}
    >
      <div className="min-h-[50vh] flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Coming Soon!</h2>
          <p className="text-gray-600 mb-6">
            We're working hard to bring this service to you. Stay tuned for updates!
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/services')} 
              className="w-full bg-[#586BFF]"
            >
              Browse Other Services
            </Button>
            <Button 
              onClick={() => navigate('/home')} 
              variant="outline" 
              className="w-full"
            >
              Go to Home
            </Button>
          </div>
        </Card>
      </div>
    </ServiceLayout>
  );
};

export default ComingSoon;
