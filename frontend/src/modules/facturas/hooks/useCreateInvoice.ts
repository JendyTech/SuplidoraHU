import { useState } from "react"
import { addNewInvoice } from "@services/invoice";
import { useLoader } from "@/contexts/Loader";
import { useDelay } from "@/hooks/useDelay";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateInvoice = () => {

    const { setLoading } = useLoader()
    const router = useRouter()

    const getDefaultExpirationDate = () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date.toISOString().split("T")[0]; 
    };

    const [formData, setFormData] = useState<AddInvoiceModel>({
        ncfNumber : "B0100001719",
        rncNumber : "132-38173-4",
        expirationDate : getDefaultExpirationDate(),
        clientName : "",
        clientRnc : "",
        paymentCondition : "",
        supplierName : "",
        items: []
    });

    const createInvoice = async () => {
        setLoading(true)

        try {
            await useDelay(2000)

            var response = await addNewInvoice({ ...formData });

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
        createInvoice
    }
}