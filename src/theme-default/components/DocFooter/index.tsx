import { usePrevNextPage } from '../../logic/usePrevNextPage'
import styles from './index.module.scss'

export function DocFooter() {
  const { prevPage, nextPage } = usePrevNextPage()

  return (
    <footer mt-8>
      <div flex gap-2 divider-top pt-6>
        <div flex flex-col className={styles.prev}>
          {prevPage && (
            <a href={prevPage.link} className={styles['pager-link']}>
              <span className={styles.desc}>上一页</span>
              <span className={styles.title}>{ prevPage.text }</span>
            </a>
          )}
        </div>

        <div flex flex-col className={styles.next}>
          {nextPage && (
            <a href={nextPage.link} className={`${styles['pager-link']} ${styles.next}`}>
              <span className={styles.desc}>下一页</span>
              <span className={styles.title}>{ nextPage.text }</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
