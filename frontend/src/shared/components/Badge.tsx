// Badge.tsx
import React from 'react';
import styles from '@shared/styles/components/badge.module.css';

interface BadgeProps {
    label: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'primary';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
    label,
    variant = 'default',
    size = 'md',
    onClick
}) => {
    const badgeClasses = [
        styles.badge,
        styles[variant],
        styles[size]
    ].join(' ');

    return <span className={badgeClasses} onClick={onClick}>{label}</span>;
};

export default Badge;