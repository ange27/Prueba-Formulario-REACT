import React from 'react'
import type { Person } from '../types'
import { formatDateToDisplay, calculateAge } from '../utils/validation'


const Card: React.FC<{ person: Person }> = ({ person }) => {
return (
<article className="card">
<h3 className="card-title">{person.fullName}</h3>
<p className="muted">{formatDateToDisplay(person.birthDateISO)}, Edad: {calculateAge(person.birthDateISO)} años.</p>
<p className="muted"><strong>Comentarios:</strong> {person.comments}</p>
</article>
)
}


export default Card
