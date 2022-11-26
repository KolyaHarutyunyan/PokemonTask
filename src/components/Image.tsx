import "./Image.css";
import clsx from "clsx";

interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imgURL: string;
}

const Image: React.FC<IImageProps> = ({imgURL, className, ...props }) => {
    return (
        <>
            {
                imgURL.trim() !== "" ? (
                    <img
                        src={imgURL}
                        className={clsx(className, "img")}
                        {...props}
                    />
                ) : null
            }
        </>
    );
};

export default Image;