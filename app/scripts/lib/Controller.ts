/**
 * Generic controller class to entcapsulate the parsing
 * and other generic stuff
 * 
 * @export
 * @class Controller
 */
export class Controller {

    /**
     * Selector which will be overwritten from the 
     * other Controllers so the parse function 
     * can directly query according to that selector.
     * 
     * @static
     * @type {string} 
     */
    static selector: string;    
        
    /**
     * Instances of the Controller
     * 
     * @static
     * @type {Array<Controller>}
     */
    static _instances: Array<Controller> = [];

    /**
     * HTML attribute to mark elements which are already parsed
     * 
     * @static
     */
    static PARSE_ID_ATTRIBUTE = 'data-parse-ids';

    /**
     * Element where the instance is applied
     * 
     * @private
     * @type {Element}
     */
    private _element: HTMLElement;

    /**
     * Id of current Controller
     * 
     * @type {number}
     */
    _id: number;
    
    /**
     *
     * Access the current Element
     * 
     * @returns {HTMLElement} currentElement
     */
    $(): HTMLElement;
    /**
     * Access element or query by selector
     * 
     * @param {string} selector queryselector for childrens
     * @returns {NodeListOf<HTMLElement>} HTMLElement's which were found
     */
    $(selector: string): NodeListOf<HTMLElement>;
    $(selector?: string): HTMLElement | NodeListOf<HTMLElement> {
        if (!(this._element instanceof Element)) {
            throw new Error('This controller has no element!');
        }
        return selector ? <NodeListOf<HTMLElement>>this._element.querySelectorAll(selector) : <HTMLElement>this._element;
    }


	/**
     * Creates an instance of a Controller.
     * 
     * @param {Element} root The element where the controller has been applied
     */
    constructor(element: HTMLElement) {
        this._element = element;
    }

    
    /**
     * Looks for all Controllers which are instance of a certain class.
     * 
     * @param {Function} klass should be instance of class
     * @returns {Array<Controller>} instances found
     */
    getControllersByClass(klass: Function): Array<Controller> {
        const instances: Array<Controller> = Controller._instances;
        const result: Array<Controller> = [];
        for (let i = 0, max = instances.length; i < max; i++) {
            let instance = instances[i];
            if (instance instanceof klass) {
                result.push(instance);
            }
        }
        return result;
    }

        
    /**
     * Returns Controller by certain ID
     * 
     * @param {string} id Generated ID in DOM
     * @returns {Controller} instanceOf Controller
     */
    getControllerById(id: string): Controller;
    /**
     * Returns Controller by certain ID
     * 
     * @param {number} id Generated ID in DOM
     * @returns {Controller} instanceOf Controller
     */
    getControllerById(id: number): Controller;
    getControllerById(id: string | number): Controller {
        return Controller.getControllerById.apply(this, arguments);
    }

        
    /**
     * Returns binded instance of Controller from element 'element'
     * if they are instances of 'klass'
     * 
     * @param {HTMLElement} element haystack
     * @param {Function} klass needle
     * @returns {Controller} instance of Controller
     */
    getControllerByElementAndClass(element: HTMLElement, klass: Function):Controller {
        const instances: Array<Controller> = Controller._instances;
        for (let i = 0, max = instances.length; i < max; i++) {
            let instance = instances[i];
            if (instance instanceof klass && instance._element === element) {
                return instance;
            }
        }
        return null;
    }
  
    /**
     * Returns all Controllers which are binded to the element
     * 
     * @param {HTMLElement} element haystack
     * @returns {Array<Controller>} instances of Controller
     */
    getControllersByElement(element: HTMLElement): Array<Controller> {
        return Controller.getControllersByElement.apply(this, arguments);
    }

