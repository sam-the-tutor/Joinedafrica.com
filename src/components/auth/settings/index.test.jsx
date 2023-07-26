import { act, render, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Settings from ".";
import { AppContext } from "../../../context";
import useStateHandler from "./hooks/useStateHandler";

vi.mock("../../../util/functions", async () => {
  const createObjectURLFromArrayOfBytes = vi.fn();
  createObjectURLFromArrayOfBytes.mockResolvedValue(null);
  return { createObjectURLFromArrayOfBytes };
});

vi.mock("./util", async () => {
  const getUserProfileFromSessionStorage = vi.fn();
  getUserProfileFromSessionStorage.mockResolvedValue({
    profilePicture: null,
    firstName: "john",
    lastName: "doe",
    email: "johndoe@gmail.com",
    principal: "1234",
    location: "nigeria",
  });
  return {
    getUserProfileFromSessionStorage,
  };
});

describe("settings component", () => {
  it("should initialize profile state with user profile data", async () => {
    // Render the component that uses the useStateHandler hook
    const { result } = renderHook(() => useStateHandler());

    // Wait for the useEffect hook to complete its asynchronous operation
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Assert that the profile state is correctly initialized with the mocked data
    expect(result.current.profile).toEqual({
      profilePicture: null,
      firstName: "john",
      lastName: "doe",
      email: "johndoe@gmail.com",
      principal: "1234",
      location: "nigeria",
    });
  });

  it("should display the user profile information after the page finishes loading", async () => {
    const { getByRole } = render(
      <AppContext.Provider value={{}}>
        <Settings />
      </AppContext.Provider>
    );
    //wait for the component to finish loading
    await waitFor(() => {
      const firstName = getByRole("firstName");
      const lastName = getByRole("lastName");
      const email = getByRole("email");
      const location = getByRole("location");

      expect(firstName.querySelector("input").value).toBe("john");
      expect(lastName.querySelector("input").value).toBe("doe");
      expect(email.querySelector("input").value).toBe("johndoe@gmail.com");
      expect(location.querySelector("input").value).toBe("nigeria");
    });
  });
  it("should call the handleSubmit function when the 'Save Changes' button is clicked", async () => {});
});
