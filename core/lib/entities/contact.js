export const CONTACT_PATH = 'contacts';
export class Contact {
    constructor(data, id) {
        this.path = CONTACT_PATH;
        this.data = data;
        this.id = id;
    }
}
