describe('Footer - Miembros del equipo', () => {
  it('Debe mostrar los nombres en el footer', () => {
    cy.visit('http://localhost:5173');

    cy.contains('Miembros del equipo:');

    const nombres = [
      'Adrián Nuevo Pérez',
      'Raúl Lópes López'
    ];

    nombres.forEach(nombre => {
      cy.get('ul').should('contain', nombre);
    });
  });
});
