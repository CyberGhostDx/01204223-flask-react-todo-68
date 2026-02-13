import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import TodoItem from "../components/TodoItem.jsx";
import "@testing-library/jest-dom";

const baseTodo = {
  id: 1,
  title: "Sample Todo",
  done: false,
  comments: [],
};

describe("TodoItem", () => {
  it("renders with no comments correctly", () => {
    render(<TodoItem todo={baseTodo} />);
    expect(screen.getByText("Sample Todo")).toBeInTheDocument();
  });

  it("renders with comments correctly", () => {
    const todoWithComment = {
      ...baseTodo,
      comments: [
        { id: 1, message: "First comment" },
        { id: 2, message: "Another comment" },
      ],
    };
    render(<TodoItem todo={todoWithComment} />);
    expect(screen.getByText("Sample Todo")).toBeInTheDocument();
    expect(screen.getByText("First comment")).toBeInTheDocument();
    expect(screen.getByText("Another comment")).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
  });

  it("renders with no comments correctly", () => {
    render(<TodoItem todo={baseTodo} />);
    expect(screen.getByText("No comments")).toBeInTheDocument();
  });

  it("makes callback to toggleDone when Toggle button is clicked", () => {
    const onToggleDone = vi.fn();
    render(<TodoItem todo={baseTodo} toggleDone={onToggleDone} />);
    const button = screen.getByRole("button", { name: /toggle/i });
    button.click();
    expect(onToggleDone).toHaveBeenCalledWith(baseTodo.id);
  });

  it("makes callback to deleteTodo when delete button is clicked", () => {
    const deleteTodo = vi.fn();
    render(<TodoItem todo={baseTodo} deleteTodo={deleteTodo} />);
    const button = screen.getByRole("button", { name: /❌/i });
    button.click();
    expect(deleteTodo).toHaveBeenCalledWith(baseTodo.id);
  });

  it("makes callback to addNewComment when a new comment is added", async () => {
    const onAddNewComment = vi.fn();
    render(<TodoItem todo={baseTodo} addNewComment={onAddNewComment} />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "New comment");

    const button = screen.getByRole("button", { name: /Add Comment/i });
    button.click();

    expect(onAddNewComment).toHaveBeenCalledWith(baseTodo.id, "New comment");
  });
});
