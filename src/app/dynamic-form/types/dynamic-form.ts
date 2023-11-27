import { Question } from "../interfaces/question";

export type DynamicForm = Pick<Question, "label" | "value">
