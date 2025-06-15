import React from 'react'
import './About.css'

const teamMembers = [
  {
    name: 'Marc Rofes Romero',
    unir: 'https://campusonline.unir.net/user/view.php?id=77930&course=10953',
    linkedin: '#',
    img: '/team/marc.jpg',
  },
  {
    name: 'Tomás Llorenç Guarino Sabaté',
    unir: 'https://campusonline.unir.net/user/view.php?id=36336&course=10953',
    linkedin: '#',
    img: '/team/tomas.jpg',
  },
  {
    name: 'Aitor Parra Fernández',
    unir: 'https://campusonline.unir.net/user/view.php?id=33768&course=10953',
    linkedin: '#',
    img: '/team/aitor.jpg',
  },
  {
    name: 'Patrick Albó Sureda',
    unir: 'https://campusonline.unir.net/user/view.php?id=34041&course=10953',
    linkedin: '#',
    img: '/team/patrick.jpg',
  },
  {
    name: 'Luis Pedraza Gomara',
    unir: 'https://ecuador.unir.net/ingenieria/carrera-informatica/',
    linkedin: '#',
    img: '/team/luis.jpg',
    collaborator: true,
  }
]

const About = () => {
    
    return (
    <div className="about-container">
        <div className="max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
                Acerca de nosotros
            </h1>
            <p id="info" className="text-xl text-gray-600">
                Somos el <span className="font-semibold text-green-600">equipo nº 17</span> <br />
                de la asignatura de Ingenieria del Software Avanzada <br />
                del Grado de Ingeniería Informática en UNIR.
            </p>
        </div>

    <div className="flex flex-wrap justify-center gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="card bg-white shadow-md rounded-lg p-4 w-60">
            <img
              src={member.img}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            {!member.collaborator && <p className="text-sm text-gray-500">Miembro del equipo</p>}
            {member.collaborator && <p className="text-sm text-gray-500">Colaborador del proyecto</p>}
            <div className="mt-2 text-blue-600 text-sm flex flex-col gap-1">
              <a href={member.unir} target="_blank" rel="noreferrer" className="hover:underline">
                Perfil UNIR
              </a>
              {member.linkedin !== '#' && (
                <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    )
}

export default About