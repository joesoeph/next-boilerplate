import ListPosts from "../../src/app/ListPosts";

describe("ListPosts", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3030/posts*", {
      fixture: "posts.json",
    }).as("getPosts");
    cy.mount(<ListPosts />);
    cy.wait("@getPosts");
  });

  it("should render the list of posts", () => {
    cy.get("[data-testid='list-posts'] li").should(
      "have.length.greaterThan",
      0
    );
  });
});
