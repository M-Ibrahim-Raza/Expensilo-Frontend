import * as yup from "yup";

const titleSchema = yup
  .string()
  .trim()
  .required("Title is required")
  .matches(/(?:.*[A-Za-z]){3,}/, "Title must contain at least 3 letters")
  .min(3, "Title must contain at least 3 characters")
  .max(50, "Title can't exceed 50 characters");

const amountSchema = yup
  .number()
  .typeError("Amount must be a valid number")
  .required("Amount is required")
  .positive("Amount must be greater than zero")
  .max(100000000, "Amount is too large");

const dateSchema = yup
  .string()
  .required("Date is required")
  .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
  .test("valid-calendar-date", "Date is not a real calendar date", (value) => {
    if (!value) return false;
    const [yyyy, mm, dd] = value.split("-").map(Number);
    const d = new Date(yyyy, mm - 1, dd);
    return (
      d.getFullYear() === yyyy && d.getMonth() === mm - 1 && d.getDate() === dd
    );
  })
  .test("year-range", "Year must be between 1900 and 2099", (value) => {
    if (!value) return false;
    const [yyyy] = value.split("-");
    const year = Number(yyyy);
    return year >= 1900 && year <= 2099;
  });

const categorySchema = yup
  .string()
  .trim()
  .matches(/(?:.*[A-Za-z]){3,}/, "Category must contain at least 3 letters")
  .required("Category is required")
  .min(3, "Category must contain at least 3 characters")
  .max(30, "Category can't exceed 30 characters")
  .transform((value) => {
    if (!value) return value;
    return value
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  });

const detailsSchema = yup
  .string()
  .trim()
  .notRequired()
  .test("len-check", "Details must contain at least 5 characters", (v) => {
    if (!v) return true;
    return v.length >= 5;
  })
  .max(250, "Details can't exceed 250 characters");

export const transactionSchema = yup.object({
  title: titleSchema,
  amount: amountSchema,
  created_at: dateSchema,
  category: categorySchema,
  details: detailsSchema,
});
