import React from 'react';
import { Cloud, CheckCircle, XCircle } from 'lucide-react';

const CloudAccounts = () => {
  // Sample data - in a real app this would be fetched from an API
  const accounts = [
    { id: 1, name: 'Google Drive', connected: true, storageUsed: '5.2 GB', totalStorage: '15 GB' },
    { id: 2, name: 'Dropbox', connected: true, storageUsed: '3.8 GB', totalStorage: '5 GB' },
    { id: 3, name: 'Terabox', connected: false, storageUsed: '0 GB', totalStorage: '1 TB' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold text-[#006A71] mb-4">Connected Cloud Accounts</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        {accounts.map(account => (
          <div key={account.id} className="border rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Cloud size={24} className="text-[#48A6A7]" />
                <span className="font-medium">{account.name}</span>
              </div>
              
              {account.connected ? (
                <CheckCircle size={20} className="text-green-500" />
              ) : (
                <XCircle size={20} className="text-red-500" />
              )}
            </div>
            
            {account.connected ? (
              <>
                <div className="text-sm text-gray-600 mb-2">
                  {account.storageUsed} used of {account.totalStorage}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-[#48A6A7] h-2 rounded-full" 
                    style={{ width: `${(parseFloat(account.storageUsed) / parseFloat(account.totalStorage.split(' ')[0]) * 100)}%` }}
                  ></div>
                </div>
                <button className="mt-auto btn-secondary text-sm">Disconnect</button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4">Connect your {account.name} account to access your files.</p>
                <button className="mt-auto btn-primary text-sm">Connect Account</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloudAccounts;
