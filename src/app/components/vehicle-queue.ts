import * as faker from 'faker';
import {TransportUnit, TransportUnitParams, TransportUnitBrands, seatsVariations} from "./transport-unit";
import {Car} from "./car";
import {Motorcycle} from "./motorcycle";
import {Minibus} from "./minibus";
import {Truck} from "./truck";
import {Tractor} from "./tractor";
import {roadBands} from "./road";
import {Colors} from "./body-colors";
import {Movement} from "./movement";



export enum VehiclesClasses {
    Car = 'Car',
    Motorcycle = 'Motorcycle',
    Minibus = 'Minibus',
    Truck = 'Truck',
    Tractor = 'Tractor'
}

export class VehiclesQueue {

    private vehicles : TransportUnit[] = [];
    private _vehicleToDestroy : TransportUnit[] = [];


    constructor() {

    }

    private objectCreator(vehicleType : VehiclesClasses, params : TransportUnitParams) : TransportUnit {

        switch (vehicleType) {
            case VehiclesClasses.Car: {
                return new Car(params);
            }
            case VehiclesClasses.Motorcycle: {
                return new Motorcycle(params);
            }
            case VehiclesClasses.Minibus: {
                return new Minibus(params);
            }
            case VehiclesClasses.Truck: {
                return new Truck(params);
            }
            case VehiclesClasses.Tractor: {
                return new Tractor(params);
            }
            default: {
                console.log('Something went wrong in VehiclesQueue.objectCreator');
                break;
            }
        }
    }

    pushToArray(vehicle : TransportUnit) {
        this.vehicles.push(vehicle);
    }

    pushToGarbageArray(vehicle : TransportUnit) {
        this._vehicleToDestroy.push(vehicle);
    }

    destroyObject(vehicle : TransportUnit) {
        let index : number = this.vehicles.indexOf(vehicle);
        this.vehicles.splice(index, 1);
    }

    private generateRandSpeed (minSpeed : number, maxSpeed : number, vehicle : TransportUnit) {
        let speed : number = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
        vehicle.setInitialSpeed(speed);
    }


    private getRandomParams() : TransportUnitParams {
        let randColor =
            Colors[
                faker.helpers.replaceSymbolWithNumber(
                    faker.random.arrayElement(Object.getOwnPropertyNames(Colors))
                )
                ];

        let wheelColor = '#889198';

        let randSeats =
            seatsVariations[
                faker.helpers.replaceSymbolWithNumber(
                    faker.random.arrayElement(Object.getOwnPropertyNames(seatsVariations))
                )
                ];


        let randBrand =
            TransportUnitBrands[
                faker.helpers.replaceSymbolWithNumber(
                    faker.random.arrayElement(Object.getOwnPropertyNames(TransportUnitBrands))
                )
                ];


        let randRoadBandSelector =
            roadBands[
                faker.helpers.replaceSymbolWithNumber(
                    faker.random.arrayElement(Object.getOwnPropertyNames(roadBands))
                )
                ];


        return {
            color: randColor,
            wheelColor: wheelColor,
            seats: randSeats,
            brand: randBrand,
            roadBand: randRoadBandSelector,
            vehicleQueue: this
        };

    }

    private getRandomVehicleClass() : VehiclesClasses {

        return VehiclesClasses[
            faker.helpers.replaceSymbolWithNumber(
                faker.random.arrayElement(Object.getOwnPropertyNames(VehiclesClasses))
            )
            ];
    }

    generateVehicles() {
        let minTime : number = 1000;
        let maxTime : number = 10000;
        let time : number =  Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

        setInterval(() => {

            let vehicle : TransportUnit = this.objectCreator(this.getRandomVehicleClass(),
                this.getRandomParams());

            this.generateRandSpeed(vehicle.minSpeed, vehicle.maxSpeed, vehicle);
            vehicle.startMove();
            this.pushToArray(vehicle);

            time = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime; // get new random time
        }, time);
    }

    lookForVehiclesToDestroy() {
        setInterval(() => {
            if (this._vehicleToDestroy.length > 0) {
                this._vehicleToDestroy.forEach((value) => {
                    this.destroyObject(value);
                });
                this._vehicleToDestroy = [];
            }
        }, Movement.movementInterval);
    }

}