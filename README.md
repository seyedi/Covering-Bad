![Covering Bad](https://raw.github.com/seyedi/Covering-Bad/master/images/logo.jpg)

#####A simple jQuery Plugin for cover an item by another item with dragging ability.

####[Live View On Codepen](http://codepen.io/seyedi/full/tJzav)

## 
#Usage

####Include:
```html
<link href="css/coveringBad.css" type="text/css"/>
<link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/3.2.1/css/font-awesome.min.css"/>
<script src="js/coveringBad.js" ></script>
```

####Html:
```html
<div class="covered">
	<div class="handle"></div>
	<div class="changeable"></div>
</div>
```

####js:
```js
$(function() {
	$('.covered').coveringBad();
});
```

## 
 
###Options:
```
>js

	marginY : 20, 	// Handle's distance from top and bottom
	marginX : 20, 	// Handle's distance from left and right
	setX    : 30, 	// Defulat location for handle from left
	setY    : 150,  // Defulat location for handle from top
	direction : "horizontal" // would be horizontal/vertical


```

###More than one :

```html
<div class="covered first">
	<div class="handle"></div>
	<div class="changeable"></div>
</div>
<div class="covered second">
	<div class="handle"></div>
	<div class="changeable"></div>
</div>
<div class="covered third">
	<div class="handle"></div>
	<div class="changeable"></div>
</div>
```

```js
$(function() {
	$('.first').coveringBad();
	$('.second').coveringBad();
	$('.third').coveringBad({
		marginY : 20 ,
		marginX : 400 ,
		setX  : 400,
		setY  : 235 ,
		direction   : "vertical"
	});
});
```

# License

MIT [http://seyedi.mit-license.org](http://seyedi.mit-license.org)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/seyedi/covering-bad/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
