import styles from './SorterValue.module.scss';

export type SorterValueProps = {
  height: number;
  width: number;
  selected?: boolean;
}

export function SorterValue({height, width, selected=false}: SorterValueProps) {
  return (
    <div className={`${styles.SorterValue} ${selected ? styles.Selected : ''}`} style={{height: `${height}%`, width: `${width}%`}} />
  );
}