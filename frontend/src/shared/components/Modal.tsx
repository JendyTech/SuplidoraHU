import React from 'react';

interface DeleteProductModalProps {
    isOpen: boolean;
    productName: string | undefined;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
    isOpen,
    productName,
    onClose,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Eliminar Producto</h2>
                </div>
                <p style={styles.content}>
                    ¿Estás seguro de que deseas eliminar <strong>{productName}</strong>? Esta acción no se puede deshacer.
                </p>
                <div style={styles.actions}>
                    <button onClick={onClose} style={styles.cancelButton}>
                        Cancelar
                    </button>
                    <button onClick={onConfirm} style={styles.confirmButton}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        padding: '30px',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center' as 'center',
        animation: 'fadeIn 0.3s ease-in-out',
    },
    header: {
        marginBottom: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold' as 'bold',
        color: '#333333',
    },
    content: {
        fontSize: '16px',
        color: '#666666',
        marginBottom: '30px',
        lineHeight: '1.6',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
        border: 'none',
        borderRadius: '8px',
        color: '#333',
        padding: '12px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        flex: 1,
    },
    confirmButton: {
        backgroundColor: '#ff5252',
        border: 'none',
        borderRadius: '8px',
        color: '#ffffff',
        padding: '12px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        flex: 1,
    },
};

export default DeleteProductModal;