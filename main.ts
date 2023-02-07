function setReg(command: number) {
    let buf = pins.createBuffer(2);
    // basic.pause(10)
    // basic.pause(10)
    buf[0] = command >> 8
    buf[1] = command & 0xFF
    return pins.i2cWriteBuffer(SHT31_DEFAULT_ADDR, buf)
}
// < Status Register Heater Bit
function Reset() {
    setReg(SHT31_SOFTRESET)
    basic.pause(10)
}
let SHT31_SOFTRESET = 0x30A2
// < SHT31 Default Address
let SHT31_DEFAULT_ADDR = 0x44
// < Measurement High Repeatability with Clock Stretch Enabled
let SHT31_MEAS_HIGHREP = 0x2400



//% color=#4c6ef5 weight=25 icon="\uf043" block="SHT3x Sensor"
namespace CIPSHT3X {

    //pins.i2cWriteBuffer(SHT31_DEFAULT_ADDR, i2cBuffer, false);

    /**
     * Read Temperature in degrees celcius from the SHT2x sensor.
     * Returns a number des…
    */
    //% blockId="SHT3xDriver_read_humidity"
    //% block="Leer Humedad"
    export function leer_humedad(): number {
        Reset;
        setReg(SHT31_MEAS_HIGHREP);
        //let buf = pins.createBuffer(2);
        //pins.i2cWriteNumber(SHT31_DEFAULT_ADDR, SHT31_MEAS_HIGHREP, NumberFormat.UInt8BE, false);

        basic.pause(100);
        let i2cBuffer = pins.i2cReadBuffer(SHT31_DEFAULT_ADDR, pins.sizeOf(NumberFormat.UInt16LE) * 7, false);

        let result_2 = i2cBuffer[3] << 8;
        result_2 |= i2cBuffer[4];
        result_2 = (625 * result_2) >> 12;
        let hum = result_2 / 100;
        return hum
    }

    // basic.pause(1000)
    //basic.showNumber(hum);
}