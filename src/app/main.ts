import * as $ from 'jquery';
import * as faker from 'faker';
import {
    TransportUnitParams, seatsVariations, TransportUnitBrands,
    MovementDirections, TransportUnit
} from "./components/transport-unit";
import {Colors} from "./components/body-colors";
import {Motorcycle} from "./components/motorcycle";
import {Minibus} from "./components/minibus";
import {Truck} from "./components/truck";
import {Car} from "./components/car";
import {Tractor} from "./components/tractor";
import {VehiclesClasses, VehiclesQueue} from "./components/vehicle-queue";


let vehicleQueue : VehiclesQueue = new VehiclesQueue();

vehicleQueue.generateVehicles();
vehicleQueue.lookForVehiclesToDestroy();

// let jopa : Car[] = [new Car(params), new Car(params), new Car(params)];
//
// console.log(jopa);
//
// jopa.forEach((value) => {
//     console.log(value);
// });

// let opaa : opClass = new opClass();
//
// let carok = opaa.metodaa(params);
//
// console.log(carok);