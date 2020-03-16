import { mount } from "enzyme";
import React from "react";
import LoginRegister from "../containers/loginRegister";
import Root from "../root";

describe("LoginRegister Containers testing", () => {
  let wrapped;

  beforeEach(() => {
    const initialState = {
      reducer: {
        isLogin: true,
        isRegister: true
      }
    };

    wrapped = mount(
      <Root initialState={initialState}>
        <LoginRegister />
      </Root>
    );
  });

  it("has Login Component", () => {
    expect(wrapped.find("Login").length).toEqual(1);
  });
  it("has Register Component", () => {
    expect(wrapped.find("Register").length).toEqual(1);
  });
});
