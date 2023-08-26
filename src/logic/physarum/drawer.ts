export class Drawer {
    private readonly w: number
    private readonly h: number
    private readonly image: ImageData
    constructor(private ctx: CanvasRenderingContext2D) {
        this.w = ctx.canvas.width
        this.h = ctx.canvas.height
        this.image = ctx.createImageData(this.w || 100, this.h || 100)
        // this.image = ctx.createImageData(100,100)
    }

    mapBuffer(b: Uint8Array, palette: Uint8Array) {
        for (let i = 0; i < this.w * this.h; i++) {
            const v = b[i]
            this.image.data[i*4 + 0]= palette[v*3+0]
            this.image.data[i*4 + 1]= palette[v*3+1]
            this.image.data[i*4 + 2]= palette[v*3+2]
            this.image.data[i*4 + 3]= 255
        }
    }

    draw(x: number, y: number, r: number, g: number, b: number) {
        const pos = 4 * (y * this.w + x)
        this.image.data[pos] = r
        this.image.data[pos+1] = g
        this.image.data[pos+2] = b
        this.image.data[pos+3] = 255
    }

    render() {
        this.ctx.putImageData(this.image, 0, 0)
    }
}