import Image, { StaticImageData } from "next/image";

interface HexagonProps {
  src?: StaticImageData;
  alt?: string;
  size?: number; // Size in pixels
  borderWidth?: number;
  borderColor?: string;
 
}


const Hexagon: React.FC<HexagonProps> = ({
  src = "",
  alt = "Hex Image",
  size = 200,
  borderWidth = 4,
  borderColor = "black",
 
}) => {
  const outerSize = size;
  const innerSize = size - borderWidth * 2;

  return (
    <div
      className="relative"
      style={{
        width: outerSize,
        height: outerSize,
        clipPath: "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
        backgroundColor: borderColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `rotate(30deg)`,
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: innerSize,
          height: innerSize,
          clipPath: "inherit",
        }}
      >
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  );
};

export default Hexagon;
