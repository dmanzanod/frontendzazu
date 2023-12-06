import React, { useState } from 'react';

const FileUploadText = () => {
  const [textData, setTextData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        setTextData(data); // Store text file content
      };
      reader.readAsText(file); // Read text content
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".txt" // Allow only text files
        onChange={handleFileUpload}
      />
      {textData && (
        <div>
          <h3>Uploaded Text Data:</h3>
          <pre>{textData}</pre> {/* Display text file content */}
        </div>
      )}
    </div>
  );
};

export default FileUploadText;
