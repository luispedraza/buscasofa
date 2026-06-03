Feature: Página sobre nosotros
  Scenario: Usuario visualiza la página en la que se muestran los nombres del equipo y que tareas han realizado cada uno
    Given el usuario navega a la página de sobre nosotros
    Then ve el nombre de los miembros del equipo y que tarea realizó cada uno
    And comprueba el número del equipo
