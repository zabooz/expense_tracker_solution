import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ExpansiveList from "./expense-tracker/components/ExpansiveList";
import Filter from "./expense-tracker/components/Filter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "abc", amount: 10, category: "Utilities" },
    { id: 2, description: "def", amount: 10, category: "Utilities" },
    { id: 3, description: "ghi", amount: 10, category: "Entertainment" },
    { id: 4, description: "jkl", amount: 10, category: "Groceries" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredList =
    selectedCategory === ""
      ? expenses
      : expenses.filter((item) => item.category === selectedCategory);

  return (
    <>
      <ExpenseForm
        onSubmit={(expense) => setExpenses([...expenses, { ...expense, id: Date.now() }])}
      ></ExpenseForm>
      <Filter onSelectCategory={(category) => setSelectedCategory(category)} />
      <ExpansiveList
        expenses={filteredList}
        onDelete={(id) =>
          setExpenses(expenses.filter((item) => item.id !== id))
        }
      />
    </>
  );
}

export default App;
