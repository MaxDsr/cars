import * as $ from 'jquery';
import {TransportUnit, TransportUnitParams, seatsVariations} from "./transport-unit";
import {HTMLhelper, transportName} from "./html-helper";


export class Motorcycle extends TransportUnit {

    readonly maxSpeed : number = 200;

    constructor(params : TransportUnitParams) {
        super(params);

        this.makeUnitHtmlElement();
        this.makeSeats();
        super.changeColors();
        super.makeVehicleLogo();
    }

    protected makeSeats() {

        if (this.seats === seatsVariations.oneSeat) {
            this.makeSeatsByNumber('one-seat');
        }
        else {
            this.seats = 2;
            this.makeSeatsByNumber('two-seats');
        }
    }

    protected makeUnitHtmlElement() {
        let str : string = HTMLhelper.getGenericTransportHTML(transportName.motorcycle);
        this._unitHtmlElement = $.parseHTML(str);
    }

}
