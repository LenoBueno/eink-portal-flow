
import { useState } from "react";
import { CameraIcon, CheckCircle2 } from "lucide-react";

interface ProductImageUploadProps {
  initialImage?: string;
  onChange: (image: string) => void;
}

const ProductImageUpload = ({ initialImage, onChange }: ProductImageUploadProps) => {
  const [image, setImage] = useState<string | undefined>(initialImage);
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleImageClick = () => {
    // Simulate image upload by using file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImage(result);
          onChange(result);
        };
        
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };
  
  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 text-center">
        <span className="text-sm text-muted-foreground">Imagem do Produto</span>
      </div>
      <div 
        onClick={handleImageClick} 
        className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden"
      >
        {image ? (
          <img 
            src={image} 
            alt="Product" 
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <CameraIcon className="h-8 w-8 text-gray-400" />
            <span className="mt-1 text-xs text-gray-500">
              Clique para adicionar
            </span>
          </>
        )}
      </div>
      
      <button
        type="button"
        onClick={toggleActive}
        className={`mt-3 flex items-center px-3 py-1 rounded-full text-sm ${
          isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        }`}
      >
        <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
        {isActive ? 'Ativo' : 'Inativo'}
      </button>
    </div>
  );
};

export default ProductImageUpload;
