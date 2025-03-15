"use client"
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";


const Upload = () => {
  const [patientId, setPatientId] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);


  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      // setFiles(prev => [...prev, ...newFiles]);
      // toast.success(`${newFiles.length} files uploaded successfully`);
      handleNewFiles(newFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      // setFiles(prev => [...prev, ...newFiles]);
      // toast.success(`${newFiles.length} files uploaded successfully`);
      handleNewFiles(newFiles);
    }
  };

  const handleNewFiles = (newFiles: File[]) => {
    // Filter for image and PDF files
    const validFiles = newFiles.filter(file => 
      file.type.startsWith('image/') || file.type === 'application/pdf'
    );
    
    if (validFiles.length !== newFiles.length) {
      toast.warning(`Some files were skipped. Only images and PDFs are allowed.`);
    }
    
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} files uploaded successfully`);
    }
  };
  
  const handlePreview = (file: File) => {
    // Create object URL for the file
    const fileUrl = URL.createObjectURL(file);
    setPreviewFile(fileUrl);
    setShowPreview(true);
  };

  const closePreview = () => {
    if (previewFile) {
      URL.revokeObjectURL(previewFile);
    }
    setPreviewFile(null);
    setShowPreview(false);
  };


  const handleUpload = () => {
    if (!patientId.trim()) {
      toast.error('Patient ID is required');
      return;
    }
    
    if (!selectedDate) {
      toast.error('Date is required');
      return;
    }
    
    if (files.length === 0) {
      toast.error('Please upload at least one file');
      return;
    }
    
    toast.success('Samples uploaded successfully!');
    
    // Reset form
    setPatientId('');
    setSelectedDate(undefined);
    setFiles([]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    toast.info('File removed');
  };

  return (
    <div className='mt-12'>
      <div className="flex-1 flex items-center justify-center p-6 bg-health-purple/10">
        <div className="w-full max-w-3xl mx-auto animate-scale">
          <h1 className="text-4xl font-extrabold mb-6 text-center">
            Upload Patient Handwriting Samples
          </h1>
          
          <div className="space-y-6 bg-gray-700 px-6 py-6 rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="patientId" className="block text-medium font-medium text-white mb-1">
                  Patient ID
                </label>
                <input
                  id="patientId"
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full px-4 py-1.5 rounded-lg border hover:border-purple-700 text-white"
                  placeholder="Enter patient ID"
                />
              </div>
              
              <div>
                <label className="block text-medium font-medium text-white mb-1">
                  Date of Collection
                </label>
                <Popover>
                   <PopoverTrigger asChild>
                     <Button
                       variant="outline"
                       className={cn(
                         "w-full px-4 py-4 rounded-lg border hover:border-purple-700 text-white justify-start text-left font-normal",
                         !selectedDate && "text-white"
                       )}
                     >
                       {selectedDate ? (
                         format(selectedDate, "PPP")
                       ) : (
                         <span>Select date</span>
                       )}
                       <CalendarIcon className="ml-auto h-5 w-5 text-health-purple" />
                     </Button>
                   </PopoverTrigger>
                   <PopoverContent className="w-auto p-0 bg-health-dark-gray border border-health-purple/40">
                     <Calendar
                       mode="single"
                       selected={selectedDate}
                       onSelect={setSelectedDate}
                       initialFocus
                       className="p-3 pointer-events-auto"
                     />
                   </PopoverContent>
                 </Popover>
              </div>
            </div>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors ${
                isDragging 
                  ? 'border-health-purple bg-health-purple/10' 
                  : 'border-health-gray/50 hover:border-health-purple/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <svg 
                className={`w-16 h-16 mb-4 ${isDragging ? 'text-health-purple' : 'text-white/50'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
              
              <p className="text-center mb-4 text-white/70">
                Drag and drop your handwriting samples here
              </p>
              
              <div className="text-sm text-health-purple-light">
                {files.length > 0 ? `${files.length} files selected` : 'No files selected'}
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <label className="pill-button bg-health-purple text-white hover:bg-health-purple/90 transition-colors px-4 py-2 rounded-full flex items-center cursor-pointer px-4 py-2 flex rounded-full text-sm font-medium transition-all duration-300 bg-purple-900 ">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                Browse Files
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                />
              </label>
              
              <button 
                className="px-4 py-2 flex rounded-full text-sm font-medium transition-all duration-300 bg-orange-800 text-white/70 hover:bg-orange-700 hover:text-white"
                onClick={handleUpload}
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Samples
              </button>
            </div>
            
            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2 text-health-purple-light">Selected Files:</h3>
                <div className="bg-health-gray/50 rounded-lg p-2 max-h-40 overflow-y-auto">
                  <ul className="space-y-1">
                    {files.map((file, index) => (           
                      <li key={index} className="text-sm text-white/70 flex items-center justify-between p-2 hover:bg-health-purple/10 rounded-md">
                      <div className="flex items-center overflow-hidden">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0 text-health-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="truncate">{file.name} - {(file.size / 1024).toFixed(2)} KB</span>
                      </div>
                      <div className="flex space-x-2 ml-2">
                        <button
                          onClick={() => handlePreview(file)}
                          className="text-health-purple hover:text-health-purple-light"
                          title="Preview"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-health-orange hover:text-health-orange/70"
                          title="Remove"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>             
              </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
         <DialogContent className="max-w-3xl max-h-screen overflow-hidden" onInteractOutside={closePreview}>
           <DialogHeader>
             <DialogTitle className="text-health-purple">File Preview</DialogTitle>
           </DialogHeader>
           <div className="mt-2 max-h-[70vh] overflow-auto">
             {previewFile && (
               previewFile.endsWith('.pdf') ? (
                 <iframe 
                   src={previewFile} 
                   className="w-full h-[70vh]" 
                   title="PDF Preview"
                 />
               ) : (
                 <img 
                   src={previewFile} 
                   alt="File Preview" 
                   className="max-w-full h-auto mx-auto"
                 />
               )
             )}
           </div>
         </DialogContent>
       </Dialog>    
    </div>
  );
};

export default Upload;