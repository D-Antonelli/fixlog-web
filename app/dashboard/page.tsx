"use client"

import { useState, useEffect } from 'react';
import IssueForm from '@/components/ui/dashboard/issue-form';
import IssueList from '@/components/ui/dashboard/issue-list';
import IssueDetails from '@/components/ui/dashboard/issue-details';

export interface Issue {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  date: string;
  fileNames: string[];
  cidList: string[]
}

export default function RenterDashboard() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  useEffect(() => {
    // Fetch issues data from API or use dummy data
    const dummyIssues: Issue[] = [
      {
        id: 1,
        title: 'Leaky Faucet',
        description: 'There is a continuous leak under the kitchen sink.',
        category: 'Plumbing',
        status: 'In Progress',
        date: '2024-10-05',
        fileNames: ["Screenshot 2024-10-11 at 12.26.26.png", "Screenshot 2024-10-10 at 12.34.46.png"],
        cidList: [
          'bafybeib5ecqf7lwhallnkhm7u4b7nswh7fsl5m2wvw27by7zdcmwocvfia',
        ],
      },
      {
        id: 2,
        title: 'Broken Heater',
        description: 'The heater stopped working and it is very cold.',
        category: 'Appliance',
        status: 'Resolved',
        date: '2024-09-28',
        fileNames: [],
        cidList: [
          'bafybeig5xfc7zzcpdnfgisgr3r3epfs2r3tmxim3c32kur5xewyfq2lkne',
        ],
      },
    ];
    setIssues(dummyIssues);
  }, []);

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleBackToList = () => {
    setSelectedIssue(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Renter Dashboard</h1>

        {selectedIssue ? (
          <IssueDetails issue={selectedIssue} onBack={handleBackToList} />
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Submit a New Issue</h2>
              <IssueForm setIssues={setIssues} />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Reported Issues</h2>
              <IssueList issues={issues} onIssueClick={handleIssueClick} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}