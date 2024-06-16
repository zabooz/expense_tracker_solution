import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "description should be at least 3 characters" })
    .max(20),
  amount: z
    .number({ invalid_type_error: "Amount is Required" })
    .min(0.01)
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({ message: "category is required" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

function ExpenseForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          type="text"
          id="description"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          id="amount"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          {...register("category")}
          name=""
          id="category"
          className="form-select"
        >
          <option value=""></option>
          {categories.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary mb-3">Submit</button>
    </form>
  );
}

export default ExpenseForm;
