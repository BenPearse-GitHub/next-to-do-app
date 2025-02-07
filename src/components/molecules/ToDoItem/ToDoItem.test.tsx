import { render, screen } from "@testing-library/react";
import ToDoItem, { ToDoItemProps } from "./ToDoItem";

const defaultToDoItemProps: ToDoItemProps = {
  name: "Test todo item",
  id: "test-id",
  complete: false,
  handleCompletionChange: jest.fn(),
  handleDelete: jest.fn(),
};

describe("ToDoItem", () => {
  it("renders the todo item name", () => {
    render(<ToDoItem {...defaultToDoItemProps} />);

    expect(screen.getByText(defaultToDoItemProps.name)).toBeInTheDocument();
  });

  it("renders a checkbox", () => {
    render(<ToDoItem {...defaultToDoItemProps} />);

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders a checked checkbox if complete is true", () => {
    render(<ToDoItem {...defaultToDoItemProps} complete={true} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("calls the handleCompletionChange callback", () => {
    render(<ToDoItem {...defaultToDoItemProps} />);

    const checkbox = screen.getByRole("checkbox");
    checkbox.click();
    expect(defaultToDoItemProps.handleCompletionChange).toHaveBeenCalled();
  });

  it("calls the handleDelete callback", () => {
    render(<ToDoItem {...defaultToDoItemProps} />);

    const deleteButton = screen.getByRole("button");
    deleteButton.click();
    expect(defaultToDoItemProps.handleDelete).toHaveBeenCalled();
  });
});
