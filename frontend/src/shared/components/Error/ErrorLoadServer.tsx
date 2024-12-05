interface Props {
    title?: string | undefined
}


export function ErrorLoadServer(props: Partial<Props>) {
    const {
        title = 'Ha ocurrido un error al cargar la informacion'
    } = props

    return (
        <div
            style={{
                width: "100%",
                height: "50vh",
                backgroundColor: "#FFF",
                borderRadius: "8px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex"
            }}
        >
            <h2>
                {title}
            </h2>
        </div>
    )
}