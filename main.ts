let distance: number = 0
let lightLevel: number = 0
let mode: number = 0
let permittedLightLevel: number = 50
let permittedDistance: number = 50
let icon = IconNames.House

function getDistance() {
    pins.digitalWritePin(DigitalPin.P0, 0)
    control.waitMicros(2)

    pins.digitalWritePin(DigitalPin.P0, 1)
    control.waitMicros(10)

    pins.digitalWritePin(DigitalPin.P0, 0)
    
    return Math.idiv(pins.pulseIn(DigitalPin.P11, PulseValue.High), 58)

}

basic.forever(function () {
    input.onButtonPressed(Button.A, function () { mode = 1 })
    input.onButtonPressed(Button.B, function () { mode = 2 })


    
    while(mode == 1) {
        // lightLevel = input.lightLevel()

        // if (lightLevel < permittedLightLevel) 
        //     basic.showIcon(icon)
        //  else 
        //     basic.clearScreen()

        distance = getDistance()
        
        if(distance < permittedDistance) 
            pins.digitalWritePin(DigitalPin.P0, 1)
        else
            if(pins.digitalReadPin(DigitalPin.P0) != 0)
                pins.digitalWritePin(DigitalPin.P0, 0)

        basic.pause(20)
    }

    while (mode == 2) {
        distance = getDistance()
        
        if(distance < permittedDistance) 
            pins.servoWritePin(AnalogPin.P0, 90)
        else
            pins.servoWritePin(AnalogPin.P0, 0)

        basic.pause(20)
    }
})
