import { render, screen } from "@testing-library/react";
import ToDoList, { ToDoListProps } from "./ToDoList";
import { mockToDoItems } from "@/mocks/data";

const defaultToDoListProps: ToDoListProps = {
  toDoItems: mockToDoItems,
  onCompleteChange: jest.fn(),
  onDelete: jest.fn(),
};

describe("ToDoList", () => {
  it("should render each todo item in the toDoItems prop", () => {
    render(<ToDoList {...defaultToDoListProps} />);

    // Check that each to-do item name is rendered
    mockToDoItems.forEach((mockToDoItem) =>
      expect(screen.getByText(mockToDoItem.name)).toBeInTheDocument()
    );
  });
});
