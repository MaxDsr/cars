import * as $ from 'jquery';
import {TransportUnit, TransportUnitParams, seatsVariations} from "./transport-unit";
import {HTMLhelper} from "./html-helper";


export enum TruckCorpusSelector {
    hitchSelector = 'hitch',
    trailSelector = 'trail'
}

export class Truck extends TransportUnit {

    readonly maxSpeed : number = 170;

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
            default: {
                this.seats = 2;
                this.makeSeatsByNumber('two-seats');
                break;
            }
        }
    }

    changeCorpusPartColor(selector : TruckCorpusSelector, color : string) {
        $(this._unitHtmlElement).find(selector).css('background-color', color);
    }


    protected makeUnitHtmlElement() {
        let str : string = HTMLhelper.getTruckHTML();

        this._unitHtmlElement = $.parseHTML(str);
    }

}