    /**
     * Returns all Controllers which are nested in current Element.
     * 
     * @returns {Array<Controller>} instances of Controller
     */
    getNestedControllers(): Array<Controller> {
        let controllers: Array<Controller> = []; 
        let elementsWithControllers = this.$(`[${Controller.PARSE_ID_ATTRIBUTE}]`);
        for (let i = 0, max = elementsWithControllers.length; i < max; i++) {
            controllers = controllers.concat(this.getControllersByElement(elementsWithControllers[i]));   
        }
        return controllers;
    }

    /**
     * Returns all Controllers which are binded to the element
     * 
     * @param {HTMLElement} element haystack
     * @returns {Array<Controller>} instances of Controller
     */
    static getControllersByElement(element: HTMLElement): Array<Controller> {
        let controllerIdsString = element.getAttribute(Controller.PARSE_ID_ATTRIBUTE);
        let instances: Array<Controller> = [];
        if (controllerIdsString && controllerIdsString.length) {
            let controllerIds = controllerIdsString.trim().split(' ');
            let instanceFound = false;
            for (let j = 0, max = controllerIds.length; j < max; j++) {
                let controller = Controller.getControllerById(controllerIds[j]);
                if (controller instanceof Controller) {
                    instances.push(controller);
                }
            }
        }
        return instances;
    }
  
    /**
     * Returns Controller by certain ID
     * 
     * @param {string} id Generated ID in DOM
     * @returns {Controller} instanceOf Controller
     */
    static getControllerById(id: string): Controller;
    /**
     * Returns Controller by certain ID
     * 
     * @param {number} id Generated ID in DOM
     * @returns {Controller} instanceOf Controller
     */
    static getControllerById(id: number): Controller;
    static getControllerById(id: string | number): Controller {
        const instances: Array<Controller> = Controller._instances;
        const _id: string = id + '';
        for (let i = 0, max = instances.length; i < max; i++) {
            let instance = instances[i];
            if (instance._id === parseInt(_id, 10)) {
                return instance;
            }
        }
        return null;
    }

    /**
     * Hook for running code before the controller is instantiated
     * 
     * @static
     * @param {NodeListOf<Element>} elements List of elements where the controller will be applied
     */
    static beforeInstantiating(elements: NodeListOf<Element>): void { }

    /**
     * Hook for running code after the controller has been instantiated.
     * 
     * @static
     * @param {NodeListOf<Element>} elements List of elements where the controller has been applied
     * @param {Array<Controller>} instances List of controller instances created
     */
    static afterInstantiating(elements: NodeListOf<Element>, instances: Array<Controller>): void { }

    /**
     * Look for elements with a specific selector and creates an instance for
     * every element.
     * 
     * @static
	 * @param {string} selector Dom selector
     * @param {Element} [root=document.body] Starting element for parsing
     */
    static parse(selector: string, root: Element = document.body): void {
        if (typeof this.selector === 'string' && this.selector.length) {
            selector = this.selector;
        } else if (!selector) {
            throw new Error('No Selector for Controller found!');
        }
        
        const elements: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>root.querySelectorAll(selector);
        this.beforeInstantiating(elements);

        for (let i = 0; i < elements.length; i++) {
            let element: HTMLElement = elements[i];
            let controllerIdsString = element.getAttribute(Controller.PARSE_ID_ATTRIBUTE);
            let id = Math.floor(Math.random() * 10 + 1) * Date.now();
            if (controllerIdsString && controllerIdsString.length) {
                let controllerIds = controllerIdsString.trim().split(' ');
                let instanceFound = false;
                for (let j = 0, max = controllerIds.length; j < max; j++) {
                    let controller = Controller.getControllerById(controllerIds[j]);
                    if (controller instanceof this) {
                        instanceFound = true;
                        break;
                    }
                }
                if (instanceFound) {
                    continue;
                }
            } else {
                controllerIdsString = '';
            }
            element.setAttribute(Controller.PARSE_ID_ATTRIBUTE, (controllerIdsString + ' ' + id).trim());
            let instance = new this(element);
            instance._id = id;
            Controller._instances.push(instance);
        }

        this.afterInstantiating(elements, Controller._instances);
    }
}