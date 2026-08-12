![Covering Bad](https://raw.github.com/seyedi/Covering-Bad/master/images/logo.jpg)

##### A simple, dependency-free vanilla JS plugin for covering an item with another item, with dragging ability.

#### [Live View On Codepen](http://codepen.io/seyedi/full/tJzav)

> **Note:** this plugin used to be built on jQuery and it's preserved on the [`jquery-plugin`](https://github.com/seyedi/Covering-Bad/tree/jquery-plugin) branch if you need it.

## Usage

#### Include:
```html
<link href="css/coveringBad.css" rel="stylesheet" type="text/css">
<script src="js/coveringBad.js"></script>
```

#### HTML:
```html
<div class="covered" data-passive="images/passive.jpg" data-active="images/active.jpg">
	<div class="handle"></div>
	<div class="changeable"></div>
</div>
```

#### JS:
```js
new CoveringBad('.covered');
```

You can also pass a DOM element directly instead of a selector:
```js
const el = document.querySelector('.covered');
new CoveringBad(el);
```

## Options

Pass an options object as the second argument:

```js
new CoveringBad('.covered', {
	marginY: 20,   // Handle's distance from top and bottom
	marginX: 20,   // Handle's distance from left and right
	setX: 30,      // Default location for handle from left
	setY: 150,     // Default location for handle from top
	direction: 'horizontal' // 'horizontal' or 'vertical'
});
```

## More than one

Each instance is independent, so just call `new CoveringBad(...)` once per element:

```html
<div class="covered first" data-passive="images/passive1.jpg" data-active="images/active1.jpg">
	<div class="handle"></div>
	<div class="changeable"></div>
</div>
<div class="covered second" data-passive="images/passive2.jpg" data-active="images/active2.jpg">
	<div class="handle"></div>
	<div class="changeable"></div>
</div>
<div class="covered third" data-passive="images/passive3.jpg" data-active="images/active3.jpg">
	<div class="handle"></div>
	<div class="changeable"></div>
</div>
```

```js
new CoveringBad('.first');
new CoveringBad('.second');
new CoveringBad('.third', {
	marginY: 20,
	marginX: 400,
	setX: 400,
	setY: 235,
	direction: 'vertical'
});
```

Or initialize a whole group at once with the `init` helper, which accepts any selector matching multiple elements:

```js
CoveringBad.init('.covered', { direction: 'vertical' });
```

## License

MIT [http://seyedi.mit-license.org](http://seyedi.mit-license.org)
