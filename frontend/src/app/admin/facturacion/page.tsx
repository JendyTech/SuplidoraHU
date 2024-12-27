import { IconInvoice } from "@tabler/icons-react";
import { getAllInvoices } from "@services/invoice";
import { InfoContainer } from "@modules/productos/components/InfoContainer";
import { ErrorLoadServer } from "@shared/components/Error/ErrorLoadServer";
import { Tabs } from "@shared/components/Screen/Tabs";
import InvoiceTable from "@modules/facturas/components/InvoiceTable";
import styles from "@modules/facturas/styles/facturas.module.css";
import CreditNoteForm from "@modules/facturas/components/CreditNoteForm";

export default async function BillingPage() {
  try {
    const response = await getAllInvoices({}, true);

    if (!response.ok) return <ErrorLoadServer />;

    const tabs = [
      {
        label: "Facturas",
        content: (
          <div className={styles.main}>
            <div className={styles.infoContainerGroup}>
              <InfoContainer
                Icon={IconInvoice}
                title={response.result.metadata.total}
                subtitle="Facturas en sistema"
                color="#287881"
              />
            </div>
            <InvoiceTable initialState={response.result} />
          </div>
        ),
      },
      {
        label: "Notas de Crédito",
        content: <CreditNoteForm />,
      },
    ];

    return <Tabs tabs={tabs} />;
  } catch (error) {
    return <ErrorLoadServer />;
  }
}
