import * as $ from 'jquery';
import {TransportUnit, TransportUnitParams} from "./transport-unit";
import {HTMLhelper} from "./html-helper";
import {Colors} from "./body-colors";



export class Tractor extends TransportUnit {

    readonly maxSpeed : number = 80;

    constructor(params : TransportUnitParams) {
        super(params);

        this.makeUnitHtmlElement();

    }

    protected makeSeats() {}

    protected makeVehicleLogo() {
        console.log('No vehicle brand here.');
    }

    public changeTractorColors(frontSideColor : Colors, backSideColor : Colors) {
        let frontSideOfTractor = $(this._unitHtmlElement).find('div.front-side');
        $(frontSideOfTractor).css('background-color', frontSideColor);

        let backSideOfTractor = $(this._unitHtmlElement).find('div.back-side');
        $(backSideOfTractor).css('background-color', backSideColor);

        let wheels = $(this._unitHtmlElement).find('div.wheel');
        $(wheels).css('background-color', this.wheelColor);
    }


    protected makeUnitHtmlElement() {
        let str : string = HTMLhelper.getTractorHTML();
        this._unitHtmlElement = $.parseHTML(str);
    }
}