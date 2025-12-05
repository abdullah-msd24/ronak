import React, { useState } from 'react';

interface TabProps {
  tabs: { label: string; content: React.ReactNode }[];
}

const Tabs: React.FC<TabProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs">
      <div className="tab-list flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button flex-1 py-2 text-center ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content p-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;