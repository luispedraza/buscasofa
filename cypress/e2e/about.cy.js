describe('Página About', () => {
  it('Debe mostrar el título, los emojis, el input y la información del equipo', () => {
    cy.visit('http://localhost:5173/about');

    cy.get('h1').should('contain', 'Acerca de nosotros');
    cy.get('h2').should('contain', 'Esto es la entrega de la actividad grupal de Ingeniería del Software Avanzada');

    cy.get('.emoji-list ul li').eq(0).should('contain', '😵');
    cy.get('.emoji-list ul li').eq(1).should('contain', '😤');

    cy.get('label[for="opinion"]').should('contain', '¿Qué te ha parecido?');
    cy.get('#opinion')
      .should('exist')
      .type('El input funciona')
      .should('have.value', 'El input funciona');

    cy.get('#info').should('contain', 'Somos el equipo nº 3');
  });
});
