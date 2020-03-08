//TODO
if (typeof registerPaint !== "undefined") {
  console.log("registerPaint");
  class MarvelBtn {
    static get inputProperties() {
      return ["--btn-color", "--btn-width"];
    }
    static get inputArguments() {
      return ["*"];
    }

    static get contextOptions() {}

    parseValue(str) {
      return str
        .toString()
        .replace(" ", "")
        .split(" ");
    }

    paint(ctx, size, props, args) {
      const [fillType] = this.parseValue(args[0]);
      console.log(fillType);
      ctx.lineWidth = props.get("--btn-width");
      ctx.strokeStyle = props.get("--btn-color");
      const inset = ctx.lineWidth / 2;
      const radius = [20, 0, 20, 0];
      const topLeftRadius = radius[0];
      const topRightRadius = radius[1];
      const bottomRightRadius = radius[2];
      const bottomLeftRadius = radius[3];

      console.log({ args });
      const { width, height } = size;
      ctx.lineTo(topLeftRadius, inset);
      ctx.lineTo(width - topRightRadius, inset);
      ctx.lineTo(width - inset, topRightRadius);
      ctx.lineTo(width - inset, height - bottomRightRadius);
      ctx.lineTo(width - bottomRightRadius, height - inset);
      ctx.lineTo(bottomLeftRadius, height - inset);
      ctx.lineTo(inset, height - bottomLeftRadius);
      ctx.lineTo(inset, topLeftRadius);
      ctx.closePath();
      ctx.stroke();
    }
  }
  registerPaint("marvelbtn", MarvelBtn);
}
