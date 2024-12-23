import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EventService, Event } from '../../services/event.service';
import { scheduler } from 'dhtmlx-scheduler';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  selector: 'scheduler',
  styleUrls: ['./scheduler.component.css'],
  templateUrl: './scheduler.component.html',
})
export class SchedulerComponent implements OnInit {
  @ViewChild('scheduler_here', { static: true }) schedulerContainer!: ElementRef;
  constructor(private eventService: EventService, private loginService: LoginService, private router: Router) {}

  ngOnInit() {

    scheduler.config.server_utc = false;
    scheduler.init(this.schedulerContainer.nativeElement, new Date(), 'month');

    this.loadEvents();

    this.setupSchedulerEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(
      (events) => {
        scheduler.clearAll();
        scheduler.parse(
          events.map((event) => ({
            id: event.id,
            start_date: new Date(event.startDate),
            end_date: new Date(event.endDate),
            text: event.text,
          })),

        );
      },
      (error) => {
        console.error('Erro ao carregar eventos', error);
      }
    );
  }

  setupSchedulerEvents() {
    scheduler.attachEvent('onEventAdded', (id, event) => {
      this.saveEvent(event);
    });

    scheduler.attachEvent('onEventChanged', (id, event) => {
      this.updateEvent(event);
    });

    scheduler.attachEvent('onEventDeleted', (id) => {
      this.deleteEvent(id);
    });
  }

  saveEvent(event: any) {

    const isDuplicate = this.checkForDuplicateEvent(event);
    if (isDuplicate) {
      alert('Este evento já existe no mesmo intervalo de tempo.');
      return;
    }

    const newEvent: Partial<Event> = {
      startDate: event.start_date.toISOString(),
      endDate: event.end_date.toISOString(),
      text: event.text,
    };

    this.eventService.createEvent(newEvent).subscribe(
      (createdEvent) => {
        scheduler.changeEventId(event.id, createdEvent.id.toString());
        console.log('Evento criado com sucesso!', createdEvent);
      },
      (error) => {
        console.error('Erro ao criar evento', error);

        if (error.status === 403) {
          alert('Você não tem permissão para criar este evento. Verifique suas permissões ou entre em contato com o administrador.');
        } else {
          alert('Ocorreu um erro inesperado ao criar o evento.');
        }

        scheduler.deleteEvent(event.id);
      }
    );
  }


  checkForDuplicateEvent(event: any): boolean {

    const existingEvents = scheduler.getEvents();
    return existingEvents.some((existingEvent: any) =>
      existingEvent.startDate === event.start_date && existingEvent.endDate === event.end_date);
  }


  updateEvent(event: any) {
    const updatedEvent: Partial<Event> = {
      startDate: event.start_date.toISOString(),
      endDate: event.end_date.toISOString(),
      text: event.text,
    };

    this.eventService.updateEvent(event.id, updatedEvent).subscribe(
      () => console.log('Evento atualizado com sucesso!'),
      (error) => console.error('Erro ao atualizar evento', error)
    );
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(
      () => console.log('Evento removido com sucesso!'),
      (error) => console.error('Erro ao remover evento', error)
    );
  }

  logOut(){


    this.loginService.removerTokenLocalStorage();
    this.router.navigate(['/login']);


  }
}
