describe('Prueba del Footer', () => {
  it('Debe mostrar los nombres de todos los miembros del equipo en el pie de página', () => {
    cy.visit('http://localhost:5173'); 

    // Primero seleccionamos el footer, y dentro de él buscamos los nombres
    cy.get('footer').contains('Álvaro Castilla Cano').should('exist');
    cy.get('footer').contains('Nicolás Rodríguez Steuerberg').should('exist');
    cy.get('footer').contains('Iker Nieto Garrido').should('exist');
    cy.get('footer').contains('Rodrigo Pelayo Aparisi Olivar').should('exist');
    cy.get('footer').contains('Jesús Daponte Faraudo').should('exist');
  });
});