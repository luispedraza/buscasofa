import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

// Datos de un usuario de prueba con sesión iniciada
const sesion = {
    token: 'token-de-prueba-123',
    user: { username: 'rodrigo', email: 'rodrigo@mail.com' },
};

// Helper: deja la sesión preparada en localStorage antes de que cargue la app
/** @param {Window} win */
const sembrarSesion = (win) => {
    win.localStorage.setItem('token', sesion.token);
    win.localStorage.setItem('user', JSON.stringify(sesion.user));
};

// Bandera para que el paso "visito la página de perfil" sepa si sembrar sesión
let conSesion = false;

Given('que no tengo sesión iniciada', () => {
    conSesion = false;
});

Given('que tengo una sesión iniciada', () => {
    conSesion = true;
});

Given('el servidor confirmará el borrado de la cuenta', () => {
    // Simulamos la respuesta del backend al DELETE (no tocamos el servidor real)
    cy.intercept('DELETE', '**/api/account', {
        statusCode: 200,
        body: { message: 'Cuenta eliminada' },
    }).as('borrarCuenta');
    // Respondemos "Aceptar" al window.confirm del componente
    cy.on('window:confirm', () => true);
});

When('visito la página de perfil', () => {
    cy.visit('/perfil', conSesion ? { onBeforeLoad: sembrarSesion } : undefined);
});

When('pulso el botón de cerrar sesión', () => {
    cy.get('[data-cy=perfil-logout]').click();
});

When('confirmo y pulso el botón de borrar cuenta', () => {
    cy.get('[data-cy=perfil-delete]').click();
    cy.wait('@borrarCuenta').its('request.headers.authorization')
        .should('contain', sesion.token);
});

Then('soy redirigido a la página de login', () => {
    cy.url().should('include', '/login');
});

Then('veo mi nombre de usuario y mi email', () => {
    cy.get('[data-cy=perfil-username]').should('contain', sesion.user.username);
    cy.get('[data-cy=perfil-email]').should('contain', sesion.user.email);
});

Then('vuelvo a la home y la sesión queda limpia', () => {
    cy.location('pathname').should('eq', '/');
    cy.window().its('localStorage')
        .invoke('getItem', 'token').should('be.null');
});
