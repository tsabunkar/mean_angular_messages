// !logic to validate the file uploaded it image or not ?
import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const mimeType = (control: AbstractControl)
  : Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {

  if (typeof (control.value) === 'string') {
    return of(null);
  }

  const file = control.value as File; // Extracting the file
  const fileReader = new FileReader(); // reading the file

  const fileReaderObservable = Observable.create( // creating own/custome observable
    (observer: Observer<{ [key: string]: any }>) => {

      fileReader.addEventListener('loadend', () => {
        const fileReaderResultInArrayBuffer = (<ArrayBuffer>fileReader.result);
        // below we r doing mime-type validation (i.e-file uploaded is image or not)
        // Uint8Array() -> create array of 8 bit, unsigined integers
        const arr = new Uint8Array(fileReaderResultInArrayBuffer).subarray(0, 4);
        let header = '';
        let isValid = false;

        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16); // converting to hexadecimal value
        }
        switch (header) {
          case '89504e47': // 89504e47-> pattern (which stands for certain file type)
            isValid = true;
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
          case 'ffd8ffe3':
          case 'ffd8ffe8':
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        if (isValid) {
          observer.next(null); // valid file (i.e-image)
        } else {
          observer.next({ invalidMimeType: true }); // invalid file (other than image)
        }
        observer.complete(); // creation of observable is done
      });
      console.log('file', file);
      // if (file) {
      fileReader.readAsArrayBuffer(file); // reading the file
      // }

    }
  );
  return fileReaderObservable;
};
