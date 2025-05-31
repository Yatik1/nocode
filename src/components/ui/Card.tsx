import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Card({ children, className = '', ...props }: CardProps) {

  return (
    <div
      className={`border border-gray-200 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card