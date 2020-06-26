import * as $ from 'jquery';
import {TransportUnit, TransportUnitParams, seatsVariations} from "./transport-unit";
import {HTMLhelper, transportName} from "./html-helper";


export class Car extends TransportUnit {


    readonly maxSpeed : number = 250;

    constructor(params : TransportUnitParams) {
        super(params);

        this.makeUnitHtmlElement();
        this.makeSeats();
        super.changeColors();
        super.makeVehicleLogo();
    }

    protected makeSeats() {
        switch (this.seats) {
            case seatsVariations.twoSeats: {
                this.makeSeatsByNumber('two-seats');
                break;
            }
            case seatsVariations.fourSeats: {
                this.makeSeatsByNumber('four-seats');
                break;
            }
            case seatsVariations.sixSeats: {
                this.makeSeatsByNumber('six-seats');
                break;
            }
            default: {
                this.seats = 2;
                this.makeSeatsByNumber('two-seats');
                break;
            }
        }
    }

    protected makeUnitHtmlElement() {
        let str : string = HTMLhelper.getGenericTransportHTML(transportName.car);
        this._unitHtmlElement = $.parseHTML(str);
    }

}

