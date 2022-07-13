/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/disclosure.js":
/*!**************************************!*\
  !*** ./src/components/disclosure.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Disclosure)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);





/**
 * External dependencies
 */


function Disclosure(_ref) {
  let {
    children,
    className = false,
    icon = false,
    iconTooltip = null,
    text = "Disclosure",
    openIcon = "plus",
    closeIcon = "minus",
    openLabel = "Open",
    closeLabel = "Close",
    initialOpen = false,
    ...extraProps
  } = _ref;
  const baseClass = "c-disclosure";
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.useInstanceId)(Disclosure, "symlink-disclosure");
  const [isExpanded, setIsExpanded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(initialOpen);
  let iconEl = icon ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
    className: `${baseClass}__icon`,
    icon: icon,
    "aria-label": iconTooltip
  }) : null;

  if (icon && iconTooltip) {
    iconEl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
      text: iconTooltip
    }, iconEl);
  }

  const triggerText = isExpanded ? closeLabel : openLabel;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()({
      [`${baseClass}`]: true,
      [`${className}`]: className
    })
  }, extraProps), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: `${baseClass}__header`
  }, iconEl, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: `${baseClass}__text`
  }, text), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
    text: triggerText
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    "aria-expanded": isExpanded,
    className: `${baseClass}__trigger`,
    onClick: () => setIsExpanded(!isExpanded),
    "aria-controls": `${instanceId}-panel`,
    "aria-label": triggerText
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
    icon: isExpanded ? closeIcon : openIcon
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: `${baseClass}__panel`,
    id: `${instanceId}-panel`,
    hidden: !isExpanded
  }, children));
}

/***/ }),

/***/ "./src/components/post-select-control.js":
/*!***********************************************!*\
  !*** ./src/components/post-select-control.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostSelectControl)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);





/**
 * External dependencies
 */


/**
 * custom hook to program posts
 *
 * @param {array} posts
 */

const usePosts = postType => {
  const {
    result = null
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => ({
    result: select("core").getEntityRecords("postType", postType, {
      per_page: -1,
      _fields: ["id", "title", "type"]
    })
  }));
  return result;
};

function PostSelectControl(_ref) {
  let {
    value = null,
    onChange = newItem => false,
    postTypeSelect = false,
    postType = null,
    label = "Selected Post",
    className = false,
    ...extraProps
  } = _ref;
  const baseClass = "c-post-select-control";
  const [currentPostType, setCurrentPostType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(postType !== null && postType !== void 0 ? postType : "post"); // Reset currentPostType if `postType` prop changes.
  // Needed since post objects that may be being used to set `postType`
  // must be fetched and may not be known on initial render.

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (postType && postType !== currentPostType) {
      setCurrentPostType(postType);
    }
  }, [postType]);
  const excludedPostTypes = wp.hooks.applyFilters("symlinks.postSelectControlExcludedPostTypes", ["attachment", "wp_block"]);
  const postTypes = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    const req = select("core").getPostTypes();
    return Array.isArray(req) ? req.filter(type => !excludedPostTypes.find(excluded => excluded === type.slug)).map(type => ({
      value: type.slug,
      label: type.name
    })) : req;
  });
  const options = usePosts(postTypeSelect ? currentPostType : postType !== null && postType !== void 0 ? postType : "post");
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()({
      [`${baseClass}`]: true,
      [`${className}`]: className
    })
  }, extraProps), postTypeSelect ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    value: currentPostType,
    label: "Post Type",
    options: postTypes ? postTypes : [{
      value: "",
      label: "-"
    }],
    disabled: !postTypes,
    onChange: newPostType => {
      setCurrentPostType(newPostType);
      onChange(false);
    }
  }) : null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ComboboxControl, {
    options: Array.isArray(options) ? options.map(post => ({
      value: post.id,
      label: post.title.rendered
    })) : [{
      value: "",
      label: "-"
    }],
    value: value,
    label: label,
    onChange: onChange,
    disabled: !options
  }));
}

/***/ }),

/***/ "./src/components/symlink-editor.js":
/*!******************************************!*\
  !*** ./src/components/symlink-editor.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SymlinkEditor)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _disclosure__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./disclosure */ "./src/components/disclosure.js");
/* harmony import */ var _post_select_control__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./post-select-control */ "./src/components/post-select-control.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);



/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



/**
 * External dependencies
 */


/**
 * custom hook to get parent post
 *
 * @param {number} id
 */

