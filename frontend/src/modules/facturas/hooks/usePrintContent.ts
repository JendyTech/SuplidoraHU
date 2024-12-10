import ReactDOMServer from "react-dom/server";

function usePrintContent() {
    const printContent = (content: JSX.Element, title: string = "Document") => {
        const html = `
            <html>
                <head>
                    <title>${title}</title>
                    <style>
                        body {
                            margin: 0;
                            font-family: Arial, sans-serif;
                        }
                    </style>
                </head>
                <body>
                    ${ReactDOMServer.renderToString(content)}
                </body>
            </html>
        `;

        const iframe = document.createElement("iframe");
        iframe.setAttribute("style", "position:absolute;visibility:hidden;height:0;width:0;");
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow?.document;
        if (!doc) {
            console.error("No se pudo acceder al documento del iframe.");
            return;
        }

        doc.open();
        doc.write(html);
        doc.close();

        const checkImagesLoaded = () => {
            const images = doc.getElementsByTagName('img');
            let loadedCount = 0;

            const totalImages = images.length;
            if (totalImages === 0) {
                iframe.contentWindow?.print();
                return;
            }

            for (let i = 0; i < totalImages; i++) {
                const img = images[i];
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        iframe.contentWindow?.print();
                    }
                };

                img.onerror = () => {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        iframe.contentWindow?.print(); 
                    }
                };
                img.src = img.src; 
            }
        };

        checkImagesLoaded();

        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 100);
    };

    return printContent;
}

export default usePrintContent;
