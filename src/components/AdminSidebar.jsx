import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Users, ClipboardList, CreditCard,MessageSquare, Settings, ChevronLeft, ChevronRight, LogOut, Star, Tag, Bell } from 'lucide-react';

const AdminSidebar = ({ isCollapsed, toggleSidebar }) => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  if (userRole !== 'admin') {
    return null;
  }

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { path: '/admin/customers', label: 'Customers', icon: Users },
    { path: '/admin/payments', label: 'Payments', icon: CreditCard },
    { path: '/admin/offers', label: 'Offers', icon: Tag },
    { path: '/admin/blogs', label: 'Blog', icon: ClipboardList } ,
    { path: '/admin/feedback', label: ' Customer Feedback', icon: MessageSquare},
    { path: '/admin/notifications', label: 'Notifications', icon: Bell },  
    { path: '/admin/account', label: 'Settings', icon: Settings }
  ];

  const handleLogoutAndNavigateHome = () => {
    console.log('Logging out...');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    console.log('Session cleared!');
    navigate('/');
  };

  return (
    <div
      className={`d-flex flex-column vh-100 shadow-lg position-fixed ${isCollapsed ? 'collapsed-sidebar' : ''}`}
      style={{
        width: isCollapsed ? "90px" : "260px",
        transition: "width 0.3s ease-in-out",
        background: "#4B0082",
        borderRight: "4px solid #FFD700", // Golden Yellow Border
        color: "#333",
      }}
    >
      <div className="d-flex align-items-center justify-content-between p-3">
        <div className="d-flex align-items-center">
        <span className="fs-4 fw-bold text-white">{isCollapsed ? 'CR' : 'Car Rental'}</span>

        </div>
        <button
          className="btn btn-light btn-sm"
          onClick={toggleSidebar}
          style={{ borderRadius: '50%', width: '32px', height: '32px', padding: '0' }}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-3">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <Link
            to={path}
            key={path}
            className="d-flex align-items-center p-3 text-white text-decoration-none hover-effect"
            style={{ borderRadius: '8px', margin: '0 10px', transition: 'background 0.2s' }}
          >
            <Icon size={24} className="me-3" />
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-3">
        <button
          className="btn btn-danger w-100 d-flex align-items-center"
          onClick={handleLogoutAndNavigateHome}
          style={{ borderRadius: '8px', backgroundColor: '#FF4A4A', border: 'none', transition: 'background 0.2s' }}
        >
          <LogOut size={20} className="me-3" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
