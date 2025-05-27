import React from 'react';
import './Sidebar.css';

function Sidebar({
  setSidebarOpen,
  setShowDeletedModal,
  folders,
  onCreateFolder,
  onEditFolders,
  onSelectFolder,
  selectedFolder
}) {
  return (
    <div className="sidebar">
      {/* Collapse sidebar */}
      <button className="collapse-btn" onClick={() => setSidebarOpen(false)}>
        ❮
      </button>

      <h2 className="sidebar-title">Folders</h2>

      {/* Create folder */}
      <button className="folder-action" onClick={onCreateFolder}>
        ➕ Create New Folder
      </button>

      {/* Folder list */}
      <ul className="folder-list">
        {folders.map((folder) => (
          <li
            key={folder.id}
            className={selectedFolder === folder.name ? 'active' : ''}
            onClick={() => onSelectFolder(folder.name)}
          >
            📁 {folder.name}
          </li>
        ))}
      </ul>

      {/* Edit folders */}
      <button className="folder-action" onClick={onEditFolders}>
        ✏️ Edit Folders
      </button>

      {/* Recently Deleted */}
      <button
        className="folder-action"
        onClick={() => setShowDeletedModal(true)}
      >
        🗑 Recently Deleted
      </button>
    </div>
  );
}

export default Sidebar;
