Feature: Página de perfil de usuario

  Scenario: El usuario no autenticado visita el perfil
    Given el usuario no ha iniciado sesión
    When navega a la página de perfil
    Then debería ver el título "Mi Perfil"
    And debería ver un mensaje de no sesión
    And debería ver un enlace para iniciar sesión

  Scenario: El usuario autenticado visita el perfil
    Given el usuario ha iniciado sesión con "testuser"
    When navega a la página de perfil
    Then debería ver el título "Mi Perfil"
    And debería ver su nombre de usuario "testuser"
    And debería ver que la sesión está activa