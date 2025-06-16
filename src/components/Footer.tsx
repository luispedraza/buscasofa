
const Footer = () => {
  const teamMembers = ["Tomás Llorenç Guarino Sabater", "Marc Rofes Romero", "Aitor Parra Fernández", "Patrick Albó Sureda"]
  return (
    <footer className='flex w-full justify-center gap-5 pb-6 text-sm mt-5'>
      <span>&copy;</span>
      <h2>Miembros del equipo:</h2>
      <ul className='flex gap-2'>
        {teamMembers.map((member, index) =>
          [
            index > 0 && ",",
            <li key={member}>{member}{}</li>
          ]
        )}
      </ul>
    </footer>
  )
}

export default Footer