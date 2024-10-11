import { returnFileSize } from "@/utils/fileUtils";

interface FilePreviewListProps {
  files: File[];
  totalSize: string;
}

const FilePreviewList: React.FC<FilePreviewListProps> = ({ files, totalSize }) => {
  return (
    <div>
      <p>Total Size: {totalSize}</p>
      <ol>
        {files.map((file, index) => (
          <li key={index}>
            <img src={URL.createObjectURL(file)} alt={file.name} width={100} />
            <p>{file.name}, file size {returnFileSize(file.size)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FilePreviewList;