const usePost = id => {
  const {
    result = null
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => ({
    result: select("get-record-by").id(id && Number.isInteger(id) ? id : false)
  }));
  return result;
};

function getWarnings(symlink) {
  const warnings = []; // bail early if we need parent but none is selected

  if (["parent", "parent-slug"].includes(symlink === null || symlink === void 0 ? void 0 : symlink.type) && !(symlink !== null && symlink !== void 0 && symlink.parent)) {
    warnings.push("No Parent Selected");
  } // bail early if we need slug but none is entered


  if (["slug", "parent-slug"].includes(symlink === null || symlink === void 0 ? void 0 : symlink.type) && !(symlink !== null && symlink !== void 0 && symlink.slug)) {
    warnings.push("No Slug Entered");
  }

  return warnings;
}

function buildPreviewUrl(symlink, post) {
  let parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let warnings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  // bail early and instead show loader if
  // we are waiting on parent data to load
  if (["parent", "parent-slug"].includes(symlink === null || symlink === void 0 ? void 0 : symlink.type) && null === parent) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null);
  } // bail early if there are warnings, which mean we
  // are missing critical info to build the url


  if (warnings.length > 0) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "c-warning-label"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
      className: "c-symlink-editor__warning-icon",
      icon: "warning"
    }), " ", warnings.length, " Warning", warnings.length > 1 ? "s" : "");
  } // data setup


  const parentUrl = parent && parent !== null && parent !== void 0 && parent.link ? new URL(parent.link).pathname : "{...}";
  const postSlug = post === null || post === void 0 ? void 0 : post.slug;
  const includeTrailingSlash = post && post !== null && post !== void 0 && post.link ? post.link.endsWith("/") : true; // build the url

  let url = "";

  switch (symlink === null || symlink === void 0 ? void 0 : symlink.type) {
    case "slug":
      url += `/${symlink === null || symlink === void 0 ? void 0 : symlink.slug}`;
      break;

    case "parent":
      url += `${parentUrl}/${postSlug}`;
      break;

    case "parent-slug":
      url += `${parentUrl}/${symlink.slug}`;
      break;

    default:
      break;
  }

  url += includeTrailingSlash ? "/" : "";
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("a", {
    href: url,
    target: "_blank"
  }, url);
}

function SymlinkEditor(_ref) {
  let {
    symlink,
    onChange = newItem => false,
    className = false,
    ...extraProps
  } = _ref;
  const warnings = getWarnings(symlink);
  const baseClass = "c-symlink-editor";
  const parent = usePost(symlink === null || symlink === void 0 ? void 0 : symlink.parent);
  const currentPost = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select("core/editor").getCurrentPost());

  const symlinkUpdate = (key, val) => {
    onChange === null || onChange === void 0 ? void 0 : onChange({ ...symlink,
      [`${key}`]: val
    });
  };

  const symlinkDelete = () => {
    onChange === null || onChange === void 0 ? void 0 : onChange(false);
  };

  const helpTexts = {
    slugPlain: 'Full custom slug appended to the root site URL. Can include "/" to act as a child page',
    slugParent: 'Appended to main parent URL. Can include "/" to act as a nested child page',
    parent: "Provides base URL"
  };
  const typeTooltips = {
    slug: "Custom Slug",
    parent: "Parent Post",
    ["parent-slug"]: "Parent Post + Custom Slug"
  }; // TODO add spinner and dynamic link preview to disclosure text. MAY have to rework how that component functions

  const text = buildPreviewUrl(symlink, currentPost, parent, warnings);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_disclosure__WEBPACK_IMPORTED_MODULE_4__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_6___default()({
      [`${baseClass}`]: true,
      [`${className}`]: className
    }),
    closeIcon: "no",
    openIcon: "edit",
    openLabel: "Edit",
    icon: symlink.type.includes("parent") ? "rest-api" : "admin-links",
    iconTooltip: typeTooltips[symlink.type],
    text: text // text={symlink?.slug ? symlink.slug : "?"}

  }, extraProps), warnings.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("ul", {
    className: "c-symlink-editor__warnings"
  }, warnings.map((text, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("li", {
    key: i
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dashicon, {
    className: "c-symlink-editor__warning-icon",
    icon: "warning"
  }), " ", text))) : null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    className: `${baseClass}__type`,
    label: "Type",
    labelPosition: "side",
    value: symlink.type,
    onChange: val => {
      symlinkUpdate("type", val);
    },
    options: [{
      value: "slug",
      label: "Slug"
    }, {
      value: "parent",
      label: "Parent"
    }, {
      value: "parent-slug",
      label: "Parent + Slug"
    }]
  }), ["parent", "parent-slug"].includes(symlink.type) ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_post_select_control__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: "Parent Post",
    value: symlink === null || symlink === void 0 ? void 0 : symlink.parent,
    postTypeSelect: true,
    postType: parent === null || parent === void 0 ? void 0 : parent.type,
    onChange: val => {
      // console.log(val);
      symlinkUpdate("parent", val);
    },
    help: helpTexts.parent
  }) : null, ["slug", "parent-slug"].includes(symlink.type) ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: "Slug",
    value: symlink === null || symlink === void 0 ? void 0 : symlink.slug,
    onChange: val => {
      symlinkUpdate("slug", val);
    },
    help: "parent-slug" === symlink.type ? helpTexts.slugParent : helpTexts.slugPlain
  }) : null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isDestructive: true,
    isSmall: true,
    className: `${baseClass}__delete`,
    onClick: symlinkDelete
  }, "Delete"));
}

