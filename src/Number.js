const createNumber = ({ assigned, value }) => ({
  assigned,
  value,
  setAssigned() {
    this.assigned = true;
    return this;
  },
});

export default createNumber;
