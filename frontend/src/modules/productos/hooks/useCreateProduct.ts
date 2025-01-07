import { useState } from "react"
import { CREATE_PRODUCT_STEPS } from "@/modules/productos/constants"
import { addNewProduct, getAllCategories } from "@services/product";
import { useLoader } from "@/contexts/Loader";
import { useRouter } from "next/navigation";
import { useDelay } from "@/hooks/useDelay";
import { toast } from "sonner";
import { form } from "framer-motion/client";

export const useCreateProduct = () => {

  const { setLoading } = useLoader()
  const router = useRouter()


  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  const getCategories = async () => {
    const response = await getAllCategories()
    
    if (response.ok) {
      const categories = response.result.data
      return categories
    }

    return []
  }
  

  const createProduct = async (productData : AddProductModel, images : string[]) => {
    setLoading(true)
    try {
      await useDelay(2000)

      var response = await addNewProduct({ ...productData, images: images });

      if (!response.ok) {
        toast.error(response.messages[0].message)
        return
      }

      toast.success(response.message)

    router.replace('/admin/productos')
   } catch (error) {
    toast.error("Error al conectar al servidor")
   }finally {
    setLoading(false)
   }

  };



  return {
    imagesUrl,
    setImagesUrl,
    createProduct,
    getCategories
  }
}