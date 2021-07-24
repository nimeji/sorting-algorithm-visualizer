import styles from './SorterValue.module.scss';

export type SorterValueProps = {
  height: number;
  width: number;
}

export function SorterValue({height, width}: SorterValueProps) {
  return (
    <div className={styles.SorterValue} style={{height: `${height}%`, width: `${width}%`}} />
  );
}