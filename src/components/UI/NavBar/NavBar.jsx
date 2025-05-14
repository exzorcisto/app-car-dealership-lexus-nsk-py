import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

function NavBar({ children, ...props }) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <nav {...props} className="nav-bar">
      <div className="nav-bar__container">
        <Link to="/" className="nav-bar__home-link">Главная</Link>
        
        {pathSegments.length > 0 && <span className="nav-bar__separator">\</span>}
        
        <div className="nav-bar__breadcrumbs">
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            
            return (
              <React.Fragment key={path}>
                {!isLast ? (
                  <Link to={path} className="nav-bar__breadcrumb-link">
                    {segment}
                  </Link>
                ) : (
                  <span className="nav-bar__current-page">
                    {children || segment}
                  </span>
                )}
                {!isLast && <span className="nav-bar__separator">\</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;