/***/ }),

/***/ "./src/store-find-post-by.js":
/*!***********************************!*\
  !*** ./src/store-find-post-by.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);

 // actions

const actions = {
  receiveRecord(record) {
    return {
      type: "RECEIVE_RECORD",
      record
    };
  }

}; // set initial state

const DEFAULT_STATE = {
  records: []
};
const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.createReduxStore)("get-record-by", {
  reducer() {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
    let action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case "RECEIVE_RECORD":
        if (-1 === state.records.findIndex(item => item.id === action.record.id)) {
          return { ...state,
            records: [...state.records, action.record]
          };
        } else {
          return state;
        }

    }

    return state;
  },

  actions,
  selectors: {
    id(state, id) {
      const {
        records
      } = state;
      return id ? state.records.find(record => record.id === id) : false;
    }

  },
  resolvers: {
    id: id => async _ref => {
      let {
        dispatch
      } = _ref;

      if (!id) {
        return false;
      }

      const record = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: `/wiley/v1/find-post-by/id/${id}/`
      });

      if (record !== null && record !== void 0 && record.id) {
        dispatch.receiveRecord(record);
      }
    }
  }
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.register)(store);

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_symlink_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/symlink-editor */ "./src/components/symlink-editor.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _store_find_post_by__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./store-find-post-by */ "./src/store-find-post-by.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");


/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */




const PluginDocumentSettingPanelSymlinks = () => {
  const baseClass = "c-symlinks-sidebar";
  const currentPost = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => select("core/editor").getCurrentPost()); // load from post meta, external table, something

  const [symlinks, setSymlinks] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([{
    // first symlink is a simple alternate URL at the same place
    type: "slug",
    slug: "courses/mgmt-301-af"
  }, {
    // second symlink is set to "parent", adding a prefix of the slug of post id of 412 to the real slug
    type: "parent",
    parent: 2
  }, {
    // third symlink is set to "parent-slug" using a custom slug AND adding a parent prefix
    type: "parent-slug",
    slug: "mgmt-301-yo",
    parent: 1286
  }, {
    type: "parent-slug"
  }]);
  const panelTitle = `Symlinks${symlinks.length > 0 ? ` (${symlinks.length})` : ""}`;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__.PluginDocumentSettingPanel, {
    name: "symlinks",
    title: panelTitle,
    className: baseClass
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${baseClass}__list`
  }, symlinks.map((item, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_symlink_editor__WEBPACK_IMPORTED_MODULE_4__["default"], {
    symlink: item,
    onChange: newItem => {
      const newSymlinks = [...symlinks]; // new/updated items will be an object of symlink data
      // deleted items will be `false`

      if (typeof newItem === "object") {
        newSymlinks[i] = newItem;
      } else {
        newSymlinks.splice(i, 1);
      }

      setSymlinks(newSymlinks);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    icon: "plus",
    className: `${baseClass}__add`,
    onClick: () => {
      setSymlinks([...symlinks, {
        type: "slug",
        slug: currentPost !== null && currentPost !== void 0 && currentPost.slug ? `${currentPost.slug}-alt` : ""
      }]);
    }
  }, "Add Symlink")));
};

(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_3__.registerPlugin)("plugin-document-setting-panel-demo", {
  render: PluginDocumentSettingPanelSymlinks
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map