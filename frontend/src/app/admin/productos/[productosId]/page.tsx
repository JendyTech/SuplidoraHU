export default function ProductDetail({ params }: { params: { id: string } }) {
    return (
        <div>{params.id}</div>
    )
}
