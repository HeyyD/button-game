import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export default abstract class Subscriber implements OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor() {}

  protected addSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  protected addSubscriptions(subscriptions: Subscription[]): void {
    subscriptions.forEach(sub => {
      this.subscriptions.push(sub);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
