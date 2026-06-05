/// <reference types="cypress" />
// Pruebas de la página de perfil de usuario

describe('Visualización de la página de perfil', () => {

    context('Usuario no autenticado', () => {
        beforeEach(() => {
            cy.clearLocalStorage();
            cy.visit('/perfil');
        });

        it('Muestra el título de la página', () => {
            cy.get('h1').should('contain', 'Mi Perfil');
        });

        it('Muestra un mensaje indicando que no ha iniciado sesión', () => {
            cy.get('#no-session')
                .should('be.visible')
                .and('contain', 'No has iniciado sesión');
        });

        it('Muestra un enlace para iniciar sesión', () => {
            cy.get('#login-link')
                .should('be.visible')
                .and('have.attr', 'href', '/login');
        });
    });

    context('Usuario autenticado', () => {
        beforeEach(() => {
            cy.window().then(win => {
                win.localStorage.setItem('user', 'testuser');
                win.localStorage.setItem('token', 'fake-token-123');
            });
            cy.visit('/perfil');
        });

        it('Muestra el título de la página', () => {
            cy.get('h1').should('contain', 'Mi Perfil');
        });

        it('Muestra el nombre del usuario', () => {
            cy.get('#username')
                .should('be.visible')
                .and('contain', 'testuser');
        });

        it('Muestra que la sesión está activa', () => {
            cy.get('#status')
                .should('be.visible')
                .and('contain', 'Sesión activa');
        });

        it('Muestra un enlace para volver al inicio', () => {
            cy.get('#home-link')
                .should('be.visible')
                .and('have.attr', 'href', '/');
        });
    });
});
