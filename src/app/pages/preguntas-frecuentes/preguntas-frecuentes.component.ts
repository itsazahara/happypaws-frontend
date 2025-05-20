import { Component } from '@angular/core';

@Component({
  selector: 'app-preguntas-frecuentes',
  standalone: false,
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrl: './preguntas-frecuentes.component.scss'
})
export class PreguntasFrecuentesComponent {

  selectedQuestion1: number | null = null;
  selectedQuestion2: number | null = null;

  faqs1 = [
    {
      pregunta: 'No puedo iniciar sesión PROVISIONAL',
      respuesta: 'Si no puedes iniciar sesión, por favor pulsa en el enlace de "Olvidé mi contraseña" en la ventana de inicio de sesión, si sigues sin poder iniciar sesión, por favor envíanos un email a aromsch1403@g.educaand.es'
    },
    {
      pregunta: '¿Por qué tengo que registrarme para adoptar?',
      respuesta: 'Es necesario registrarse para que los administradores puedan consultar tus datos, comprobar si eres apto/a para la mascota en un estudio previo y poder ponerse en contacto contigo.'
    }
  ];

  faqs2 = [
    {
      pregunta: '¿Cómo puedo adoptar una mascota?',
      respuesta: 'Eliges la mascota y clicas en el botón de reservar. Después de reservar y mostrar tu interés en la mascota, el/la administrador/a aceptará tu reserva con la mayor brevedad posible. Debes ser  paciente y ten en cuenta que son solo algunos administradores.'
    },
    {
      pregunta: '¿Cómo sé si soy apto para adoptar una mascota?',
      respuesta: 'Si eres apto o no para la adopción depende exclusivamente del estudio de los administradores que gestionan la adopción. Tenemos una política de adopción y condiciones que tenemos en cuenta a la hora de realizar el estudio previo de cada reserva.'
    },
    {
      pregunta: '¿Cómo se si una mascota sigue en adopción?',
      respuesta: 'Todos los animales de Happypaws están en adopción, así que si está en nuestra web, está en adopción.'
    },
    {
      pregunta: 'La mascota que quería adoptar ya no está en la web',
      respuesta: 'Si la mascota no está es que ha sido adoptado.'
    }
  ];

  toggleAnswer(faqGroup: number, index: number) {
    if (faqGroup === 1) {
      this.selectedQuestion1 = this.selectedQuestion1 === index ? null : index;
    } else if (faqGroup === 2) {
      this.selectedQuestion2 = this.selectedQuestion2 === index ? null : index;
    }
  }

}
