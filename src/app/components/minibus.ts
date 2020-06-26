import * as $ from 'jquery';
import {TransportUnit, TransportUnitParams, seatsVariations} from "./transport-unit";
import {HTMLhelper, transportName} from "./html-helper";


export class Minibus extends TransportUnit {

    readonly maxSpeed : number = 180;

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
            case seatsVariations.sixteenSeats: {
                this.makeSeatsByNumber('sixteen-seats');
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
        let str : string = HTMLhelper.getGenericTransportHTML(transportName.minibus);

        this._unitHtmlElement = $.parseHTML(str);
    }



}
