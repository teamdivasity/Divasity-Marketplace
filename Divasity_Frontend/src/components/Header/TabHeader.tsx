import { Link } from "react-router-dom";
import { images } from "../../constants";
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
        
        {/* Centered text with logo (takes remaining space) */}
        <div className="flex items-center justify-center gap-2">
          <img src={images.Logo} alt="Divasity" className="h-8 w-auto" />
          <h2 className={`${textStyle} font-poppins font-semibold text-[25px]`}>{name}</h2>
        </div>
        
      </div>
    );
  }