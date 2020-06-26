import {TransportUnit} from "./transport-unit";


export enum roadBands {
    leftSideLeftBand = '.left-side div.left-band',
    leftSideRightBand = '.left-side div.right-band',
    rightSideLeftBand = '.right-side div.left-band',
    rightSideRightBand = '.right-side div.right-band'
}

export class Road {

    private static leftSideLeftBandQueue : TransportUnit[] = [];
    private static leftSideRightBandQueue : TransportUnit[] = [];
    private static rightSideLeftBandQueue : TransportUnit[] = [];
    private static rightSideRightBandQueue : TransportUnit[] = [];

    static pushToRoadBand(vehicleOnBand : TransportUnit, roadBand : roadBands) {
        switch (roadBand) {
            case roadBands.leftSideLeftBand: {
                this.leftSideLeftBandQueue.push(vehicleOnBand);
                break;
            }
            case roadBands.leftSideRightBand: {
                this.leftSideRightBandQueue.push(vehicleOnBand);
                break;
            }
            case roadBands.rightSideLeftBand: {
                this.rightSideLeftBandQueue.push(vehicleOnBand);
                break;
            }
            case roadBands.rightSideRightBand: {
                this.rightSideRightBandQueue.push(vehicleOnBand);
                break;
            }
            default: {
                console.log('Something went wrong in "pushToRoadBand"');
                break;
            }
        }
    }

    static getRoadBandQueue(roadBand : roadBands) : TransportUnit[] {
        switch (roadBand) {
            case roadBands.leftSideLeftBand: {
                return this.leftSideLeftBandQueue;
            }
            case roadBands.leftSideRightBand: {
                return this.leftSideRightBandQueue;
            }
            case roadBands.rightSideLeftBand: {
                return this.rightSideLeftBandQueue;
            }
            case roadBands.rightSideRightBand: {
                return this.rightSideRightBandQueue;
            }
            default: {
                console.log('Something went wrong in "getRoadBandQueue"');
                break;
            }
        }
    }

    static removeVehicle(vehicle : TransportUnit, roadBand : roadBands) {
        switch (roadBand) {
            case roadBands.leftSideLeftBand: {
                let index : number = this.leftSideLeftBandQueue.indexOf(vehicle);
                this.leftSideLeftBandQueue.splice(index, 1);
                break;
            }
            case roadBands.leftSideRightBand: {
                let index : number = this.leftSideRightBandQueue.indexOf(vehicle);
                this.leftSideRightBandQueue.splice(index, 1);
                break;
            }
            case roadBands.rightSideLeftBand: {
                let index : number = this.rightSideLeftBandQueue.indexOf(vehicle);
                this.rightSideLeftBandQueue.splice(index, 1);
                break;
            }
            case roadBands.rightSideRightBand: {
                let index : number = this.rightSideRightBandQueue.indexOf(vehicle);
                this.rightSideRightBandQueue.splice(index, 1);
                break;
            }
            default: {
                console.log('Something went wrong in "getRoadBandQueue"');
                break;
            }
        }
    }

    static checkIfBandIsFree(roadBand : roadBands) {
        let currentRoadBand = Road.getRoadBandQueue(roadBand);
        return currentRoadBand.length === 0;
    }


}
