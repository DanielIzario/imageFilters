// Daniel Izario

imageFilters.gaussian = function(pixels, args) {
  var divider = 16,
      operator = [1/divider, 2/divider, 1/divider,
                  2/divider, 4/divider, 2/divider,
                  1/divider, 2/divider, 1/divider];

  return imageFilters.convolution(pixels, operator);
};

imageFilters.grayscale = function(pixels, args) {
  for (var i = 0; i < pixels.data.length; i += 4) {

    var r = pixels.data[i],
        g = pixels.data[i+1],
        b = pixels.data[i+2];

    pixels.data[i] = pixels.data[i+1] = pixels.data[i+2] = 0.2126*r + 0.7152*g + 0.0722*b;

  }

  return pixels;
};

imageFilters.highpass = function(pixels, args) {
  var operator = [-1, -1, -1,
                  -1,  8, -1,
                  -1, -1, -1];

  return imageFilters.convolution(pixels, operator);
};

imageFilters.invert = function(pixels, args) {
  for (var i = 0; i < pixels.data.length; i += 4) {

    pixels.data[i] = 255 - pixels.data[i];
    pixels.data[i+1] = 255 - pixels.data[i+1];
    pixels.data[i+2] = 255 - pixels.data[i+2];

  }

  return pixels;
};

imageFilters.laplacian = function(pixels, args) {
  var operator = [ 0, -1, 0,
                  -1, 4, -1,
                  0, -1, 0 ];

  return imageFilters.convolution(pixels, operator);
};

imageFilters.lowpass3 = function(pixels, args) {
  var k = 1/9;
  var operator = [ k, k, k,
                   k, k, k,
                   k, k, k];

  return imageFilters.convolution(pixels, operator);
};

imageFilters.lowpass5 = function(pixels, args) {
  var k = 1/25;

 var operator = [ k, k, k, k, k,
                  k, k, k, k, k,
                  k, k, k, k, k,
                  k ,k, k, k, k,
                  k ,k, k, k, k];

  return imageFilters.convolution(pixels, operator);
};

imageFilters.prewittHorizontal = function(pixels, args) {
  var divider = 3;

  var operator = [1/divider, 1/divider, 1/divider,
                  0, 0, 0,
                  -1/divider, -1/divider, -1/divider];

  return imageFilters.convolution(pixels, operator);
};

imageFilters.prewittVertical = function(pixels, args) {
  var divider = 3;

  var operator = [-1/divider, 0, 1/divider,
                  -1/divider, 0, 1/divider,
                  -1/divider, 0, 1/divider];

  return imageFilters.convolution(pixels, operator);
};

imageFilters.red = function(pixels, args) {
  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    d[i] = d[i];
    d[i+1] = 0;
    d[i+2] = 0;
  }

  return pixels;
};

imageFilters.green = function(pixels, args) {
  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    d[i] = 0;
    d[i+2] = 0;
  }

  return pixels;
};

imageFilters.blue = function(pixels, args) {
  var d = pixels.data;

  for (var i = 0; i < d.length; i += 4) {

    d[i] = 0;
    d[i+1] = 0;
  }

  return pixels;
};

imageFilters.roberts = function(pixels, args) {
  var operator = [0, 0, 0,
                  1, -1, 0,
                  0, 0, 0];

  return imageFilters.convolution(pixels, operator);
};

imageFilters.saturation = function(pixels, args) {
    var level = 2.9,
        RW = 0.3086,
        RG = 0.6084,
        RB = 0.0820,
        RW0 = (1 - level) * RW + level,
        RW1 = (1 - level) * RW,
        RW2 = (1 - level) * RW,
        RG0 = (1 - level) * RG,
        RG1 = (1 - level) * RG + level,
        RG2 = (1 - level) * RG,
        RB0 = (1 - level) * RB,
        RB1 = (1 - level) * RB,
        RB2 = (1 - level) * RB + level;

    for (var i = 0; i < pixels.data.length; i += 4) {

       pixels.data[i]   = RW0*pixels.data[i] + RG0*pixels.data[i+1] + RB0*pixels.data[i+2];
       pixels.data[i+1] = RW1*pixels.data[i] + RG1*pixels.data[i+1] + RB1*pixels.data[i+2];
       pixels.data[i+2] = RW2*pixels.data[i] + RG2*pixels.data[i+1] + RB2*pixels.data[i+2];

    }

    return pixels;
};

imageFilters.sepia = function(pixels, args) {
  for (var i = 0; i < pixels.data.length; i += 4) {

    var r = pixels.data[i],
        g = pixels.data[i+1],
        b = pixels.data[i+2];

    pixels.data[i] = pixels.data[i+1] = pixels.data[i+2] = 0.3*r + 0.59*g + 0.11*b;

    pixels.data[i] += 40;
    pixels.data[i+1] += 20;
    pixels.data[i+2] -= 20;
  }

  return pixels;
};

imageFilters.sharpen = function(pixels, args) {
  var operator = [0, -0.2, 0,
                  -0.2, 1.8, -0.2,
                  0, -0.2, 0];

  return imageFilters.convolution(pixels, operator);
};

imageFilters.sobelHorizontal = function(pixels, args) {
  var divider = 4,
      operator = [ 1/divider, 2/divider, 1/divider,
                  0, 0, 0,
                  -1/divider, -2/divider, -1/divider ],
      pixels = imageFilters.convolution(pixels, operator);

  return pixels;
};

imageFilters.sobelVertical = function(pixels, args) {
  var divider = 4,
      operator = [ 1/divider, 0, -1/divider,
                  2/divider, 0, -2/divider,
                  1/divider, 0, -1/divider ],
      pixels = imageFilters.convolution(pixels, operator);

  return pixels;
};

imageFilters.thresholding = function(pixels, args) {
  for (var i = 0; i < pixels.data.length; i += 4) {

    var r = pixels.data[i],
        g = pixels.data[i+1],
        b = pixels.data[i+2];

    var v = 0.2126*r + 0.7152*g + 0.0722*b;

    pixels.data[i] = pixels.data[i+1] = pixels.data[i+2] = v > 128 ? 255 : 0;
  }

  return pixels;
};