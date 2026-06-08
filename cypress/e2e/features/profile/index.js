/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('el usuario no ha iniciado sesión', () => {
  cy.clearLocalStorage();
});

Given('el usuario ha iniciado sesión con {string}', (username) => {
  cy.window().then(win => {
    win.localStorage.setItem('user', username);
    win.localStorage.setItem('token', 'fake-token-123');
  });
});

When('navega a la página de perfil', () => {
  cy.visit('/perfil');
});

Then('debería ver el título {string}', (titulo) => {
  cy.get('h1').should('contain', titulo);
});

Then('debería ver un mensaje de no sesión', () => {
  cy.get('#no-session').should('be.visible');
});

Then('debería ver un enlace para iniciar sesión', () => {
  cy.get('#login-link').should('have.attr', 'href', '/login');
});

Then('debería ver su nombre de usuario {string}', (username) => {
  cy.get('#username').should('contain', username);
});

Then('debería ver que la sesión está activa', () => {
  cy.get('#status').should('contain', 'Sesión activa');
});