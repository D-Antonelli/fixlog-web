"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import { Issue } from '@/app/dashboard/page';

interface IssueFormProps {
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
}

export default function IssueForm({ setIssues }: IssueFormProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Add new issue to the list (dummy function, no actual API call)
    const newIssue: Issue = {
        id: Math.random(),
        title,
        status: 'Reported',
        date: new Date().toISOString().slice(0, 10),
        description,
        category
    };
    setIssues((prevIssues) => [newIssue, ...prevIssues]);

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setFiles(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value) }
          required
        >
          <option value="">Select a Category</option>
          <option value="plumbing">Plumbing</option>
          <option value="electrical">Electrical</option>
          <option value="appliance">Appliance</option>
          <option value="general">General</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
        <input
          type="file"
          className="w-full"
          onChange={handleFileChange}
          multiple
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Submit Issue
      </button>
    </form>
  );
}