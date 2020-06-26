

export enum transportName {
    car = 'car',
    minibus = 'minibus',
    motorcycle = 'motorcycle'
}

export class HTMLhelper {



    public static getCarBrandImageHTML(brand : string) : string {
        return '<img class="car-brand-image" src="images/car-logos/' + brand + '.svg">';
    }

    public static getSingleSeat() : string {
        return '<div class="single-seat"></div>';
    }

    public static getGenericTransportHTML(transportClassName : transportName) : string {
        return `<div class="` + transportClassName + ' vehicle' + `">
                    <div class="body">
                        <div class="seats">
                        </div>
                        <div class="wheels-container">
                            <div class="wheel"></div>
                            <div class="wheel"></div>
                            <div class="wheel"></div>
                            <div class="wheel"></div>
                        </div>
                    </div>
                </div>`;
    }

    public static getTruckHTML() : string {
        return `<div class="truck vehicle">
                    <div class="body">
                        <div class="seats">
                        </div>
                        <div class="wheels-container">
                            <div class="wheel"></div>
                            <div class="wheel"></div>
                            <div class="wheel"></div>
                            <div class="wheel"></div>
                        </div>
                    </div>
                    <div class="hitch"></div>
                    <div class="trail">
                        <div class="wheels-container">
                            <div class="wheel"></div>
                            <div class="wheel"></div>
                            <div class="wheel"></div>
                            <div class="wheel"></div>
                            <div class="wheel"></div>
                            <div class="wheel"></div>
                        </div>
                    </div>
                </div>`;
    }

    public static getTractorHTML() {
        return `<div class="tractor vehicle">
                    <div class="body">
                        <div class="front-side">
                            <div class="wheels-container">
                                <div class="wheel"></div>
                                <div class="wheel"></div>
                            </div>
                        </div>
                        <div class="back-side">
                            <div class="seats">
                                <div class="single-seat"></div>
                            </div>
                            <div class="wheels-container">
                                <div class="wheel"></div>
                                <div class="wheel"></div>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
}
