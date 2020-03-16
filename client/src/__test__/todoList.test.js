import { mount } from "enzyme";
import React from "react";
import TodoList from "../containers/todosList";
import Root from "../root";

describe("TodoList Containers testing", () => {
  let wrapped;

  beforeEach(() => {
    const initialState = {
      reducer: {
        todos: [
          {
            _id: "5ddb49cd2476fb0ca3e8b541",
            title: "todo test",
            description: "todo test with jest",
            due_date: "2019-11-27",
            image:
              "http://res.cloudinary.com/dpnjbs730/image/upload/v1574652564/ryglzhwl8..."
          },
          {
            _id: "5ddb49cd2476fb0ca3e8b541",
            title: "todo development",
            description: "todo react",
            due_date: "2019-11-27",
            image:
              "http://res.cloudinary.com/dpnjbs730/image/upload/v1574652564/ryglzhwl8..."
          }
        ],
        detail: {
          _id: "5ddb49cd2476fb0ca3e8b541",
          title: "todo test",
          description: "todo test with jest",
          due_date: "2019-11-27",
          image:
            "http://res.cloudinary.com/dpnjbs730/image/upload/v1574652564/ryglzhwl8..."
        }
      }
    };

    wrapped = mount(
      <Root initialState={initialState}>
        <TodoList />
      </Root>
    );
  });

  it("has CreateFormTodo Component", () => {
    expect(wrapped.find("CreateFormTodo").length).toEqual(1);
  });

  it("has Card Todo Component", () => {
    expect(wrapped.find("CardTodo").length).toEqual(2);
  });
});
