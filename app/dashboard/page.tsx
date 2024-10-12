"use client";

import { useState, useEffect } from 'react';
import IssueForm from '@/components/ui/dashboard/issue-form';
import IssueList from '@/components/ui/dashboard/issue-list';
import IssueDetails from '@/components/ui/dashboard/issue-details';
import { HomeIcon } from '@heroicons/react/24/outline';

export interface Issue {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  date: string;
  fileNames: string[];
  cidList: string[];
}

export default function RenterDashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

   useEffect(() => {
    // Dummy issues
    const dummyIssues: Issue[] = [
      {
        id: 1,
        title: 'Leaky Faucet',
        description: 'There is a continuous leak under the kitchen sink.',
        category: 'Plumbing',
        status: 'In Progress',
        date: '2024-10-05',
        fileNames: ["IMG_2914.jpeg", "IMG_2913.jpeg"],
        cidList: [
          'bafybeiavv6qilvucvtwo4ll7dlph6peudfxm7ojq4knygmdajm7bqrwndi',
        ],
      },
      {
        id: 2,
        title: 'Broken Heater',
        description: 'The heater stopped working and it is very cold.',
        category: 'Appliance',
        status: 'Resolved',
        date: '2024-09-28',
        fileNames: ["IMG_2917.jpeg", "IMG_2916.jpeg"],
        cidList: [
          'bafybeihnpg6oogm4oa5i2hovvbawzy2kzet2v5n36zpot5b4gfcag5wjgq',
        ],
      },
    ];

    // Check if issues already exist in localStorage
    const savedIssues = localStorage.getItem('issues');

    if (!savedIssues) {
      // If no issues exist in localStorage, initialize with dummy data
      localStorage.setItem('issues', JSON.stringify(dummyIssues));
      setIssues(dummyIssues); // Set issues to state
    } else {
      // Load issues from localStorage
      const localIssues = JSON.parse(savedIssues);
      setIssues(localIssues);
    }
  }, []);

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleBackToList = () => {
    setSelectedIssue(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
          <HomeIcon className="h-24 w-24 m-0 m-auto" />
          10 Victoria Road
        </h1>

        {selectedIssue ? (
          <IssueDetails issue={selectedIssue} onBack={handleBackToList} />
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Submit a New Issue</h2>
              <IssueForm setIssues={setIssues} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Reported Issues</h2>
              <IssueList issues={issues} onIssueClick={handleIssueClick} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}