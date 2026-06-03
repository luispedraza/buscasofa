import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given('el usuario navega a la página de sobre nosotros', () => {
  cy.visit("/about").wait(5000);
})
Then('ve el nombre de los miembros del equipo y que tarea realizó cada uno', () => {
  const expectedList = ["Jesús Daponte Faraudo -> Realización documento", "Nicolás Rodríguez Steuerberg -> Arreglo de pruebas rotas", "Iker Nieto Garrido -> Creación sección y test about", "Rodrigo Aparisi -> Nueva prueba a elegir", "Álvaro Castilla -> Prueba del footer"];
    cy.get('div#info').should('exist');
    cy.get('div#info > ul')
      .should('exist')
      .find('li')
      .should('have.length', 5)
      .each(($el, index) => {
        cy.wrap($el).should('have.text', expectedList[index]);
      });

})
Then('comprueba el número del equipo', () => {
  cy.get('div#info').should('exist');
  cy.get('div#info').then(($div) => {
    const text = $div.contents().first().text().trim();
    expect(text).to.equal('Somos el equipo nº 2');
  });
})
