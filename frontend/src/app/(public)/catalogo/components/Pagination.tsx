// CatalogPagination.tsx
import React from 'react';
import styles from '../estilos.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages?: number;
    onPageChange: (page: number) => void;
    isNextPage?: boolean;
}

const CatalogPagination: React.FC<PaginationProps> = ({
    currentPage,
    onPageChange,
    isNextPage
}) => {


    return (
        <div className={styles.paginationContainer} >


            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>

                <span className={styles.pageInfo}>
                    Página {currentPage}
                </span>

                <button
                    className={styles.pageButton}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!isNextPage}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default CatalogPagination;