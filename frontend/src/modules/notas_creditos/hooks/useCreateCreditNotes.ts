import { useState } from "react"
import { addNewCreditNote } from "@services/creditnote";
import { useLoader } from "@/contexts/Loader";
import { useDelay } from "@/hooks/useDelay";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateCreditNotes = () => {

    const { setLoading } = useLoader()
    const router = useRouter()

    const [formData, setFormData] = useState<AddCreditNoteModel>({
        invoiceId: "",
        reason: "",
        items: []
    });

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const createCreditNote = async () => {
        setLoading(true)

        try {
            await useDelay(2000)

            var response = await addNewCreditNote({ ...formData });

            if (!response.ok) {
                toast.error(response.messages[0].message)
                return
            }

            toast.success(response.message)

            router.replace('/admin/facturacion')
        } catch (error) {
            toast.error("Error al conectar al servidor")
        } finally {
            setLoading(false)

        }

    };

    return {
        formData,
        setFormData,
        createCreditNote,
        handleFormDataChange,
    }
}