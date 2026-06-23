import API from "./api";

export const getExpenses = async () => {
  try {
    const response = await API.get("/expenses");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addExpense = async (expenseData) => {
  try {
    const response = await API.post("/expenses", expenseData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await API.delete(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateExpense = async (id, expenseData) => {
  try {
    const response = await API.put(`/expenses/${id}`, expenseData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
