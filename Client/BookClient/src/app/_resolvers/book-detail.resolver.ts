import {Injectable} from '@angular/core';
import {Book} from '../_models/book';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { BookService } from '../_services/book.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BookDetailResolver implements Resolve<Book> {
    constructor(private bookService: BookService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Book> {
        return this.bookService.getBook(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/books']);
                return of(null);
            })
        );
    }
}
