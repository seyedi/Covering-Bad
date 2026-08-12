/*
 *  Project     : Covering Bad
 *  Description : A simple vanilla JS plugin for covering an item with another
 *                item, with dragging ability. No dependencies.
 *  Author      : Mojtaba Seyedi
 *  License     : MIT  http://seyedi.mit-license.org
 *
 *  Modernized  : rewritten from the original jQuery plugin as a dependency-free
 *                ES module / UMD class, using the Pointer Events API so the
 *                same code handles mouse, touch, and pen input.
 */

(function (root, factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		root.CoveringBad = factory();
	}
}(typeof self !== 'undefined' ? self : this, function () {
	'use strict';

	const DEFAULTS = {
		marginY: 30,   // Handle's distance from top and bottom
		marginX: 30,   // Handle's distance from left and right
		setX: 30,      // Default location for handle from left
		setY: 30,      // Default location for handle from top
		direction: 'horizontal' // 'horizontal' or 'vertical'
	};

	class CoveringBad {

		/**
		 * @param {string|Element} element - CSS selector or DOM element (the ".covered" container)
		 * @param {object} [options]
		 */
		constructor(element, options) {
			this.el = typeof element === 'string' ? document.querySelector(element) : element;

			if (!this.el) {
				throw new Error('CoveringBad: target element not found.');
			}

			this.settings = Object.assign({}, DEFAULTS, options);

			// Bind handlers once so add/removeEventListener refer to the same function
			this._onPointerDown = this._onPointerDown.bind(this);
			this._onPointerMove = this._onPointerMove.bind(this);
			this._onPointerUp = this._onPointerUp.bind(this);

			this._build();
		}

		/**
		 * Convenience helper to initialize CoveringBad on multiple elements at once,
		 * similar to calling the old jQuery plugin on a collection.
		 * @param {string|NodeList|Element[]} selector
		 * @param {object} [options]
		 * @returns {CoveringBad[]}
		 */
		static init(selector, options) {
			const nodes = typeof selector === 'string'
				? document.querySelectorAll(selector)
				: selector;

			return Array.from(nodes).map((node) => new CoveringBad(node, options));
		}

		_build() {
			const { el, settings } = this;

			this.changeable = el.querySelector(':scope > .changeable');
			this.handle = el.querySelector(':scope > .handle');

			const width = el.clientWidth;
			const height = el.clientHeight;

			this.minLeft = settings.marginX;
			this.maxLeft = width - settings.marginX;
			this.minTop = settings.marginY;
			this.maxTop = height - settings.marginY;

			let setX = settings.setX;
			let setY = settings.setY;

			el.style.backgroundImage = `url(${el.dataset.passive})`;
			this.changeable.style.backgroundImage = `url(${el.dataset.active})`;
			// .changeable is width:100%/height:100% by default (see coveringBad.css),
			// so it already covers the container fully; only the dragged dimension
			// needs to be overridden below, per direction.

			if (setX < this.minLeft) setX = this.minLeft;
			if (setY < this.minTop) setY = this.minTop;

			this.handle.innerHTML =
				'<span class="cb-arrow cb-arrow-left"></span>' +
				'<span class="cb-arrow cb-arrow-right"></span>';

			this.handle.style.left = `${setX}px`;
			this.handle.style.top = `${setY}px`;

			if (settings.direction === 'horizontal') {
				this.changeable.style.width = `${setX}px`;
				this.changeable.style.borderRight = '1px dashed #FFF';
			} else if (settings.direction === 'vertical') {
				// Freeze the container's current (100%-derived) height as a pixel
				// value so it doesn't collapse once .changeable's height is
				// overridden below to the drag height.
				el.style.height = `${el.clientHeight}px`;
				this.changeable.style.height = `${setY}px`;
				this.changeable.style.borderBottom = '1px dashed #FFF';
				this.handle.classList.add('vertical');
			}

			this.handle.style.touchAction = 'none';
			this.handle.addEventListener('pointerdown', this._onPointerDown);
		}

		_onPointerDown(event) {
			event.preventDefault();
			this.handle.classList.add('draggable');
			this.handle.setPointerCapture(event.pointerId);

			this.posX = parseInt(this.handle.style.left, 10);
			this.posY = parseInt(this.handle.style.top, 10);
			this.startX = event.pageX;
			this.startY = event.pageY;

			this.handle.addEventListener('pointermove', this._onPointerMove);
			this.handle.addEventListener('pointerup', this._onPointerUp);
			this.handle.addEventListener('pointercancel', this._onPointerUp);
		}

		_onPointerMove(event) {
			let left = this.posX + (event.pageX - this.startX);
			left = Math.min(Math.max(left, this.minLeft), this.maxLeft);

			let top = this.posY + (event.pageY - this.startY);
			top = Math.min(Math.max(top, this.minTop), this.maxTop);

			this.handle.style.left = `${left}px`;
			this.handle.style.top = `${top}px`;

			this._changeSize(left, top);
		}

		_onPointerUp(event) {
			this.handle.classList.remove('draggable');
			this.handle.releasePointerCapture(event.pointerId);

			this.handle.removeEventListener('pointermove', this._onPointerMove);
			this.handle.removeEventListener('pointerup', this._onPointerUp);
			this.handle.removeEventListener('pointercancel', this._onPointerUp);
		}

		_changeSize(width, height) {
			if (this.settings.direction === 'horizontal') {
				this.changeable.style.width = `${width}px`;
			} else if (this.settings.direction === 'vertical') {
				this.changeable.style.height = `${height}px`;
			}
		}

		/** Remove listeners and inline styles added by this instance. */
		destroy() {
			this.handle.removeEventListener('pointerdown', this._onPointerDown);
			this.handle.removeEventListener('pointermove', this._onPointerMove);
			this.handle.removeEventListener('pointerup', this._onPointerUp);
			this.handle.removeEventListener('pointercancel', this._onPointerUp);
		}
	}

	return CoveringBad;
}));
