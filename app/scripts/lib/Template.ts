import { IIterableObject } from './Interfaces';

export function template(template: string, data?:IIterableObject<any>) {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            let value:any = data[key];
            template = template.replace(new RegExp('\{\{' + key + '\}\}', 'g'), value);
        }
    }
    return template;
}