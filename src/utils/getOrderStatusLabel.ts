export function getOrderStatusLabel(orderStatus) {
  if (orderStatus === "processing") {
    return { status: 'processing', label: "Νέα Παραγγελία", description: "Λάβαμε την παραγγελία σου και βρίσκεται στο στάδιο επεξεργασίας." };
  }
  if (orderStatus === "apodoxi") {
    return { status: 'apodoxi', label: 'Αποδοχη Παραγγελίας', description: "Τα προϊόντα της παραγγελίας σου είναι διαθέσιμα." };
  }
  if (orderStatus === "to-ship") {
    return { status: 'to-ship', label: 'Έτοιμη για αποστολή', description: "Έχει κοπεί παραστατικό, τα προϊόντα σου έχουν συσκευαστεί και αναμένουμε για την αποστολή." };
  }
  if (orderStatus === "completed") {
    return { status: 'completed', label: 'Έφυγε', description: "Η παραγγελία σου είναι στο δρόμο!" };
  }
  if (orderStatus === "deliverycompleted") {
    return { status: 'deliverycompleted', label: 'Έφτασε', description: "Η παραγγελία σου έφτασε!" };
  }
  if (orderStatus === "on-hold") {
    return { status: 'on-hold', label: 'Αναμονή για τραπεζική κατάθεση' }
  }
  if (orderStatus === "paralavi") {
    return { status: 'paralavi', label: 'Παραλαβή από τα γραφεία' }
  }
  if (orderStatus === "refunded") {
    return { status: 'refunded', label: 'Έγινε Επιστροφή Χρημάτων' }
  }
  if (orderStatus === "cancelled") {
    return { status: 'cancelled', label: 'Ακυρώθηκε' }
  }
  if (orderStatus === "failed") {
    return { status: 'failed', label: 'Απέτυχε' }
  }

  return { label: orderStatus };
}