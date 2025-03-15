"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';

const AnalysisPage = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className=''>
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6 bg-purple-dark mt-12 z-10">
        <div className="w-full max-w-4xl mx-auto animate-scale relative backdrop-blur-lg bg-health-purple/10 border-health-purple/20">
          {/* Header Section */}
          <div className="border-b-2 border-health-gray/30 pb-4 mb-6">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-white">
                Handwriting Analysis
              </h1>
              <h2 className="text-xl text-health-orange mt-2">
                for Micrographia
              </h2>
            </div>
            
            <div className="mx-auto max-w-3xl text-center text-white/80 text-sm">
              A tool to monitor and track micrographia in Parkinson's Disease. 
              The system detects progressive shrinking in handwriting over time.
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-6 font-mono bg-gray-700 px-6 py-6 rounded-2xl">
            {/* Date Range Box */}
            <div className="bg-health-dark-gray/60 p-4 rounded-lg border border-health-purple/30">
              <div className="flex flex-wrap items-center justify-between">
                <span className="text-health-orange font-medium mr-2">Date Range:</span>
                <div className="flex items-center space-x-4">
                  <span className="text-health-purple-light bg-health-black/30 px-3 py-1 rounded">01/01/2023</span>
                  <span className="text-white">-</span>
                  <span className="text-health-purple-light bg-health-black/30 px-3 py-1 rounded">03/01/2023</span>
                </div>
              </div>
            </div>
            
            {/* Analysis Summary Box */}
            <div className="bg-health-dark-gray/60 p-4 rounded-lg border border-health-purple/30">
              <div className="flex items-start mb-3">
                <span className="text-white/80 mr-2">Analysis</span>
                <span className="text-health-orange text-lg font-semibold">Summary:</span>
              </div>
              <div className="pl-4 space-y-3">
                <p className="text-health-purple-light">
                  - Progressive shrinking <span className="text-white/70">of</span> handwriting size noted
                </p>
                <p className="flex flex-wrap text-white">
                  <span className="text-health-purple-light mr-1">over time,</span> 
                  <span className="text-health-purple-light mr-1">with</span> 
                  irregularity increasing 
                  <span className="text-health-purple-light mx-1">from</span> 
                  week <span className="text-health-orange font-medium">2</span>.
                </p>
              </div>
            </div>
            
            {/* Confidence Score */}
            <div className="bg-health-dark-gray/60 p-4 rounded-lg border border-health-purple/30">
              <div className="flex items-center justify-between">
                <span className="text-white text-lg">Confidence Score:</span>
                <div className="flex items-center">
                  <div className="w-40 h-3 bg-health-gray/50 rounded-full overflow-hidden mr-3">
                    <div className="h-full bg-health-orange" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-health-orange font-bold text-xl">85%</span>
                </div>
              </div>
            </div>
            
            {/* Samples Section */}
            <div className="bg-health-dark-gray/60 p-4 rounded-lg border border-health-purple/30">
              <h3 className="text-lg font-semibold text-health-orange mb-3">Handwriting Samples</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-health-black/30 p-2 rounded border border-health-gray/30 h-24 flex items-center justify-center">
                    <span className="text-white/50">Sample {i}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Progression Graph */}
            <div className="bg-health-dark-gray/60 p-4 rounded-lg border border-health-purple/30">
              <h3 className="text-lg font-semibold text-health-orange mb-3">Size Progression Chart</h3>
              
              <div className="grid grid-cols-4 text-center mb-2 text-health-purple-light">
                <div>Week <span className="text-health-orange">1</span></div>
                <div>Week <span className="text-health-orange">2</span></div>
                <div>Week <span className="text-health-orange">3</span></div>
                <div>Week <span className="text-health-orange">4</span></div>
              </div>
              
              <div className="relative h-20 mb-4">
                <div className="absolute inset-0 flex items-end">
                  <div className="flex-1 flex flex-col items-center justify-end h-full">
                    <div className="w-px h-full bg-white/20 absolute"></div>
                    <div className="z-10 bg-health-black/50 px-3 py-1 rounded-lg">
                      <span className="text-health-orange">2.0</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-end h-full">
                    <div className="w-px h-full bg-white/20 absolute"></div>
                    <div className="z-10 bg-health-black/50 px-3 py-1 rounded-lg" style={{marginBottom: '10%'}}>
                      <span className="text-health-orange">1.8</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-end h-full">
                    <div className="w-px h-full bg-white/20 absolute"></div>
                    <div className="z-10 bg-health-black/50 px-3 py-1 rounded-lg" style={{marginBottom: '20%'}}>
                      <span className="text-health-orange">1.6</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-end h-full">
                    <div className="w-px h-full bg-white/20 absolute"></div>
                    <div className="z-10 bg-health-black/50 px-3 py-1 rounded-lg" style={{marginBottom: '30%'}}>
                      <span className="text-health-orange">1.4</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <polyline
                    points="50,10 150,30 250,50 350,70"
                    fill="none"
                    stroke="#FF5A1F"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/upload" className="pill-button pill-button-orange flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {/* Upload Handwriting Sample */}
              </Link>
              
              <button className="pill-button pill-button-purple flex items-center" onClick={handleCopy}>
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {copied ? 'Copied!' : 'Download Full Report'}
              </button>
              
              <button className="pill-button bg-health-gray text-white hover:bg-health-gray/80 flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;