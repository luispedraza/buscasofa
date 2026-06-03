/// <reference types="cypress" />

describe('Visualización de la sección about de la aplicación', () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it('El usuario visualiza la sección sobre nosotros de la aplicación', () => {
    const expectedList = ["Jesús Daponte Faraudo -> Realización documento", "Nicolás Rodríguez Steuerberg -> Arreglo de pruebas rotas", "Iker Nieto Garrido -> Creación sección y test about", "Rodrigo Aparisi -> Nueva prueba a elegir", "Álvaro Castilla -> Prueba del footer"];
    cy.get('div#info').should('exist');
    cy.get('div#info').then(($div) => {
      const text = $div.contents().first().text().trim();
      expect(text).to.equal('Somos el equipo nº 2');
    });
    cy.get('div#info > ul')
      .should('exist')
      .find('li')
      .should('have.length', 5)
      .each(($el, index) => {
        cy.wrap($el).should('have.text', expectedList[index]);
      });

  });
})
