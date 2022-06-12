import { connectHitsPerPage, RefinementItem } from 'react-instantsearch-dom';
import { Select } from '@chakra-ui/react'
import { FC } from 'react';

interface ItemProps {
  value: number
  label: string
}
interface Props {
  items: ItemProps[]
  currentRefinement: any
  refine: any
  createURL: any
  onChangeValue?: Function
}

const HitsPerPage = ({ items, currentRefinement, refine, createURL, onChangeValue }: Props) => {
  return (
    <Select 
      w="max" 
      rounded='sm' 
      size="sm" 
      onChange={(e) => {
        refine(parseInt(e.currentTarget.value));
        onChangeValue(parseInt(e.currentTarget.value))
      }} 
    >
      {items.map((item: ItemProps) => (
        <option key={item.value} value={item.value}>{item.label}</option>
      ))}
    </Select>
  );
}

export const CustomHitsPerPage = connectHitsPerPage(HitsPerPage);


// LEGACY CODE
// <div>
//   <p>The search display {currentRefinement} hits.</p>
//   <ul>
//     {items.map(item => (
//       <li key={item.value}>
//         <a
//           href={createURL(item.value)}
//           style={{ fontWeight: item.isRefined ? 'bold' : '' }}
//           onClick={event => {
//             event.preventDefault();
//             refine(item.value);
//           }}
//         >
//           {item.label}
//         </a>
//       </li>
//     ))}
//   </ul>
// </div>