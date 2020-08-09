import { Subject } from 'rxjs';

export class RefreshServiceUtil {


    private refresh = new Subject<any[]>();
    changeEmitted$ = this.refresh.asObservable();

    refreshCards(){
        this.refresh.next();
    }

}
