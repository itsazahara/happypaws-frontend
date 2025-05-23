import { Component } from '@angular/core';

@Component({
  selector: 'app-preguntas-frecuentes',
  standalone: false,
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrl: './preguntas-frecuentes.component.scss'
})
export class PreguntasFrecuentesComponent {

  selectedQuestions: { [key: number]: number | null } = {};

  faqSections = [
    {
      titulo: 'Problemas de inicio de sesión',
      preguntas: [
        {
          pregunta: 'No puedo iniciar sesión',
          respuesta: 'Si no puedes iniciar sesión, por favor envíanos un email a aromsch1403@g.educaand.es.'
        },
        {
          pregunta: '¿Por qué tengo que registrarme para adoptar?',
          respuesta: 'Es necesario registrarse para que los administradores puedan consultar tus datos, comprobar si eres apto/a para la mascota y ponerse en contacto contigo.'
        },
        {
          pregunta: '¿Cómo cambio mi contraseña?',
          respuesta: 'Desde tu perfil, ve a Actualizar mis datos > Cambiar contraseña.'
        }
      ]
    },
    {
      titulo: 'Adopciones',
      preguntas: [
        {
          pregunta: '¿Cómo puedo adoptar una mascota?',
          respuesta: 'Eliges la mascota y clicas en el botón de reservar. Un administrador aceptará tu solicitud si cumples los requisitos.'
        },
        {
          pregunta: '¿Cómo sé si soy apto para adoptar una mascota?',
          respuesta: 'Depende del estudio que realiza nuestro equipo siguiendo nuestra política de adopciones.'
        },
        {
          pregunta: '¿Cómo sé si una mascota sigue en adopción?',
          respuesta: 'Si está en la web, sigue disponible para adopción.'
        },
        {
          pregunta: 'La mascota que quería adoptar ya no está en la web',
          respuesta: 'Si ya no aparece, ha sido adoptada.'
        }
      ]
    },
    {
      titulo: 'Visitas y procesos',
      preguntas: [
        {
          pregunta: '¿Puedo visitar a la mascota antes de adoptarla?',
          respuesta: 'Sí, pero debe coordinarse previamente con el equipo para asegurar la disponibilidad.'
        },
        {
          pregunta: '¿Qué pasa después de reservar?',
          respuesta: 'Un administrador evaluará tu perfil y se pondrá en contacto contigo para continuar con el proceso.'
        }
      ]
    }
  ];


  toggleAnswer(sectionIndex: number, questionIndex: number): void {
    if (this.selectedQuestions[sectionIndex] === questionIndex) {
      this.selectedQuestions[sectionIndex] = null;
    } else {
      this.selectedQuestions[sectionIndex] = questionIndex;
    }
  }

  isAnswerVisible(sectionIndex: number, questionIndex: number): boolean {
    return this.selectedQuestions[sectionIndex] === questionIndex;
  }


}
