import React, { useState } from 'react';
import { FolderSync as Sync, Check, AlertCircle, RefreshCw } from 'lucide-react';

interface SyncStatusProps {
  onSync: () => Promise<void>;
  lastSyncTime?: Date;
}

export const SyncStatus: React.FC<SyncStatusProps> = ({
  onSync,
  lastSyncTime
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncStatus('idle');
    console.log('User initiated sync...');
    
    try {
      await onSync();
      setSyncStatus('success');
      console.log('Sync completed successfully');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      console.error('Sync failed with error:', error);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 5000);
    } finally {
      setIsSyncing(false);
    }
  };

  const getStatusIcon = () => {
    if (isSyncing) {
      return <RefreshCw className="h-4 w-4 animate-spin" />;
    }
    
    switch (syncStatus) {
      case 'success':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Sync className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    if (isSyncing) return 'Syncing...';
    
    switch (syncStatus) {
      case 'success':
        return 'Synced';
      case 'error':
        return 'Sync failed';
      default:
        return 'Sync';
    }
  };

  const getStatusColor = () => {
    switch (syncStatus) {
      case 'success':
        return 'text-green-600 hover:text-green-700';
      case 'error':
        return 'text-red-600 hover:text-red-700';
      default:
        return 'text-gray-600 hover:text-gray-700';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleSync}
        disabled={isSyncing}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${getStatusColor()}`}
        title={lastSyncTime ? `Last synced: ${lastSyncTime.toLocaleString()}` : 'Sync with Google Calendar'}
      >
        {getStatusIcon()}
        <span className="text-sm font-medium">{getStatusText()}</span>
      </button>
      
      {lastSyncTime && (
        <span className="text-xs text-gray-500">
          {new Date().getTime() - lastSyncTime.getTime() < 60000
            ? 'Just now'
            : `${Math.floor((new Date().getTime() - lastSyncTime.getTime()) / 60000)}m ago`}
        </span>
      )}
    </div>
  );
};