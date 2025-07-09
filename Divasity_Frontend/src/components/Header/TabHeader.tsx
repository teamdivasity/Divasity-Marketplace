import { Link } from "react-router-dom";
interface HeaderProps {
  name: string;
  icon?: React.ReactNode;
  icon2?: React.ReactNode;
  containerStyle?: string;
  textStyle?: string;
  iconContainer?: string;
  handlePress?: () => void;
}
  
  export function TabHeader({
    name,
    icon,
    icon2,
    containerStyle = "",
    textStyle = "",
    iconContainer = "",
    handlePress,
  }: HeaderProps) {
    return (
      <div 
        className={`${containerStyle} bg-green-500 fixed top-0 flex justify-between px-5 items-center w-full pt-3 pb-4`}
        onClick={handlePress}
      >
        {/* Icon container (fixed width) */}
        <div className={`${iconContainer}`}>
          <Link to="/notifications">{icon}</Link> 
          <Link to="/profile">{icon2}</Link>
        </div>
        
        {/* Centered text (takes remaining space) */}
        <div className="">
          <h2 className={`${textStyle} text-center font-poppins font-semibold text-[25px]`}>{name}</h2>
        </div>
        
      </div>
    );
  }