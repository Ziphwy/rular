
/**
 * parse pix-array from canvas to points-array.
 *
 * @param {any} imageData
 * @returns
 */


class PixesData {
  /**
     * Creates an instance of PixesData.
     * @param {any} { path, pixes }
     * @memberof PixesData
     */
  constructor({ path, pixes }) {
    this.path = path;
    this.pixes = pixes;
  }


  /**
   * * compare pix (line-distance)
   *   - ps: maybe space-distance is suitable.
   *
   * @static
   * @param {any} pix1
   * @param {any} pix2
   * @param {number} [tolerance=0]
   * @returns
   * @memberof PixesData
   */
  static _isSimilarPix(pix1, pix2, tolerance = 0) {
    for (let i = 0; i < 4; i++) {
      if (Math.abs(pix2[i] - pix1[i]) > tolerance) {
        return false;
      }
    }
    return true;
  }

  static _swapAxis(direct, x, y) {
    if (direct === 'y') {
      return {
        $mAxis: y,
        $cAxis: x,
      };
    }
    return {
      $mAxis: x,
      $cAxis: y,
    };
  }

  static _getCrossDirect(direct) {
    return direct === 'x' ? 'y' : 'x';
  }

  getPix(direct, x, y) {
    if (direct === 'y') {
      return this.pixes[x][y];
    }
    return this.pixes[y][x];
  }

  _getLen(direct) {
    if (direct === 'y') {
      return this.pixes.length;
    }
    return this.pixes[0].length;
  }

  _isSimilarRange(direct, mAxis, cAxis, delta, tolerance = 0) {
    if (delta < 1) {
      throw Error('arguments error at [_isSimilarRange]');
    }
    const { $mAxis, $cAxis } = PixesData._swapAxis(direct, mAxis, cAxis);
    const basePix = this.getPix(direct, $mAxis, $cAxis);
    const p0 = Math.max($mAxis - delta, 0);
    const pLen = Math.min($mAxis + delta + 1, this._getLen(direct));

    for (let pi = p0; pi < pLen; pi++) {
      if (!PixesData._isSimilarPix(basePix, this.getPix(direct, pi, $cAxis), tolerance)) {
        return false;
      }
    }
    return true;
  }

  _isSimilarLine(direct, mAxis, cAxis, length, tolerance = 0) {
    const { $mAxis, $cAxis } = PixesData._swapAxis(direct, mAxis, cAxis);
    const basePix = this.getPix(direct, $mAxis, $cAxis);
    const p0 = Math.max($mAxis, 0);
    const pLen = Math.min($mAxis + length + 1, this._getLen(direct));

    for (let pi = p0; pi < pLen; pi++) {
      if (!PixesData._isSimilarPix(basePix, this.getPix(direct, pi, $cAxis), tolerance)) {
        return false;
      }
    }
    return true;
  }

  getSimilarRange(direct, mAxis, cAxis, range, tolerance = 0) {
    const { _swapAxis, _isSimilarPix } = PixesData;
    const { $mAxis, $cAxis } = _swapAxis(direct, mAxis, cAxis);
    const baseColor = this.getPix(direct, $mAxis, $cAxis);
    const pLen = this._getLen(direct);

    // 1.1 find the pix different to  between 0 and mAxis;
    let p0 = $mAxis - 1;
    while (p0 > -1 && _isSimilarPix(baseColor, this.getPix(direct, p0, $cAxis), tolerance)) p0--;
    // 1.1 get (p0, mAxis - 1], so take [p0 + 1, mAxis - 1]
    p0 += 1;

    if (range > 0 && p0 < $mAxis) {
      // 1.2 find the pix accord to the srange between x0 and mAxis-1
      if (direct === 'x') {
        while (p0 > -1 && !this._isSimilarRange('y', p0, $cAxis, range, tolerance)) p0++;
      } else {
        while (p0 > -1 && !this._isSimilarRange('x', $cAxis, p0, range, tolerance)) p0++;
      }
    }

    // 2. find the pix different to x between mAxis+1 and pLen;
    let pn = $mAxis + 1;
    while (pn < pLen && _isSimilarPix(baseColor, this.getPix(direct, pn, $cAxis), tolerance)) pn++;
    // get [mAxis + 1, pn), so take [mAxis + 1, pn - 1]
    pn -= 1;

    if (range > 0 && pn > $mAxis) {
      //  2.1 check range: 0 -- [x <--(xn')<-- xn] -- max
      if (direct === 'x') {
        while (pn > $mAxis && !this._isSimilarRange('y', pn, $cAxis, range, tolerance)) pn--;
      } else {
        while (pn > $mAxis && !this._isSimilarRange('x', $cAxis, pn, range, tolerance)) pn--;
      }
    }

    return { p0, pn }; // [p0, pn], if no similar to near pix will return [mAxis, mAxis].
  }

  getSimilarRect(x, y, width, height, tolerence = 0) {
    let x0 = x;
    let xn = x + width;

    while (x0 < xn && this._isSimilarLine('y', x0, y, height, tolerence)) {
      x0++;
    }

    while (xn > x0 && this._isSimilarLine('y', xn, y, height, tolerence)) {
      xn--;
    }

    const xLen = xn - x0;
    let y0 = y;
    let yn = y + height;

    while (y0 < yn && this._isSimilarLine('x', x0, y0, xLen, tolerence)) {
      y0++;
    }

    while (yn > y0 && this._isSimilarLine('x', x0, yn, xLen, tolerence)) {
      yn--;
    }

    return {
      x0, xn, y0, yn,
    };
  }
}


export default class PixesDatabase {
  constructor() {
    this.database = {};
  }
  static parsePixes(imageData) {
    const pixes = [];
    const { data, width } = imageData;
    const len = data.length;
    let raw = [];
    for (let i = 0; i < len; i += 4) {
      raw.push([data[i], data[i + 1], data[i + 2], data[i + 3]]);
      if (raw.length === width) {
        pixes.push(raw);
        raw = [];
      }
    }
    return pixes;
  }
  addPixesData(path, imageData) {
    this.database[path] = new PixesData({
      path,
      pixes: PixesDatabase.parsePixes(imageData),
    });
  }
  /**
   *
   *
   * @param {any} path
   * @returns {PixesData}
   * @memberof PixesDatabase
   */
  getPixesData(path) {
    return this.database[path];
  }
}

