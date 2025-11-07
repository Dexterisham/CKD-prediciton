import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const AccuracyIcon: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-secondary-purple" }) => (
    <IconWrapper className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
    </IconWrapper>
);

export const FastIcon: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-secondary-purple" }) => (
    <IconWrapper className={className}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </IconWrapper>
);

export const AlgorithmIcon: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-secondary-purple" }) => (
    <IconWrapper className={className}>
        <path d="M12 20v-10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
    </IconWrapper>
);

export const EasyUseIcon: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-secondary-purple" }) => (
    <IconWrapper className={className}>
        <path d="M20 6 9 17l-5-5" />
    </IconWrapper>
);
