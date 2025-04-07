// src/components/ui/card.tsx
import React from 'react';

// Define a Card component
export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  );
};

// Define a CardContent component
export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="card-content">{children}</div>;
};

// You can add some basic styles to make the card visually appealing
const styles = `
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background-color: white;
    max-width: 400px;
    margin: 20px auto;
  }

  .card-content {
    padding: 20px;
  }
`;

export const CardStyles = () => {
  return <style>{styles}</style>;
};
