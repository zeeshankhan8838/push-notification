import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'push-notification-client';
  showNotification = false;
  notificationMessage = '';

  private readonly publicKey =
    'BNhqZPAJ1nZ8q69eXLm1FmQLSyPtkjeLgxyF9TaMDTy0e5yXdnywt-abPd8ofs1j84HlsQDWdF10Gq5HZtvkZ6A';

  constructor(private http: HttpClient, private swPush: SwPush) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.pushSubscription();
    this.getNotification();
  }

  getNotification(): void {
    this.swPush.messages.subscribe((message: any) => {
      this.show(message.notification.title);
    });
    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      window.open(notification.data.url);
    });
  }

  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled');
      return;
    }

    this.swPush
      .requestSubscription({ serverPublicKey: this.publicKey })
      .then((sub) => {
        // Make a post call to serve
        this.http.post('http://localhost:3000/data', sub).subscribe((data) => {
          console.log(data);
        });
        console.log(JSON.stringify(sub));
      })
      .catch((err) => console.log(err));
  }
  closeNotification() {
    this.showNotification = false;
  }
  show(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.closeNotification();
    }, 5000); // Auto-close after 5 seconds (adjust as needed)
  }
}
