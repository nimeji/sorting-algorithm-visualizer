import React from 'react';
import styles from './SorterValue.module.scss';

export type SorterValueProps = {
  height: number;
  width: number;
  selected?: boolean;
  sorted?: boolean;
}

export const SorterValue =  React.memo(({height, width, selected=false, sorted=false}: SorterValueProps) => {
  let colorStyle;

  if(selected) {
    colorStyle = styles.selected;
  } else if(sorted) {
    colorStyle = styles.sorted;
  } else {
    colorStyle = styles.default;
  }

  return (
    <div 
      className={`${colorStyle}`} 
      style={{height: `${height}%`, width: `${width}%`}} 
    />
  );
});
