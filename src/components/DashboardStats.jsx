
import React from 'react';
import { HardDrive, FileText, Cloud, Clock } from 'lucide-react';

const StatsCard = ({ icon, title, value, unit }) => {
  return (
    <div className="stats-card flex items-center">
      <div className={`rounded-full p-3 bg-white/60 mr-3`}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold">{value} <span className="text-sm font-normal">{unit}</span></h3>
        <p className="text-sm text-[#006A71]/80">{title}</p>
      </div>
    </div>
  );
};

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard 
        icon={<HardDrive size={24} />} 
        title="Storage Used" 
        value="10.4" 
        unit="GB" 
      />
      <StatsCard 
        icon={<FileText size={24} />} 
        title="Total Files" 
        value="1,254" 
        unit="files" 
      />
      <StatsCard 
        icon={<Cloud size={24} />} 
        title="Connected Clouds" 
        value="3" 
        unit="" 
      />
      <StatsCard 
        icon={<Clock size={24} />} 
        title="Recent Files" 
        value="24" 
        unit="today" 
      />
    </div>
  );
};

export default DashboardStats;
