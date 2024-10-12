import { Issue } from "@/app/dashboard/page";
import Files from "@/components/Files";

interface IssueDetailsProps {
  issue: Issue;
  onBack: () => void;
}

export default function IssueDetails({ issue, onBack }: IssueDetailsProps) {
  const renderMedia = (alt: string) => {
    return issue.fileNames.map((name, index) => (
      <Files
        key={name}
        cid={issue.cidList}
        alt={`${alt} media ${index + 1}`}
        fileName={name}
        id={name}
      />
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        aria-label="Go back to the list of issues"
      >
        Go Back to Issues
      </button>

      {/* Issue Title */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{issue.title}</h2>

      {/* Issue Metadata */}
      <p className="text-sm text-gray-600 mb-2">
        <strong>Reported on:</strong> {issue.date}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Category:</strong> {issue.category}
      </p>

      {/* Issue Description */}
      <h3 className="text-lg font-semibold mb-2 text-gray-700">What's the issue?</h3>
      <p className="mb-4 text-gray-800">{issue.description}</p>

      {/* Issue Status */}
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Current Status</h3>
      <p className="mb-4 text-gray-800">{issue.status}</p>

       {/* Media Section */}
      {issue.cidList && issue.cidList.length > 0 ? (
        <>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Photos</h3>
          <div className="media-gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {renderMedia(issue.title)}
          </div>
        </>
      ) : (
        <p className="text-gray-600">No media files attached to this issue.</p> // Fallback for no media
      )}
    </div>
  );
}