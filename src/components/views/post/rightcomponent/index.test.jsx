import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import RightComponent from ".";
import { AppContext } from "../../../../context";

describe("RightComponent", () => {
  it("renders input field and send message button", () => {
    const { getByPlaceholderText, getByRole } = render(
      <AppContext.Provider value={{}}>
        <RightComponent post={{ CreatorOfPostId: "creator_principal_id" }} />
      </AppContext.Provider>
    );

    const inputField = getByPlaceholderText(
      "Send a message to the creator of the post."
    );
    const sendMessageButton = getByRole("button", { name: "Send message" });

    expect(inputField).toBeInTheDocument();
    expect(sendMessageButton).toBeInTheDocument();
  });
});
