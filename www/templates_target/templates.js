this["JST"] = this["JST"] || {};

this["JST"]["templates_src/landing.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\r\n    <div class="landing">\r\n        <header><p class="heading heading1">JobAnalitics</p></header>\r\n        \r\n       <section class="dark">\r\n           <div><button class="topcoat-button--large--cta results">Resultados</button></div>\r\n        </section>\r\n        \r\n        <section class="dark">\r\n            <div><button class="topcoat-button--large--cta profile" disabled>\r\n                Perfil laboral\r\n                  <div class="ui active dimmer lnd">\r\n                    <div class="ui loader"></div>\r\n                  </div>\r\n                </button>\r\n            </div>\r\n        </section>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["templates_src/profile.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\r\n    <div class="profile-view">\r\n        \r\n        <div class="topcoat-button-bar">\r\n            <div class="topcoat-button-bar__item">\r\n                <button class="topcoat-button--cta save" disabled>Guardar</button>\r\n            </div>\r\n            <div class="topcoat-button-bar__item">\r\n                <button class="topcoat-button--cta edit">Editar</button>\r\n            </div>\r\n            <div class="topcoat-button-bar__item">\r\n                <button class="topcoat-button--cta search">Buscar</button>\r\n            </div>\r\n            &nbsp;\r\n            <div class="topcoat-button-bar__item">\r\n                <button class="topcoat-button--quiet cancel">Cancelar</button>\r\n            </div>\r\n        </div>\r\n        \r\n        <h2 class="heading heading2">Tu perfil laboral</h2>\r\n        \r\n        <div class="profile-brief">\r\n            <h3 class="heading heading3">Parámetros ingresados <span class="clear">¿Borrar?</span></h3>\r\n            <ul>\r\n            \r\n                    <li>Categoría: <b>' +
((__t = (category)) == null ? '' : __t) +
'</b></li>\r\n                    \r\n                    <li>Subcategoría: <b>' +
((__t = (subcategory)) == null ? '' : __t) +
'</b></li>\r\n               \r\n                    <li>Palabras clave: <b>' +
((__t = (keyword)) == null ? '' : __t) +
'</b></li>\r\n              \r\n                    <li>Ciudad: <b>' +
((__t = (city)) == null ? '' : __t) +
'</b></li>\r\n               \r\n                    <li>Provincia: <b>' +
((__t = (province)) == null ? '' : __t) +
'</b></li>\r\n               \r\n                    <li>País: <b>' +
((__t = (country)) == null ? '' : __t) +
'</b></li>\r\n\r\n                \r\n                                  \r\n            </ul>\r\n        </div>\r\n        <!--swiper-->\r\n        <div class="swiper-container">\r\n            <div class="pagination"></div>    \r\n              <div class="swiper-wrapper">\r\n                  <!--First Slide-->\r\n                  <div class="swiper-slide"> \r\n                    <!-- Any HTML content of the first slide goes here -->\r\n                     <div class="ui  segment">\r\n                         <div><a class="ui label teal pointing below">Categorías</a></div>\r\n                         <select class="category">\r\n\r\n                         </select>\r\n                         \r\n                        \r\n                         <div class="subcategory-holder hide"><a class="ui label teal pointing below">Subcategorías</a>\r\n                         <select class="subcategory">\r\n             \r\n                         </select></div>\r\n                         \r\n                      </div>\r\n                      \r\n                  </div>\r\n\r\n                  <!--Second Slide-->\r\n                  <div class="swiper-slide">\r\n                    <!-- Any HTML content of the second slide goes here -->\r\n                     <div class="ui  segment">\r\n                      <div><a class="ui label teal pointing below">Palabras Claves</a></div>\r\n                        \r\n                         <input id="keyword" type="text" class="ctrl topcoat-text-input" placeholder="" value="">\r\n                        \r\n                      </div>\r\n                  </div>\r\n\r\n                  <!--Third Slide-->\r\n                  <div class="swiper-slide"> \r\n                    <!-- Any HTML content of the third slide goes here -->\r\n                      <div class="">\r\n                     \r\n                        <div><a class="ui label teal pointing below">País</a></div>\r\n                        <select class="country">\r\n                           \r\n                        </select>\r\n                        \r\n                          \r\n                        <div class="province-holder hide"><div><a class="ui label teal pointing below">Provincia</a></div>\r\n                        <select class="province">\r\n                           \r\n                        </select></div>\r\n                          \r\n                        <div class="city-holder hide"><div><a class="ui label teal pointing below">Ciudad</a></div>\r\n                        <select class="city">\r\n                           \r\n                        </select></div>\r\n                      \r\n                      </div>\r\n                  </div>\r\n                  \r\n                          \r\n                  \r\n              </div>\r\n        </div>\r\n        \r\n\r\n        \r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["templates_src/results.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\r\n    <div class="results-view">\r\n        <header><p><b>Hemos encontrado ' +
((__t = ( totalResults )) == null ? '' : __t) +
' empleos</b><br> con los criterios indicados en tu Perfil.</p></header>\r\n\r\n        <div id="graphics">\r\n            <span class="msg"></span>\r\n        </div>    \r\n    </div>\r\n</div>';

}
return __p
};