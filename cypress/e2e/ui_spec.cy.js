// ===========================
// PRUEBA 1 - Footer con nombres del equipo
// ===========================
describe('Footer', () => {
  it('debe mostrar los nombres del equipo', () => {
    cy.visit('http://localhost:5173');
    cy.get('footer').should('contain', 'Tomás Llorenç Guarino Sabater');
    cy.get('footer').should('contain', 'Marc Rofes Romero');
    cy.get('footer').should('contain', 'Aitor Parra Fernández');
    cy.get('footer').should('contain', 'Patrick Albo Sureda');
  });
});


// ===========================
// PRUEBA 2 - Página FAQ
// ===========================
describe('Página FAQ', () => {
  it('debe mostrar el título Preguntas Frecuentes', () => {
    cy.visit('http://localhost:5173/faq');
    cy.get('body', { timeout: 20000 }).should('contain.text', 'Preguntas Frecuentes');
  });
});
