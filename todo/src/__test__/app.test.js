import { mount } from "enzyme";
import React from "react";
import App from "../App";
import Root from "../root";

let wrapped;

describe("Contain LoginRegister page", () => {
  it("has Navbar Component", () => {
    const initialState = {
      reducer: {
        isLoginRegister: true
      }
    };

    wrapped = mount(
      <Root initialState={initialState}>
        <App />
      </Root>
    );
    expect(wrapped.find("Navbar").length).toEqual(1);
  });

  it("has LoginRegister Component", () => {
    const initialState = {
      reducer: {
        isLoginRegister: true
      }
    };

    wrapped = mount(
      <Root initialState={initialState}>
        <App />
      </Root>
    );
    expect(wrapped.find("LoginRegister").length).toEqual(1);
  });
});

describe("Contain TodoList Page", () => {
  it("has TodoList Component", () => {
    const initialState = {
      reducer: {
        isLoginRegister: false,
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
        <App />
      </Root>
    );
    expect(wrapped.find("Navbar").length).toEqual(1);
    expect(wrapped.find("TodoList").length).toEqual(0);
  });
});
