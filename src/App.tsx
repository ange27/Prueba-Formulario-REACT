import React, { useState, useEffect } from 'react'
import Card from './components/Card'
import type { Person } from './types'
import {
  validateName,
  validateComments,
  validateBirthDate,
} from './utils/validation'
import './App.css'

const App: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [comments, setComments] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [persons, setPersons] = useState<Person[]>([])

  // Cargar datos guardados del localStorage al iniciar
  useEffect(() => {
    const storedData = localStorage.getItem('persons')
    if (storedData) {
      setPersons(JSON.parse(storedData))
    } 
  }, [])

  // Validaciones y guardado
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors: string[] = []

    if (!validateName(fullName)) {
      newErrors.push(
        'El nombre solo puede contener letras, espacios y tildes. No puede estar vacío.'
      )
    }

    if (!validateBirthDate(birthDate)) {
      newErrors.push(
        'La fecha debe estar entre 01/01/1900 y la fecha actual.'
      )
    }

    if (!validateComments(comments)) {
      newErrors.push(
        'Los comentarios contienen caracteres no permitidos.'
      )
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    // Si pasa las validaciones:
    const newPerson: Person = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      birthDateISO: birthDate,
      comments: comments.trim(),
    }
    const updatedPersons = [...persons, newPerson]

    setPersons([...persons, newPerson])
    localStorage.setItem('persons', JSON.stringify(updatedPersons))

    setFullName('')
    setBirthDate('')
    setComments('')
    setErrors([])

  }

  return (
    <main className="container">
      <h1 className="title">Prueba de Global Bank</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nombre Completo
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ej: Juan Pérez"
          />
        </label>

        <label>
          Fecha de nacimiento
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            min="1900-01-01"
            max={new Date().toISOString().split('T')[0]}
          />
        </label>

        <label>
          Comentarios
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Escribe tus comentarios aquí..."
          />
        </label>

        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}

        <button type="submit">Guardar</button>
      </form>

      <section className="cards">
        {persons.length > 0 &&
          persons.map((p: Person, idx: number) => (
            <Card key={idx} person={p} />
          ))}
      </section>
    </main>
  )
}

export default App
