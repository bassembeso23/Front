import React, { useState } from 'react';
import { 
  Grid, 
  List, 
  FileText, 
  Image, 
  FileCode,
  File,
  Download, 
  Trash2, 
  MoreHorizontal,
  Upload
} from 'lucide-react';

const FileManager = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [cloudFilter, setCloudFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Sample data
  const files = [
    { id: 1, name: 'Project Proposal', type: 'pdf', size: '2.4 MB', modified: '2023-04-20', cloud: 'Google Drive' },
    { id: 2, name: 'Team Photo', type: 'jpg', size: '3.1 MB', modified: '2023-04-18', cloud: 'Dropbox' },
    { id: 3, name: 'App Source Code', type: 'zip', size: '15.2 MB', modified: '2023-04-15', cloud: 'Terabox' },
    { id: 4, name: 'Financial Report', type: 'xlsx', size: '1.8 MB', modified: '2023-04-10', cloud: 'Google Drive' },
    { id: 5, name: 'Meeting Notes', type: 'docx', size: '0.5 MB', modified: '2023-04-05', cloud: 'Dropbox' },
    { id: 6, name: 'Product Mockups', type: 'png', size: '4.2 MB', modified: '2023-04-02', cloud: 'Google Drive' },
    { id: 7, name: 'Client Contract', type: 'pdf', size: '1.2 MB', modified: '2023-03-28', cloud: 'Terabox' },
    { id: 8, name: 'Presentation', type: 'pptx', size: '6.7 MB', modified: '2023-03-25', cloud: 'Dropbox' },
  ];

  const filterFiles = () => {
    return files.filter(file => {
      const matchesFileType = fileTypeFilter === 'all' || file.type === fileTypeFilter;
      const matchesCloud = cloudFilter === 'all' || file.cloud === cloudFilter;
      
      if (dateFilter === 'all') return matchesFileType && matchesCloud;
      
      const fileDate = new Date(file.modified);
      const today = new Date();
      
      switch(dateFilter) {
        case 'today':
          return matchesFileType && matchesCloud && 
            fileDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today.setDate(today.getDate() - 7));
          return matchesFileType && matchesCloud && fileDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
          return matchesFileType && matchesCloud && fileDate >= monthAgo;
        default:
          return matchesFileType && matchesCloud;
      }
    });
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <FileText size={24} className="text-red-500" />;
      case 'jpg':
      case 'png': return <Image size={24} className="text-blue-500" />;
      case 'zip':
      case 'code': return <FileCode size={24} className="text-purple-500" />;
      case 'docx':
      case 'txt': return <FileText size={24} className="text-blue-400" />;
      default: return <File size={24} className="text-gray-500" />;
    }
  };

  const getCloudColor = (cloud) => {
    switch(cloud) {
      case 'Google Drive': return 'bg-blue-100 text-blue-600';
      case 'Dropbox': return 'bg-indigo-100 text-indigo-600';
      case 'Terabox': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredFiles = filterFiles();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#006A71]">My Files</h2>
        
        <div className="flex items-center gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <button 
              className={`p-2 ${viewMode === 'grid' ? 'bg-[#48A6A7] text-white' : 'bg-white text-gray-500'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`p-2 ${viewMode === 'list' ? 'bg-[#48A6A7] text-white' : 'bg-white text-gray-500'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm text-gray-500">Filter by:</span>
        <select 
          className="border rounded-md px-3 py-1 text-sm"
          value={fileTypeFilter}
          onChange={(e) => setFileTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="pdf">PDF</option>
          <option value="jpg">Images</option>
          <option value="zip">Archives</option>
          <option value="docx">Documents</option>
        </select>
        
        <select 
          className="border rounded-md px-3 py-1 text-sm"
          value={cloudFilter}
          onChange={(e) => setCloudFilter(e.target.value)}
        >
          <option value="all">All Clouds</option>
          <option value="Google Drive">Google Drive</option>
          <option value="Dropbox">Dropbox</option>
          <option value="Terabox">Terabox</option>
        </select>
        
        <select 
          className="border rounded-md px-3 py-1 text-sm"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">Any Date</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
      
      {/* Upload Zone */}
      <div className="border-2 border-dashed border-[#9ACBD0] rounded-lg p-6 text-center mb-6 hover:bg-[#F2EFE7] transition-colors">
        <Upload size={32} className="mx-auto text-[#48A6A7] mb-2" />
        <p className="text-gray-600">Drag and drop files here or <span className="text-[#006A71] font-medium">browse files</span></p>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFiles.map(file => (
            <div key={file.id} className="card hover:border-[#9ACBD0] border border-transparent">
              <div className="flex justify-between items-start mb-3">
                {getFileIcon(file.type)}
                <div className="dropdown relative">
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
              
              <h3 className="font-medium text-gray-800 mb-1 truncate" title={file.name}>{file.name}</h3>
              <div className="text-xs text-gray-500 mb-2">{file.size} • {file.modified}</div>
              
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${getCloudColor(file.cloud)}`}>
                  {file.cloud}
                </span>
                
                <div className="flex gap-1">
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <Download size={14} />
                  </button>
                  <button className="p-1 rounded-full hover:bg-gray-100 text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3 text-gray-600 text-sm font-medium">Name</th>
                <th className="p-3 text-gray-600 text-sm font-medium">Type</th>
                <th className="p-3 text-gray-600 text-sm font-medium">Size</th>
                <th className="p-3 text-gray-600 text-sm font-medium">Modified</th>
                <th className="p-3 text-gray-600 text-sm font-medium">Cloud</th>
                <th className="p-3 text-gray-600 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map(file => (
                <tr key={file.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <span>{file.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-500">.{file.type}</td>
                  <td className="p-3 text-gray-500">{file.size}</td>
                  <td className="p-3 text-gray-500">{file.modified}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${getCloudColor(file.cloud)}`}>
                      {file.cloud}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <Download size={16} />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100 text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileManager;
