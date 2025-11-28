import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Loader2, AlertCircle, Inbox, WifiOff } from 'lucide-react';

// Loading Skeleton
export const LoadingSkeleton = ({ rows = 3 }) => (
  <div className="space-y-4">
    {[...Array(rows)].map((_, i) => (
      <Card key={i} className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </Card>
    ))}
  </div>
);

// Loading Spinner
export const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader2 className="w-12 h-12 text-[#586BFF] animate-spin mb-4" />
    <p className="text-sm text-gray-500">{message}</p>
  </div>
);

// Error State
export const ErrorState = ({ 
  title = 'Something went wrong', 
  message = 'Please try again', 
  onRetry,
  showRetry = true 
}) => (
  <Card className="p-8 text-center">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6">{message}</p>
      {showRetry && onRetry && (
        <Button onClick={onRetry} className="bg-[#586BFF]">
          Try Again
        </Button>
      )}
    </div>
  </Card>
);

// Empty State
export const EmptyState = ({ 
  title = 'No data found', 
  message = 'Nothing to show here', 
  icon: Icon = Inbox,
  action 
}) => (
  <Card className="p-8 text-center">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6">{message}</p>
      {action}
    </div>
  </Card>
);

// Network Offline State
export const OfflineState = () => (
  <Card className="p-8 text-center">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <WifiOff className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">No Internet Connection</h3>
      <p className="text-sm text-gray-500">Please check your connection and try again</p>
    </div>
  </Card>
);

// Processing State
export const ProcessingState = ({ message = 'Processing your request...' }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <Card className="p-8 max-w-sm mx-4">
      <div className="flex flex-col items-center">
        <Loader2 className="w-16 h-16 text-[#586BFF] animate-spin mb-4" />
        <p className="text-center text-gray-700 font-medium">{message}</p>
      </div>
    </Card>
  </div>
);

export default {
  LoadingSkeleton,
  LoadingSpinner,
  ErrorState,
  EmptyState,
  OfflineState,
  ProcessingState
};
