import {map, Observable, timer} from 'rxjs';
import {takeWhile, tap} from 'rxjs/operators';
import {SEC} from "../config";
import {disableInterfaceAndPrepareTickets, startGame} from "./GameService";
import {updateDomTimer} from "../views/HomeView";


export const remainingTimeUpdate = (seconds: number): void => {
    let mins: string = Math.floor(seconds / 60).toString();
    let sec: string = (seconds - (parseInt(mins) * 60)).toString();

    if (mins.length <= 1)
        mins = "0" + mins;
    if (sec.length <= 1)
        sec = "0" + sec;
    updateDomTimer(sec, mins);
}

export const scheduleGameAndStart = (): void => {
    startTimer(10).subscribe(x => {
        if (x == 5) {
            disableInterfaceAndPrepareTickets()
        }
        if (x <= 0) {
            startGame()
        }
    });
}


export const startTimer = (time: number): Observable<number> => {
    let counter = time;
    return timer(SEC, SEC)
        .pipe(
            takeWhile(() => counter > 0),
            tap(() => counter--),
            tap(() => {
                remainingTimeUpdate(counter)
            }),
            map(() => counter)
        )
}
