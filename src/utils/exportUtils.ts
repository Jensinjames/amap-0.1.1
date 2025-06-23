// Export utilities with dynamic imports for better performance
import toast from 'react-hot-toast';

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'txt';
  filename: string;
  content: any;
  title: string;
}

// Dynamic import for jsPDF
const loadJsPDF = async () => {
  const { default: jsPDF } = await import('jspdf');
  return jsPDF;
};

// Dynamic import for html2canvas
const loadHtml2Canvas = async () => {
  const { default: html2canvas } = await import('html2canvas');
  return html2canvas;
};

// Dynamic import for docx
const loadDocx = async () => {
  const { Document, Packer, Paragraph, TextRun } = await import('docx');
  return { Document, Packer, Paragraph, TextRun };
};

export const exportToPDF = async (options: ExportOptions) => {
  try {
    toast.loading('Preparing PDF export...', { id: 'pdf-export' });
    
    const jsPDF = await loadJsPDF();
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text(options.title, 20, 30);
    
    // Add content
    doc.setFontSize(12);
    const contentText = typeof options.content === 'object' 
      ? JSON.stringify(options.content, null, 2)
      : options.content.toString();
    
    // Split text into lines that fit the page width
    const lines = doc.splitTextToSize(contentText, 170);
    doc.text(lines, 20, 50);
    
    // Save the PDF
    doc.save(`${options.filename}.pdf`);
    
    toast.success('PDF exported successfully!', { id: 'pdf-export' });
  } catch (error) {
    console.error('Error exporting PDF:', error);
    toast.error('Failed to export PDF', { id: 'pdf-export' });
  }
};

export const exportToDocx = async (options: ExportOptions) => {
  try {
    toast.loading('Preparing DOCX export...', { id: 'docx-export' });
    
    const { Document, Packer, Paragraph, TextRun } = await loadDocx();
    
    const contentText = typeof options.content === 'object' 
      ? JSON.stringify(options.content, null, 2)
      : options.content.toString();
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: options.title,
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: contentText,
                size: 24,
              }),
            ],
          }),
        ],
      }],
    });
    
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${options.filename}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('DOCX exported successfully!', { id: 'docx-export' });
  } catch (error) {
    console.error('Error exporting DOCX:', error);
    toast.error('Failed to export DOCX', { id: 'docx-export' });
  }
};

export const exportToText = (options: ExportOptions) => {
  try {
    const contentText = typeof options.content === 'object' 
      ? JSON.stringify(options.content, null, 2)
      : options.content.toString();
    
    const fullContent = `${options.title}\n\n${contentText}`;
    const blob = new Blob([fullContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${options.filename}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Text file exported successfully!');
  } catch (error) {
    console.error('Error exporting text:', error);
    toast.error('Failed to export text file');
  }
};

export const exportContent = async (options: ExportOptions) => {
  switch (options.format) {
    case 'pdf':
      await exportToPDF(options);
      break;
    case 'docx':
      await exportToDocx(options);
      break;
    case 'txt':
      exportToText(options);
      break;
    default:
      toast.error('Unsupported export format');
  }
};