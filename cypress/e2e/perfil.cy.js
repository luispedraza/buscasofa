/// <reference types="cypress" />
// Pruebas de la página de perfil de usuario (/perfil)

describe('Página de perfil de usuario', () => {

    // Datos de un usuario de prueba con sesión ya iniciada
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

    it('redirige a /login si no hay sesión', () => {
        cy.visit('/perfil');                       // visitamos el perfil sin token
        cy.url().should('include', '/login');      // el guard debe rebotarnos al login
    });

    it('muestra el usuario y el email cuando hay sesión', () => {
        cy.visit('/perfil', { onBeforeLoad: sembrarSesion });   // sesión lista antes de cargar

        cy.url().should('include', '/perfil');                                  // no nos ha echado el guard
        cy.get('[data-cy=perfil-username]').should('contain', sesion.user.username);
        cy.get('[data-cy=perfil-email]').should('contain', sesion.user.email);
    });

    it('cierra la sesión y vuelve a la home', () => {
        cy.visit('/perfil', { onBeforeLoad: sembrarSesion });

        cy.get('[data-cy=perfil-logout]').click();          // pulsamos "Cerrar sesión"

        cy.location('pathname').should('eq', '/');          // nos lleva a la home
        cy.window().its('localStorage')                     // y la sesión queda limpia
            .invoke('getItem', 'token').should('be.null');
    });

    it('borra la cuenta tras confirmar y vuelve a la home', () => {
        cy.visit('/perfil', { onBeforeLoad: sembrarSesion });

        // Simulamos la respuesta del backend al DELETE: no llamamos al servidor real
        cy.intercept('DELETE', '**/api/account', {
            statusCode: 200,
            body: { message: 'Cuenta eliminada' },
        }).as('borrarCuenta');

        // El componente pregunta con window.confirm: respondemos que SÍ
        cy.on('window:confirm', () => true);

        cy.get('[data-cy=perfil-delete]').click();          // pulsamos "Borrar cuenta"

        // Esperamos a que se dispare la petición interceptada y comprobamos que llevó el token
        cy.wait('@borrarCuenta').its('request.headers.authorization')
            .should('contain', sesion.token);

        cy.location('pathname').should('eq', '/');          // redirige a la home
        cy.window().its('localStorage')                     // y la sesión queda limpia
            .invoke('getItem', 'token').should('be.null');
    });

});
