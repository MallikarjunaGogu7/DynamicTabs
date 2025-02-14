import React, { useState } from 'react';
import './DynamicTabs.css';

const DynamicTabs = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Tab 1', content: 'Content for Tab 1' },
    { id: 2, title: 'Tab 2', content: 'Content for Tab 2' },
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [nextId, setNextId] = useState(3);

  const addTab = () => {
    const newTab = {
      id: nextId,
      title: `Tab ${nextId}`,
      content: `Content for Tab ${nextId}`,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
    setNextId(nextId + 1);
  };

  const removeTab = (id) => {
    if (tabs.length > 1) {
      const updatedTabs = tabs.filter((tab) => tab.id !== id);
      setTabs(updatedTabs);
      if (activeTab === id) {
        setActiveTab(updatedTabs[0].id);
      }
    }
  };

  return (
    <div className="tabs-container">
      <button className="add-tab" onClick={addTab}>
        Add Tab
      </button>
      <div className="tabs-header">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
            {tabs.length > 1 && (
              <button
                className="close-tab"
                aria-label={`Close ${tab.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="tabs-content">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default DynamicTabs;