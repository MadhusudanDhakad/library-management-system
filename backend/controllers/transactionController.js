const calculateFine = (returnDate, expectedReturnDate) => {
    const finePerDay = 10; // Example fine rate
    const daysLate = Math.max(0, (new Date(returnDate) - new Date(expectedReturnDate)) / (1000 * 60 * 60 * 24));
    return daysLate * finePerDay;
  };
  
  // Return book
  exports.returnBook = async (req, res) => {
    const { bookId, returnDate } = req.body;
  
    try {
      const transaction = await Transaction.findOne({ bookId, returnDate: null });
      if (!transaction) return res.status(404).json({ message: "Transaction not found" });
  
      const fineAmount = calculateFine(returnDate, transaction.returnDate);
      transaction.returnDate = returnDate;
      transaction.fineAmount = fineAmount;
  
      await transaction.save();
      res.status(200).json({ message: "Book returned successfully", fineAmount });
    } catch (err) {
      res.status(500).json({ message: "Error returning book", error: err.message });
    }
  };

  // Pay fine
exports.payFine = async (req, res) => {
  const { id } = req.params;
  const { finePaid, remarks } = req.body;

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    transaction.finePaid = finePaid;
    transaction.remarks = remarks;

    await transaction.save();
    res.status(200).json({ message: "Fine paid successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error paying fine", error: err.message });
  }
};