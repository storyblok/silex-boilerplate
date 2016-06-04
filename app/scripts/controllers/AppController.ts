import { Controller } from '../lib/Controller';

export class AppController extends Controller {

    static selector: string = '#content';

    constructor(element: HTMLElement) {
        super(element);
    }
}