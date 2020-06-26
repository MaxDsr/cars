import * as $ from 'jquery';
import {TransportUnit, MovementDirections} from "./transport-unit";
import {Road} from "./road";
import {roadBands} from "./road";



export class Movement {

    private transportUnit : TransportUnit;
    private speedInPixels : number;
    private movement : MovementDirections;
    private checkForSlowDown;
    private triggerSlowDown : boolean = false;
    private routeLength;
    private stopValue : number;
    private shift : number;

    static readonly movementInterval = 500;

    constructor(transportUnit : TransportUnit) {
        this.transportUnit = transportUnit;
    }

    private detectMovementDirection() {
        let roadBand : roadBands = this.transportUnit.roadBand;

        if (roadBand === roadBands.leftSideLeftBand || roadBand === roadBands.leftSideRightBand) {
            this.movement = MovementDirections.toTheBottom;
            this.checkForSlowDown = this.checkForSlowDownToTheBottom;
        }
        else if (roadBand === roadBands.rightSideLeftBand || roadBand === roadBands.rightSideRightBand) {
            this.movement = MovementDirections.toTheTop;
            this.checkForSlowDown = this.checkForSlowDownToTheTop;
        }
    }

    prepareTheMovement() {
        this.detectMovementDirection();
        this.transformSpeedToPx(this.transportUnit.speed);
        this.routeLength = $('div.route').css('height');
        this.stopValue = parseInt(this.routeLength);
        this.transportUnit.calcVehicleLength();
        this.shift = -this.transportUnit.vehicleLength;
        $(this.transportUnit.unitHtmlElement).addClass('move-class');
        $(this.transportUnit.unitHtmlElement).css(this.movement, this.shift.toString() + 'px');

        if (this.movement === MovementDirections.toTheBottom) {
            $(this.transportUnit.unitHtmlElement).css('transform', 'rotate(180deg)');
        }
    }

    frontVehicleIsFarEnough() : boolean {

        if (Road.checkIfBandIsFree(this.transportUnit.roadBand)) {
            return true;
        }

        let roadBandArray : TransportUnit[] = Road.getRoadBandQueue(this.transportUnit.roadBand);
        let n = roadBandArray.length;
        let routeLength : number = parseInt(this.routeLength);

        if (this.movement === MovementDirections.toTheTop) {

            if (routeLength - roadBandArray[n - 1].safeDistancePosition >= 0) {
                return true;
            }
            else if (routeLength - roadBandArray[n - 1].safeDistancePosition <= 0) {
                return false;
            }
        }
        else if (this.movement === MovementDirections.toTheBottom) {
            if (roadBandArray[n - 1].safeDistancePosition >= 0) {
                return true;
            }
            else if (roadBandArray[n - 1].safeDistancePosition >= 0) {
                return false;
            }
        }
    }


    startTheMovement() {
        this.transportUnit.calcSafeDistancePosition(this.movement);
        Road.pushToRoadBand(this.transportUnit, this.transportUnit.roadBand);

        let intervalID = setInterval(() => {
            $(this.transportUnit.unitHtmlElement).css(this.movement, this.shift.toString() + 'px');
            if (this.isNotFirstVehicleOnBand()) {
                this.checkForSlowDown();
            }
            else if(this.triggerSlowDown) {
                this.speedUpToDefault();
            }
            this.shift += this.speedInPixels;
            this.transportUnit.calcSafeDistancePosition(this.movement);

            if (this.shift >= this.stopValue + this.speedInPixels) {
                clearInterval(intervalID);
                this.transportUnit.destroyFromDOM();

                Road.removeVehicle(this.transportUnit, this.transportUnit.roadBand);
            }
        }, Movement.movementInterval);
    }

    private checkForDetour() {
        switch (this.transportUnit.roadBand) {
            case roadBands.leftSideLeftBand: {
                if (Road.checkIfBandIsFree(roadBands.leftSideRightBand)) {
                    this.makeDetour(roadBands.leftSideRightBand);
                }
                break;
            }
            case roadBands.leftSideRightBand: {
                if (Road.checkIfBandIsFree(roadBands.leftSideLeftBand)) {
                    this.makeDetour(roadBands.leftSideLeftBand);
                }
                break;
            }
            case roadBands.rightSideLeftBand: {
                if (Road.checkIfBandIsFree(roadBands.rightSideRightBand)) {
                    this.makeDetour(roadBands.rightSideRightBand);
                }
                break;
            }
            case roadBands.rightSideRightBand: {
                if (Road.checkIfBandIsFree(roadBands.rightSideLeftBand)) {
                    this.makeDetour(roadBands.rightSideLeftBand);
                }
                break;
            }
            default: {
                console.log("Can't detour right now.");
                break;
            }
        }
    }

    private makeDetour(roadBandToDetour : roadBands) {

        Road.removeVehicle(this.transportUnit, this.transportUnit.roadBand);
        this.transportUnit.destroyFromDOM(this.transportUnit.roadBand);
        this.transportUnit.insertUnit(roadBandToDetour);
        Road.pushToRoadBand(this.transportUnit, roadBandToDetour);

        this.transportUnit.roadBand = roadBandToDetour;
    }

    private isNotFirstVehicleOnBand() : boolean {
        let roadBandQueu : TransportUnit[] = Road.getRoadBandQueue(this.transportUnit.roadBand);
        let indexOfCurrentVehicle : number = roadBandQueu.indexOf(this.transportUnit);
        return indexOfCurrentVehicle !== 0;
    }

    private checkForSlowDownToTheTop() {

        let roadBandQueue : TransportUnit[] = Road.getRoadBandQueue(this.transportUnit.roadBand);
        let indexOfCurrentVehicle : number = roadBandQueue.indexOf(this.transportUnit);
        let vehicleAtTheFront : number = roadBandQueue[indexOfCurrentVehicle - 1].safeDistancePosition;
        let vehicleAtTheBack : number = $(this.transportUnit.unitHtmlElement).position().top;

        if (vehicleAtTheBack <= vehicleAtTheFront) {
            this.slowDown();
            this.checkForDetour();
        }
        else if (vehicleAtTheBack >= vehicleAtTheFront) {
            this.speedUpToDefault();
        }

        this.triggerSlowDown = true;
    }

    private checkForSlowDownToTheBottom() {
        let roadBandQueue : TransportUnit[] = Road.getRoadBandQueue(this.transportUnit.roadBand);
        let indexOfCurrentVehicle : number = roadBandQueue.indexOf(this.transportUnit);
        let vehicleAtTheFront : number = roadBandQueue[indexOfCurrentVehicle - 1].safeDistancePosition;
        let vehicleAtTheBack : number =
            $(this.transportUnit.unitHtmlElement).position().top + this.transportUnit.vehicleLength;

        if (vehicleAtTheBack >= vehicleAtTheFront) {
            this.slowDown();
            this.checkForDetour();
        }
        else if (vehicleAtTheBack <= vehicleAtTheFront) {
            this.speedUpToDefault();
        }

        this.triggerSlowDown = true;
    }

    private slowDown() {
        let slowDownCoefficient : number = this.transportUnit.speed / 1.5;
        this.transportUnit.speed = this.transportUnit.speed - slowDownCoefficient;
        this.transformSpeedToPx(this.transportUnit.speed);
    }

    private speedUpToDefault() {
        this.transportUnit.speed = this.transportUnit.initialSpeed;
        this.transformSpeedToPx(this.transportUnit.speed);
    }

    private transformSpeedToPx(speed : number) {
        // 1 pixel = 2 km/h
        this.speedInPixels = Math.round(speed / 2);
    }


}