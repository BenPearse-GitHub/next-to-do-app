import { render, screen } from "@testing-library/react";
import ToDoForm, { ToDoFormProps } from "./ToDoForm";

const defaultToDoFormProps: ToDoFormProps = {
  submitEventHandler: jest.fn(),
};

describe("ToDoForm", () => {
  it("renders a textbox", () => {
    render(<ToDoForm {...defaultToDoFormProps} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    render(<ToDoForm {...defaultToDoFormProps} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("calls the submitEventHandler callback when the submit button is clicked", () => {
    render(<ToDoForm {...defaultToDoFormProps} />);

    const button = screen.getByRole("button");
    button.click();

    expect(defaultToDoFormProps.submitEventHandler).toHaveBeenCalled();
  });
});
