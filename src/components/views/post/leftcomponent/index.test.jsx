import { render, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect } from "vitest";
import LeftComponent from ".";

const mockPost = {
  Title: "Test Post",
  Amount: 0.5,
  Description: "Test description",
};

const mockPostImages = [
  { original: "image1.jpg", thumbnail: "image1-thumbnail.jpg" },
  { original: "image2.jpg", thumbnail: "image2-thumbnail.jpg" },
];

const mockProductSpecification = {
  Color: "Red",
  Size: "Large",
};

const mockIsUserAdmin = true;

describe("LeftComponent", () => {
  it("renders post title and amount", () => {
    const { getByText } = render(
      <LeftComponent
        post={mockPost}
        postImages={mockPostImages}
        productSpecification={mockProductSpecification}
        isUserAdmin={mockIsUserAdmin}
      />
    );

    expect(getByText("Test Post")).toBeInTheDocument();
    expect(getByText("0.5 BTC")).toBeInTheDocument();
  });

  it("renders post images", () => {
    const { getAllByRole, debug } = render(
      <LeftComponent
        post={mockPost}
        postImages={mockPostImages}
        productSpecification={mockProductSpecification}
        isUserAdmin={mockIsUserAdmin}
      />
    );
    // wait for the images to load
    waitFor(() => {
      const images = getAllByRole("img");
      expect(images).toHaveLength(2);
      expect(images[0]).toHaveAttribute("src", "image1.jpg");
      expect(images[1]).toHaveAttribute("src", "image2.jpg");
    });
  });

  it("renders product specification", () => {
    const { getByText } = render(
      <LeftComponent
        post={mockPost}
        postImages={mockPostImages}
        productSpecification={mockProductSpecification}
        isUserAdmin={mockIsUserAdmin}
      />
    );
    //wait for the specification to load
    waitFor(() => {
      expect(getByText("Specification")).toBeInTheDocument();
      expect(getByText("Color: Red")).toBeInTheDocument();
      expect(getByText("Size: Large")).toBeInTheDocument();
    });
  });

  it("renders admin-specific specification", () => {
    const { getByText } = render(
      <LeftComponent
        post={mockPost}
        postImages={mockPostImages}
        productSpecification={mockProductSpecification}
        isUserAdmin={true}
      />
    );

    // Check for admin-specific attributes in the specification
    waitFor(() => {
      expect(getByText("Date:")).toBeInTheDocument();
      expect(getByText("Location:")).toBeInTheDocument();
      expect(getByText("Category:")).toBeInTheDocument();
      expect(getByText("Subcategory:")).toBeInTheDocument();
    });
  });

  it("renders post description", () => {
    const { getByText } = render(
      <LeftComponent
        post={mockPost}
        postImages={mockPostImages}
        productSpecification={mockProductSpecification}
        isUserAdmin={mockIsUserAdmin}
      />
    );

    expect(getByText("Description")).toBeInTheDocument();
    expect(getByText("Test description")).toBeInTheDocument();
  });
});
