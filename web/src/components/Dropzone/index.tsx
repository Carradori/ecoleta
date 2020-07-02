import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import "./styles.css";

interface IProps {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<IProps> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Imagem do estabelecimento" />
      ) : (
        <p>
          <FiUpload />
          Arraste o arquivo para essa área ou clique aqui
        </p>
      )}

      {isDragActive && <p>Solte o arquivo aqui...</p>}
    </div>
  );
};

export default Dropzone;
