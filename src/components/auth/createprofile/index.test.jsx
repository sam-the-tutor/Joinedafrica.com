import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import CreateProfile from ".";
import { AppContext } from "../../../context";

URL.createObjectURL = vi.fn((file) => "mocked-object-url");

describe("Create profile component", () => {
  it("should render create profile component correctly", () => {
    const { getByRole } = render(
      <AppContext.Provider value={{}}>
        <BrowserRouter>
          <CreateProfile />
        </BrowserRouter>
      </AppContext.Provider>
    );
    expect(getByRole("firstName")).toBeInTheDocument();
    expect(getByRole("lastName")).toBeInTheDocument();
    expect(getByRole("email")).toBeInTheDocument();
    expect(getByRole("location")).toBeInTheDocument();
    expect(getByRole("image")).toBeInTheDocument();
    expect(getByRole("submitBtn")).toBeInTheDocument();
  });
  it("should store user profile details when it's added ", async () => {
    const { getByRole } = render(
      <AppContext.Provider value={{}}>
        <BrowserRouter>
          <CreateProfile />
        </BrowserRouter>
      </AppContext.Provider>
    );

    const profilePictureInput = getByRole("image");
    const selectedFile = new File(
      ["profile-picture-content"],
      "profile-picture.png",
      {
        type: "image/png",
      }
    );

    fireEvent.change(profilePictureInput, {
      target: { files: [selectedFile] },
    });

    const profilePicture = screen.getByAltText("User selected profile");
    expect(profilePicture).toBeInTheDocument();
    expect(profilePicture.getAttribute("src")).toContain("mocked-object-url");

    await userEvent.type(getByRole("firstName").querySelector("input"), "John");
    expect(getByRole("firstName").querySelector("input").value).toBe("John");
    await userEvent.type(getByRole("lastName").querySelector("input"), "Doe");
    expect(getByRole("lastName").querySelector("input").value).toBe("Doe");
    await userEvent.type(
      getByRole("email").querySelector("input"),
      "John@gmail.com"
    );
    expect(getByRole("email").querySelector("input").value).toBe(
      "John@gmail.com"
    );
    await userEvent.type(
      getByRole("location").querySelector("input"),
      "nigeria"
    );
    expect(getByRole("location").querySelector("input").value).toBe("nigeria");
  });
});
