import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import google from '../assets/googleDrive.jpg'
import dropbox from '../assets/dropbox-logo.png'
import terabox from '../assets/terabox.png'

const CloudSelect = () => {
    const navigate = useNavigate();

    const handleCloudSelect = (cloudProvider) => {
        // In a real implementation, this would initiate OAuth flow
        // For now, we'll simulate the process by storing the selection and navigating
        localStorage.setItem('selectedCloud', cloudProvider);

        // Simulate OAuth redirect and callback
        setTimeout(() => {
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary to-secondary flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-primary mb-4">Welcome to CloudFusion</h1>
                    <p className="text-gray-600 text-lg">Connect your cloud storage to access and search across all your files</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div
                        onClick={() => handleCloudSelect('Google Drive')}
                        className="border-2 border-gray-200 hover:border-secondary rounded-lg p-6 text-center cursor-pointer transition-all hover:shadow-md"
                    >
                        <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <img src={google} alt='Google drive'/>
                        </div>
                        <h3 className="text-primary font-semibold text-lg mb-2">Google Drive</h3>
                        <p className="text-gray-500 text-sm">Connect to your Google Drive account</p>
                    </div>

                    <div
                        onClick={() => handleCloudSelect('Dropbox')}
                        className="border-2 border-gray-200 hover:border-secondary rounded-lg p-6 text-center cursor-pointer transition-all hover:shadow-md"
                    >
                        <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <img src={dropbox} alt='Drop box'/>
                        </div>
                        <h3 className="text-primary font-semibold text-lg mb-2">Dropbox</h3>
                        <p className="text-gray-500 text-sm">Connect to your Dropbox account</p>
                    </div>

                    <div
                        onClick={() => handleCloudSelect('Terabox')}
                        className="border-2 border-gray-200 hover:border-secondary rounded-lg p-6 text-center cursor-pointer transition-all hover:shadow-md"
                    >
                        <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <img src={terabox} alt='Terabox'/>
                        </div>
                        <h3 className="text-primary font-semibold text-lg mb-2">Terabox</h3>
                        <p className="text-gray-500 text-sm">Connect to your Terabox account</p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <div className="flex items-start">
                        <div className="bg-primary rounded-full p-2 mr-4">
                            <Search size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-primary font-semibold text-lg mb-2">Advanced Search Features</h3>
                            <p className="text-gray-600">After connecting your cloud storage, CloudFusion will index your files for lightning-fast searches across all documents, images, and more.</p>
                        </div>
                    </div>
                </div>

                <div className="text-center text-primary text-sm">
                    <p>By connecting a cloud provider, you agree to our Terms of Service and Privacy Policy</p>
                </div>
            </div>
        </div>
    );
};

export default CloudSelect;
