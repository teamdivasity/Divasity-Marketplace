interface HeaderProps {
    name: string;
    icon?: React.ReactNode;
    containerStyle?: string;
    textStyle?: string;
    iconContainer?: string;
    rightSpace?: string;
    handlePress?: () => void;
  }
  
  export function Header({
    name,
    icon,
    containerStyle = "",
    textStyle = "",
    iconContainer = "",
    rightSpace = "",
    handlePress,
  }: HeaderProps) {
    return (
      <div 
        className={`${containerStyle} bg-orange-600 flex items-center w-full h-[7vh]`}
        onClick={handlePress}
      >
        {/* Icon container (fixed width) */}
        <div className={`${iconContainer}w-10 flex justify-center`}>
          {icon}
        </div>
        
        {/* Centered text (takes remaining space) */}
        <div className="flex-1 flex justify-center">
          <h2 className={`${textStyle} text-center font-poppins font-semibold text-[20px]`}>{name}</h2>
        </div>
        
        {/* Empty div to balance the icon space */}
        <div className={`${rightSpace}w-10`}></div>
      </div>
    );
  }