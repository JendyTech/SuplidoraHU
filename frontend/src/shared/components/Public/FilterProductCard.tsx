import styles from '@/shared/styles/components/Public/FilterProductCard.module.css'
import { IconSearch, IconAdjustmentsHorizontal } from '@tabler/icons-react'
import { SAMPLE_CATEGORIES } from '@shared/data/public'

interface ICategory {
  name: string
  id: string | number
}

interface Props {
  categories: ICategory[]
}

export function FilterProductCard(pros: Partial<Props>) {
  const {
    categories = SAMPLE_CATEGORIES
  } = pros

  return (
    <div className={styles.card}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Buscar productos..."
          className={styles.input}
        />
        <IconSearch className={styles.iconSearch} />
      </div>

      <div className={styles.priceRangeWrapper}>
        <div className={styles.priceRangeHeader}>
          <IconAdjustmentsHorizontal className={styles.iconSliders} />
          <h3 className={styles.priceRangeTitle}>Rango de precio</h3>
        </div>
        <div className={styles.priceInputWrapper}>
          <input
            type="number"
            placeholder="Mínimo"
            className={styles.priceInput}
            min={0}
          />
          <input
            type="number"
            placeholder="Máximo"
            className={styles.priceInput}
            min={0}
          />
        </div>
      </div>

      <div className={styles.categoriesWrapper}>
        <h3 className={styles.categoryTitle}>Categorías</h3>
        <div>
          {categories.map((category) => (
            <label key={category.id} className={styles.categoryOption}>
              <input
                type="radio"
                name="category"
                value={category.id}
                className={styles.categoryInput}
              />
              <span className={styles.categoryLabel}>{category.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
