"use client"

import { Issue } from "@/app/dashboard/page";

interface IssueListProps {
  issues: Issue[];
  onIssueClick: (issue: Issue) => void;
}

export default function IssueList({ issues, onIssueClick }: IssueListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {issues.length === 0 ? (
        <p className="text-center text-gray-500">No issues reported yet.</p>
      ) : (
        <ul>
          {issues.map((issue) => (
            <li
              key={issue.id}
              className="mb-4 p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              onClick={() => onIssueClick(issue)}
            >
              <h3 className="text-lg font-semibold">{issue.title}</h3>
              <p className="text-sm text-gray-600">Status: {issue.status}</p>
              <p className="text-sm text-gray-600">Reported on: {issue.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}