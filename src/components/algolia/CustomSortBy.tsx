import { connectSortBy } from 'react-instantsearch-dom';
import { Select } from '@chakra-ui/react'

const SortBy = ({ items, refine, createURL }) => (
  <Select 
    w="max" 
    rounded='sm' 
    size="sm" 
    onChange={(e) => {
      refine(e.currentTarget.value);
    }} 
  >
    {items.map((item: any) => (
      <option 
        key={item.label} 
        value={item.value}  
      >
        {item.label}
      </option>
    ))}
  </Select>
);

export const CustomSortBy = connectSortBy(SortBy);

// LEGACY CODE
// <ul>
//   {items.map(item => (
//     <li key={item.value}>
//       <a
//         href={createURL(item.value)}
//         // style={{ fontWeight: item.isRefined ? 'bold' : '' }}
//         onClick={event => {
//           event.preventDefault();
//           refine(item.value);
//         }}
//       >
//         {item.label}
//       </a>
//     </li>
//   ))}
// </ul>