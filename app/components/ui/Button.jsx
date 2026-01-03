'use client';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'default', 
  onClick, 
  ...props 
}) => {
  const baseClasses = "rounded font-medium transition-colors";
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
  };
  const sizes = {
    default: "px-4 py-2",
    icon: "w-10 h-10 flex items-center justify-center",
    sm: "px-3 py-1 text-sm",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;