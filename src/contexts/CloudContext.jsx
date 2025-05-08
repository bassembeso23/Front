import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "../hooks/use-toast";

const CloudContext = createContext(null);

export const CloudProvider = ({ children }) => {
    const [cloudProvider, setCloudProvider] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cloudFiles, setCloudFiles] = useState([]);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        // Check if there's a selected cloud provider in localStorage
        const savedCloudProvider = localStorage.getItem('selectedCloud');

        if (savedCloudProvider) {
            setCloudProvider(savedCloudProvider);
            setIsConnected(true);
            fetchMockCloudFiles(savedCloudProvider);
        } else {
            setIsLoading(false);
            // No cloud provider selected, redirect to selection page if not already there
            if (window.location.pathname !== '/select-cloud') {
                navigate('/select-cloud');
            }
        }
    }, [navigate]);

    const fetchMockCloudFiles = (provider) => {
        // This is a mock implementation that would be replaced with real API calls
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            const mockFiles = generateMockFiles(provider);
            setCloudFiles(mockFiles);
            setIsLoading(false);

            toast({
                title: "Connected to " + provider,
                description: `Successfully fetched ${mockFiles.length} files from your account.`,
            });
        }, 1500);
    };

    const disconnectCloud = () => {
        localStorage.removeItem('selectedCloud');
        setCloudProvider(null);
        setIsConnected(false);
        setCloudFiles([]);
        navigate('/select-cloud');

        toast({
            title: "Disconnected",
            description: "Cloud account has been disconnected.",
        });
    };

    // Mock file generator based on cloud provider
    const generateMockFiles = (provider) => {
        const baseFiles = [
            { id: 1, name: 'Project Proposal', type: 'pdf', size: '2.4 MB', modified: '2023-04-20', cloud: provider, content: 'This project aims to revolutionize how we approach cloud storage integrations...' },
            { id: 2, name: 'Team Photo', type: 'jpg', size: '3.1 MB', modified: '2023-04-18', cloud: provider, content: 'Image content cannot be indexed' },
            { id: 3, name: 'App Source Code', type: 'zip', size: '15.2 MB', modified: '2023-04-15', cloud: provider, content: 'React components, API integrations, utility functions' },
            { id: 4, name: 'Financial Report', type: 'xlsx', size: '1.8 MB', modified: '2023-04-10', cloud: provider, content: 'Q1 earnings, expense reports, revenue projections for 2023' },
            { id: 5, name: 'Meeting Notes', type: 'docx', size: '0.5 MB', modified: '2023-04-05', cloud: provider, content: 'Discussion about new feature implementations and timeline adjustments' },
            { id: 6, name: 'Product Mockups', type: 'png', size: '4.2 MB', modified: '2023-04-02', cloud: provider, content: 'Image content cannot be indexed' },
            { id: 7, name: 'Client Contract', type: 'pdf', size: '1.2 MB', modified: '2023-03-28', cloud: provider, content: 'Terms and conditions for the new client engagement starting May 2023' },
            { id: 8, name: 'Presentation', type: 'pptx', size: '6.7 MB', modified: '2023-03-25', cloud: provider, content: 'Company overview, product roadmap, market analysis' },
        ];

        // Customize files slightly based on provider
        return baseFiles.map(file => ({
            ...file,
            id: file.id + (provider === 'Google Drive' ? 100 : provider === 'Dropbox' ? 200 : 300),
        }));
    };

    const searchFilesContent = (query) => {
        if (!query.trim()) return cloudFiles;

        const lowercaseQuery = query.toLowerCase();
        return cloudFiles.filter(file =>
            file.name.toLowerCase().includes(lowercaseQuery) ||
            (file.content && file.content.toLowerCase().includes(lowercaseQuery))
        );
    };

    const value = {
        cloudProvider,
        isConnected,
        isLoading,
        cloudFiles,
        disconnectCloud,
        searchFilesContent
    };

    return (
        <CloudContext.Provider value={value}>
            {children}
        </CloudContext.Provider>
    );
};

export const useCloud = () => {
    const context = useContext(CloudContext);
    if (!context) {
        throw new Error('useCloud must be used within a CloudProvider');
    }
    return context;
};
