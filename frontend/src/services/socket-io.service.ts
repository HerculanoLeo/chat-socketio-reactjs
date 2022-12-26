import { Socket, io, SocketOptions, ManagerOptions } from 'socket.io-client';
import { Observable } from 'rxjs';

interface Wrapper {
  event: string;
  obs: Observable<any>;
}

export default class SocketIoService {
  private readonly socket: Socket;

  private observables: Wrapper[] = [];

  constructor(
    private readonly baseUrl: string = 'http://localhost:8080',
    opts?: Partial<ManagerOptions & SocketOptions> | undefined,
  ) {
    this.socket = io(baseUrl, opts);
  }

  get disconnected() {
    return this.socket?.disconnected;
  }

  public reconnect() {
    this.socket?.connect();
  }

  public listing<T>(event: string): Observable<T> {
    const observableOp = this.observables.find((obs) => obs.event === event);

    if (observableOp) {
      return observableOp.obs;
    }

    const observable = new Observable<T>((subscriber) => {
      this.socket.on(event, (data: T) => {
        subscriber.next(data);
      });

      this.socket.on(`${event}/error`, (err: any) => {
        subscriber.error(err);
      });

      return () => {
        this.socket.off(event);
        this.socket.off(`${event}/error`);
        this.observables = this.observables.filter(
          (obs) => obs.event !== event,
        );
      };
    });

    this.observables.push({ event, obs: observable });

    return observable;
  }

  public send(namespace: string, data?: any) {
    this.socket.emit(namespace, data);
  }

  public disconnect() {
    this.socket.disconnect();
  }
}
