"use server"

import React from "react";
import InvoiceView from "@modules/facturas/components/InvoiceView";
import { Onedoc } from "@onedoc/client";
import { readFileSync, writeFileSync } from "fs";
import { compile } from "@onedoc/react-print";
import { join } from "path";

const ONEDOC_API_KEY: string = process.env.ONE_DOC || ""

const generate = async () => {
    if (!ONEDOC_API_KEY)
        return

    const onedoc = new Onedoc(ONEDOC_API_KEY);

    let doc = {
        html: await compile(<InvoiceView />),
        title: "Factura #0001",
        test: true,
    }

    const { file, link, error, info } = await onedoc.render(doc);

    if (error) {
        console.error(error);
        return;
    }

    writeFileSync("C:/Users/Frand/SuplidoraHU/frontend/public/demo.pdf", Buffer.from(file))

    console.log(link)
}

export default generate;