interface ButtonProps {
  name: string;
  icon?: any;
  containerStyle?: string;
  textStyle?: string;
  handlePress?: any;
}

export function CustomButton({name, icon, containerStyle, textStyle, handlePress}: ButtonProps) {
  return (
    <div className={`${containerStyle} bg-dpurple hover:opacity-80 rounded-[5px] cursor-pointer h-[7vh] flex items-center justify-center`} onClick={handlePress}>
        <p className={`${textStyle} text-center font-opensans font-bold `}>{name}</p>
        {icon}
    </div>
  )
}
