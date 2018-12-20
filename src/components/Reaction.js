class Reaction {
  constructor(gestures) {
    this.gestures = gestures || [];
    this.reset();
    this.offsetX = 0;
    this.offsetY = 0;
  }

  addGesture(points) {
    if (points.length > 0) {
      this.gestures.push(points);
    }
  }

  setOffset(options) {
    this.offsetX = options.x;
    this.offsetY = options.y + 140;
  }

  pointsToSvg(points) {
    const offsetX = this.offsetX;
    const offsetY = this.offsetY;
    if (points && points.length > 0) {
      let path = `M ${points[0].x - offsetX},${points[0].y - offsetY}`;
      points.forEach((point) => {
        path = `${path} L ${point.x - offsetX},${point.y - offsetY}`;
      });
      return path;
    }
    return 'M 0.0, 0.0 L 0.0, 0.0';
  }

  replayLength() {
    return this.replayedGestures.length;
  }

  reset() {
    this.replayedGestures = [[]];
  }

  empty() {
    return this.gestures.length === 0;
  }

  copy() {
    return new Reaction(this.gestures.slice());
  }

  done() {
    return (
      this.empty() || (
        this.replayedGestures.length === this.gestures.length &&
        this.lastReplayedGesture().length === this.gestures[this.gestures.length - 1].length
      ));
  }

  lastReplayedGesture() {
    return this.replayedGestures[this.replayedGestures.length - 1];
  }

  stepGestureLength() {
    const gestureIndex = (this.replayedGestures.length - 1);
    if (!this.gestures[gestureIndex]) {
      return;
    }
    if (this.replayedGestures[gestureIndex].length >= this.gestures[gestureIndex].length) {
      this.replayedGestures.push([]);
    }
  }

  step() {
    if (this.done()) {
      return true;
    }
    this.stepGestureLength();
    const gestureIndex = this.replayedGestures.length - 1;
    const pointIndex = this.replayedGestures[gestureIndex].length;
    const point = this.gestures[gestureIndex][pointIndex];
    this.replayedGestures[gestureIndex].push(point);
    return false;
  }
}

export default Reaction;
