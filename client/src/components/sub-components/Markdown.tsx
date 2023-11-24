//@ts-nocheck
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MarkdownEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import 'github-markdown-css/github-markdown.css'

const Markdown = () => {
  const [markdownContent, setMarkdownContent] = useState(
    '# GitHub-Style Markdown Editor',
  )

  // Handle changes in the editor
  const handleEditorChange = ({ text }) => {
    setMarkdownContent(text)
  }

  return (
    <div className="github-markdown-body">
      {/* Editable Markdown Editor */}
      <MarkdownEditor
        value={markdownContent}
        onChange={handleEditorChange}
        style={{ height: '400px' }}
      />

      {/* Preview of the Markdown content */}
      <div>
        <h2>Preview</h2>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Markdown
