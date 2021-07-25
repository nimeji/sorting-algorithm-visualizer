import styles from './SorterValue.module.scss';

export type SorterValueProps = {
  height: number;
  width: number;
  selected?: boolean;
  sorted?: boolean;
}

export function SorterValue({height, width, selected=false, sorted=false}: SorterValueProps) {
  return (
    <div 
      className={`${styles.SorterValue} ${selected ? styles.Selected : ''} ${sorted ? styles.Sorted : ''}`} 
      style={{height: `${height}%`, width: `${width}%`}} 
    />
  );
}