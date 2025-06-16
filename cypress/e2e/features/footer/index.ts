import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("el usuario navega a la home", () => {
  cy.visit("/");
});

Then("debería ver los nombres de los integrantes en el footer", () => {
  const teamMembers = [
    "Marc Rofes Romero",
    "Tomás Llorenç Guarino Sabater",
    "Aitor Parra Fernández",
    "Patrick Albó Sureda"
  ];
  cy.get("footer ul > li").then((members) => {
    const foundedNames = Array.from(
      members,
      (el) => el.textContent?.trim() || ""
    );
    // The order of members doesn't care
    assert.sameMembers(
      foundedNames,
      teamMembers,
      "Error: Los nombres en el footer no coinciden con los esperados."
    );
  });
});
