# smart-image-saver

NPM package for saving images locally. Supports image converting with sharp, automatic destination folder creation & simplified handling of destination paths.

This package mainly saves you the code of converting images yourself, getting the destination folder path & ensuring it exists, and having to modify the destination file type for conversions.

&nbsp;

```javascript
const saveImage = require('smart-image-saver');
```

&nbsp;

## Required Parameters

```javascript
await saveImage({
    url: "http://someurl.com/path/to/dest/image.jpg",
    path: "/path/to/dest/image.jpg",
});
```
The most basic usage is providing a source `url`, and a local `path`.

This example results in a file saved with the path: 
`"/path/to/dest/image.jpg"`

&nbsp;

### Destination name

```javascript
await saveImage({
    url: "http://someurl.com/path/to/dest/image.jpg",
    path: "/path/to/dest/image.jpg",
    name: "example",
});
```
If a file `name` is provided, it will override the file name found in the source `url`.

This example results in a file saved with the path: 
`"/path/to/dest/example.jpg"`

&nbsp;


### Destination image type
```javascript
await saveImage({
    url: "http://someurl.com/path/to/dest/image.jpg",
    path: "/path/to/dest/image.jpg",
    name: "example",
    type: "webp"
});
```

If a file `type` is provided, it will automatically convert the image to that type, and override the file type found in the source `url`.

This example results in a file saved with the path: 
`"/path/to/dest/example.webp"`


&nbsp;

&nbsp;

&nbsp;





# Extra Case Handling

### Ignores everything after the folder path
```javascript
await saveImage({
    url: "http://someurl.com/image.jpg",
    path: "/path/to/dest"
});
```
```javascript
await saveImage({
    url: "http://someurl.com/image.jpg",
    path: "/path/to/dest/"
});
```
```javascript
await saveImage({
    url: "http://someurl.com/image.jpg",
    path: "/path/to/dest/ignored.jpg"
});
```
The package automatically ignores any file name in the `path`, appending the name & type.

Any of these examples will result in a file saved with the path: 
`"/path/to/dest/image.jpg"`


&nbsp;

### Ignores everything except the extensionless name of the file

```javascript
await saveImage({
    url: "http://someurl.com/image.jpg",
    path: "/path/to/dest",
    name: "example"
});
```
```javascript
await saveImage({
    url: "http://someurl.com/image.jpg",
    path: "/path/to/dest",
    name: "example.png"
});
```
```javascript
await saveImage({
    url: "http://someurl.com/image.jpg",
    path: "/path/to/dest/ignored.jpg",
    name: "/path/to/dest/all/of/this/will/be/ignored/example.png"
});
```
The package automatically ignores any file path & file type found in the file `name`.

These examples will result in a file saved with the path: 
`"/path/to/dest/example.jpg"`


&nbsp;

### Type handling

```javascript
await saveImage({
    url: "http://someurl.com/image.jpg",
    path: "/path/to/dest/",
    type: "webp"
});
```
```javascript
await saveImage({
    url: "http://someurl.com/image.jpg",
    path: "/path/to/dest/ignored.jpg",
    type: "webp"
});
```
If a file `type` value is provided, the saved image will be converted to that file type and saved with that file extension.

Both of these example will result in a file saved with the path: 
`"/path/to/dest/image.webp"`