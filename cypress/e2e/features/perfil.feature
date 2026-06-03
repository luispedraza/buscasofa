Feature: Página de perfil de usuario

  Scenario: Redirección al login cuando no hay sesión
    Given que no tengo sesión iniciada
    When visito la página de perfil
    Then soy redirigido a la página de login

  Scenario: Ver mis datos con la sesión iniciada
    Given que tengo una sesión iniciada
    When visito la página de perfil
    Then veo mi nombre de usuario y mi email

  Scenario: Cerrar la sesión
    Given que tengo una sesión iniciada
    When visito la página de perfil
    And pulso el botón de cerrar sesión
    Then vuelvo a la home y la sesión queda limpia

  Scenario: Borrar la cuenta tras confirmar
    Given que tengo una sesión iniciada
    And el servidor confirmará el borrado de la cuenta
    When visito la página de perfil
    And confirmo y pulso el botón de borrar cuenta
    Then vuelvo a la home y la sesión queda limpia
