import {Colors} from "./body-colors";
import {roadBands} from "./road";
import * as $ from 'jquery';
import {HTMLhelper} from "./html-helper";
import {Movement} from "./movement";
import {VehiclesQueue} from "./vehicle-queue";



export enum seatsVariations {
    oneSeat = 1,
    twoSeats = 2,
    fourSeats = 4,
    sixSeats = 6,
    sixteenSeats = 16
}

export enum TransportUnitBrands {
    audi = 'audi',
    bmw = 'bmw',
    honda = 'honda',
    landRover = 'land-rover',
    subaru = 'subaru',
    toyota = 'toyota',
    volkswagen = 'volkswagen'
}

export interface TransportUnitParams {
    color : Colors;
    wheelColor : string;
    seats : seatsVariations;
    brand : TransportUnitBrands;
    roadBand : roadBands;
    vehicleQueue : VehiclesQueue;
}

export enum MovementDirections {
    toTheTop = 'bottom',
    toTheBottom = 'top'
}

export abstract class TransportUnit {

    protected color : string;
    protected wheelColor : string;
    protected seats : number;
    private _roadBand : roadBands;
    readonly minSpeed : number = 50;
    readonly maxSpeed : number;
    private _initialSpeed : number;
    protected _speed : number;
    protected brand : string;
    protected _unitHtmlElement;
    private _safeDistancePosition : number;
    private _vehicleLength : number;
    private vehicleQueue : VehiclesQueue;

    private movement : Movement;

    constructor(params : TransportUnitParams) {

        this.color = params.color;
        this.wheelColor = params.wheelColor;
        this.seats = params.seats;
        this.brand = params.brand;
        this._roadBand = params.roadBand;
        this.vehicleQueue = params.vehicleQueue;
    }

    protected abstract makeSeats();

    protected abstract makeUnitHtmlElement();

    protected makeVehicleLogo() {
        let str = HTMLhelper.getCarBrandImageHTML(this.brand);
        let image = $.parseHTML(str);
        $(this._unitHtmlElement).find('div.body').append(image);
    }

    protected changeColors() {
        let bodyOfVehicle = $(this._unitHtmlElement).find('div.body');
        $(bodyOfVehicle).css('background-color', this.color);

        let wheels = $(this._unitHtmlElement).find('div.wheel');
        $(wheels).css('background-color', this.wheelColor);

    }

    protected makeSeatsByNumber(styleClass : string) {
        let seatsWrap = $(this._unitHtmlElement).find('div.seats');

        for (let i = 0; i < this.seats; i++)
            $(seatsWrap).append(HTMLhelper.getSingleSeat());

        $(seatsWrap).addClass(styleClass);
    }

    calcSafeDistancePosition(movement : MovementDirections) {
        let position = $(this._unitHtmlElement).position();

        if (movement === MovementDirections.toTheTop) {
            this._safeDistancePosition = position.top + this._vehicleLength + 80;
        }
        else if (movement === MovementDirections.toTheBottom) {
            this._safeDistancePosition = position.top - 80;
        }
        // 80 is the 80px of distance of safety. It starts right from the end of vehicle
    }

    calcVehicleLength() {
        let strHeight : string = $(this._unitHtmlElement).css('height');
        this._vehicleLength = parseInt(strHeight);
    }

    insertUnit(roadBand?: roadBands) {
        if (roadBand) {
            $(roadBand).append(this._unitHtmlElement);
        }
        else if (!roadBand) {
            let band = $(this.roadBand);
            $(band).append(this._unitHtmlElement);
        }
    }

    startMove() {

        this.movement = new Movement(this);

        this.insertUnit();
        this.movement.prepareTheMovement();

        let intervalID = setInterval(() => {
            if (this.movement.frontVehicleIsFarEnough()) {
                clearInterval(intervalID);
                this.movement.startTheMovement();
            }
        }, Movement.movementInterval);
    }

    destroyFromDOM(roadBand?: roadBands) {
        if (roadBand) {
            $(roadBand).find(this._unitHtmlElement).remove();
        }
        else if (!roadBand) {
            $(this._unitHtmlElement).remove();
        }

        this.vehicleQueue.pushToGarbageArray(this);
    }

    setInitialSpeed(value : number) {
        this._speed = value;
        this._initialSpeed = this._speed;
    }

    get unitHtmlElement() {
        return this._unitHtmlElement;
    }

    get roadBand() {
        return this._roadBand;
    }

    set roadBand(value:roadBands) {
        this._roadBand = value;
    }

    get safeDistancePosition():number {
        return this._safeDistancePosition;
    }

    get vehicleLength():number {
        return this._vehicleLength;
    }

    set speed(value : number) {
        this._speed = value;
    }

    get speed() {
        return this._speed;
    }

    get initialSpeed():number {
        return this._initialSpeed;
    }

}
