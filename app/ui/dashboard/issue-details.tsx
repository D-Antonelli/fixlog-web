import { Issue } from "@/app/dashboard/page";

interface IssueDetailsProps {
  issue: Issue;
  onBack: () => void;
}

export default function IssueDetails({ issue, onBack }: IssueDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <button
        onClick={onBack}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Back to Issues List
      </button>

      <h2 className="text-2xl font-bold mb-4">{issue.title}</h2>
      <p className="text-sm text-gray-600 mb-2">Reported on: {issue.date}</p>
      <p className="text-sm text-gray-600 mb-4">Category: {issue.category}</p>

      <h3 className="text-lg font-semibold mb-2">Description</h3>
      <p className="mb-4">{issue.description}</p>

      <h3 className="text-lg font-semibold mb-2">Status</h3>
      <p>{issue.status}</p>
    </div>
  );
}