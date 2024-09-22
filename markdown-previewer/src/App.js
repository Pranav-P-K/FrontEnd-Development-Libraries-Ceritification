import React, { useState } from "react";
import { marked } from "marked";
import './App.css'; // Import custom styles

const App = () => {
  const defaultMarkdown = `# Heading 1
## Subheading
[Link to Google](https://www.google.com)
\`Inline code\`
\`\`\`
Code block
\`\`\`
- List item
> Blockquote
![Image](https://via.placeholder.com/150)
**Bold text**
`;

  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="app">
      <h1 className="title">Markdown Previewer</h1>
      <div className="editor-preview-wrapper">
        <div className="editor-section">
          <h2 className="section-title">Editor</h2>
          <textarea
            id="editor"
            value={markdown}
            onChange={handleChange}
            className="textarea"
          />
        </div>
        <div className="preview-section">
          <h2 className="section-title">Preview</h2>
          <div
            id="preview"
            className="preview-box"
            dangerouslySetInnerHTML={{ __html: marked(markdown) }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
