// old one
// export default function formatCurrency(num) {
//   if (num !== undefined) {
//       return parseFloat(num)
//           .toString()
//           .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//   } else {
//   }
// }

export default function formatCurrency(num) {
  if (num !== undefined) {
      return parseFloat(num)
          .toFixed(2)
          // .toString()
  } else {
  }
}
