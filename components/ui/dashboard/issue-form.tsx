"use client";

import { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import { Issue } from '@/app/dashboard/page';
import FilePreviewList from './file-preview-list';
import { returnFileSize, validFileType } from '@/utils/fileUtils';

interface IssueFormProps {
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
}

export default function IssueForm({ setIssues }: IssueFormProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [cids, setCids] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<JSX.Element | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [totalUploadedFileSize, setTotalUploadedFileSize] = useState("0");
  const inputFile = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    let totalSize = 0;
    const validFiles: File[] = [];

    for (const file of Array.from(selectedFiles)) {
      totalSize += file.size;
      if (!validFileType(file)) {
        alert(`File ${file.name} is not a valid file type.`);
        return;
      }
      if (totalSize > 2 * 1024 * 1024) {
        alert('Total file size must not exceed 2MB.');
        return;
      }
      validFiles.push(file);
    }

    setTotalUploadedFileSize(returnFileSize(totalSize));
    setFiles(validFiles);
    setPreview(<FilePreviewList files={validFiles} totalSize={returnFileSize(totalSize)} />);
  };

    // Convert files to base64 and save to localStorage
  const saveFilesToLocalStorage = (filesToSave: File[]) => {
    filesToSave.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          // Store file as base64 string in localStorage using file name as the key
          localStorage.setItem(file.name, reader.result as string);
        }
      };
      reader.readAsDataURL(file); // Convert file to base64
    });
  };

  const uploadFilesToPinata = async (filesToUpload: File[]) => {
    try {
      setUploading(true);
      const formData = new FormData();
      filesToUpload.forEach(file => formData.append('file', file, file.name));

      const request = await fetch('/api/files', { method: 'POST', body: formData });
      const response = await request.json();
      return response.IpfsHash;
    } catch (e) {
      console.error('Error uploading to Pinata:', e);
      throw new Error('Failed to upload to Pinata');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmissionToLocalStorage  = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newIssue: Issue = {
        id: Math.random(),
        title,
        description,
        category,
        status: 'Reported',
        date: new Date().toISOString().slice(0, 10),
        fileNames: files.map(file => file.name),
        cidList: [],
      };

      // Save files locally (in base64 format)
      saveFilesToLocalStorage(files);
      // Update the local state and localStorage
      setIssues(prevIssues => {
        const updatedIssues = [newIssue, ...prevIssues];
        localStorage.setItem('issues', JSON.stringify(updatedIssues)); // Save issues to localStorage
        return updatedIssues;
      });

      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setFiles([]);
      setPreview(null);
      if (inputFile.current) inputFile.current.value = '';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting the form. Please try again.');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const cid = await uploadFilesToPinata(files);
      setCids([cid]);

      const newIssue: Issue = {
        id: Math.random(),
        title,
        description,
        category,
        status: 'Reported',
        date: new Date().toISOString().slice(0, 10),
        fileNames: files.map(file => file.name),
        cidList: [cid],
      };

      setIssues(prevIssues => [newIssue, ...prevIssues]);

      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setFiles([]);
      setPreview(null);
      if (inputFile.current) inputFile.current.value = '';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting the form. Please try again.');
    }
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmissionToLocalStorage}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">What’s the title of the issue?</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={title}
          placeholder="Give a short and clear title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Can you describe the issue in more detail?</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          value={description}
          placeholder="Provide a detailed description of what’s wrong"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">What category does this issue fall under?</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Please select a category</option>
          <option value="plumbing">Plumbing Issues</option>
          <option value="electrical">Electrical Problems</option>
          <option value="appliance">Appliance Issues</option>
          <option value="general">General Maintenance</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="image_uploads" className="block text-sm font-medium text-gray-700 mb-2">
          Upload any photos or videos that can help us understand the issue (PNG, JPG, up to 2MB)
        </label>
        <input
          type="file"
          ref={inputFile}
          onChange={handleFileChange}
          id="image_uploads"
          className="w-full"
          name="image_uploads"
          accept=".jpg, .jpeg, .png"
          multiple
        />
      </div>

      {preview && <div className="preview mb-4">{preview}</div>}      

      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        disabled={uploading}
      >
        {uploading ? "Submitting..." : "Submit Issue"}
      </button>
    </form>
  );
}