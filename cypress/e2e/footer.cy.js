/// <reference types="cypress" />

describe('Visualización del footer de la aplicación', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Muestra los nombres de todos los miembros del equipo en el footer', () => {
    cy.get('footer').should('exist');

    cy.contains('footer', 'Alexander Humberto Acosta Chirinos').should('be.visible');
    cy.contains('footer', 'Yaiza Fontanet Rubiño').should('be.visible');
    cy.contains('footer', 'Enrique Madruga Ricardo').should('be.visible');
    cy.contains('footer', 'Alberto Sanchez Ruiz').should('be.visible');
  });
});
