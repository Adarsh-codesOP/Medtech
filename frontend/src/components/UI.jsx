import { motion } from 'framer-motion';
import { cn } from '../utils/helpers';

export const Button = ({
    children,
    variant = 'primary',
    className,
    icon: Icon,
    ...props
}) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(variants[variant], className)}
            {...props}
        >
            {Icon && <Icon className="w-5 h-5 mr-2 inline-block" />}
            {children}
        </motion.button>
    );
};

export const Card = ({ children, className, glass = true, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(glass ? 'glass-card' : 'bg-white dark:bg-dark-surface shadow-lg rounded-2xl p-6', className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const Input = ({ label, error, icon: Icon, className, ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                )}
                <input
                    className={cn(
                        'input-field',
                        Icon && 'pl-11',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export const Badge = ({ children, variant = 'default', className, ...props }) => {
    const variants = {
        default: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
        success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
        warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
        danger: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
        info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

export const LoadingSpinner = ({ size = 'md', className }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className={cn('flex items-center justify-center', className)}>
            <div className={cn(
                'animate-spin rounded-full border-4 border-gray-300 border-t-green-500',
                sizes[size]
            )} />
        </div>
    );
};

export const Modal = ({ isOpen, onClose, title, children, className }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                    'relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto',
                    className
                )}
            >
                {title && (
                    <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
                <div className="p-6">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};
