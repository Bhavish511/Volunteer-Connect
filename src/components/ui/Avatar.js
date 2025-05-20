import React from 'react';
import './Avatar.css';

const Avatar = (props) => {
  const {
    src,
    alt = '',
    size = 'medium',
    shape = 'circle',
    status,
    initials,
    className = '',
    ...restProps
  } = props;

  const avatarClasses = `
    avatar 
    avatar-${size} 
    avatar-${shape} 
    ${className}
  `;

  const renderContent = () => {
    if (src) {
      return <img src={src || "/placeholder.svg"} alt={alt} className="avatar-image" />;
    } else if (initials) {
      return <span className="avatar-initials">{initials}</span>;
    } else {
      return (
        <svg className="avatar-placeholder" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      );
    }
  };

  return (
    <div className={avatarClasses.trim()} {...restProps}>
      {renderContent()}
      {status && <span className={`avatar-status avatar-status-${status}`} />}
    </div>
  );
};

export default Avatar;
