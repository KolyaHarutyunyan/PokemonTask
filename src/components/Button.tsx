import "./Button.css";
import clsx from "clsx";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<IButtonProps> = ({ className, label, ...props }) => {
  return (
    <button className={clsx(className, "button")} {...props}>
      {label}
    </button>
  );
};

export default Button;
