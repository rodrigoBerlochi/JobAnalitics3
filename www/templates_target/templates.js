this["JST"] = this["JST"] || {};

this["JST"]["templates_src/landing.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\r\n    <div class="landing">\r\n        <header><p class="heading heading1">JobAnalitics</p></header>\r\n        \r\n       <section class="dark">\r\n           <div><button class="topcoat-button--large--cta results" >Results</button></div>\r\n        </section>\r\n        \r\n        <section class="dark">\r\n            <div><button class="topcoat-button--large--cta profile" >Profile</button></div>\r\n        </section>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["templates_src/profile.tpl"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\r\n    <div class="profile-view">\r\n        \r\n        <h2 class="heading heading2">Tu perfil laboral</h2>\r\n        \r\n        <div class="profile-brief">\r\n            <h3 class="heading heading3">Parámetros ingresados</h3>\r\n            <ul>\r\n                <li>Categoría: ' +
((__t = (category)) == null ? '' : __t) +
'</li>\r\n                <li>Subcategoría: ' +
((__t = (subcategory)) == null ? '' : __t) +
'</li>\r\n                    <li>Palabras clave: ' +
((__t = (keyword)) == null ? '' : __t) +
'</li>\r\n                        <li>Ciudad: ' +
((__t = (city)) == null ? '' : __t) +
'</li>\r\n                            <li>País: ' +
((__t = (country)) == null ? '' : __t) +
'</li>\r\n                                <li>Rango salarial: ' +
((__t = (earning)) == null ? '' : __t) +
'</li>\r\n                                    <li>Tipo de contrato: ' +
((__t = (contract)) == null ? '' : __t) +
'</li>\r\n                                  \r\n            </ul>\r\n        </div>\r\n        <!--swiper-->\r\n        <div class="swiper-container">\r\n            <div class="pagination"></div>    \r\n              <div class="swiper-wrapper">\r\n                  <!--First Slide-->\r\n                  <div class="swiper-slide"> \r\n                    <!-- Any HTML content of the first slide goes here -->\r\n                     <div class="ui  segment">\r\n                         <div><a class="ui label teal pointing below">Categorías</a></div>\r\n                         <select class="ctrl category">\r\n\r\n                         </select>\r\n                        \r\n                         <div class="subcategory-holder hide"><a class="ui label teal pointing below">Subcategorías</a></div>\r\n                         <select class="ctrl subcategory">\r\n             \r\n                         </select>\r\n                         \r\n                      </div>\r\n                      \r\n                  </div>\r\n\r\n                  <!--Second Slide-->\r\n                  <div class="swiper-slide">\r\n                    <!-- Any HTML content of the second slide goes here -->\r\n                     <div class="ui  segment">\r\n                      <div><a class="ui label teal pointing below">Palabras Claves</a></div>\r\n                        \r\n                         <input type="text" class="ctrl topcoat-text-input" placeholder="" value="">\r\n                        \r\n                      </div>\r\n                  </div>\r\n\r\n                  <!--Third Slide-->\r\n                  <div class="swiper-slide"> \r\n                    <!-- Any HTML content of the third slide goes here -->\r\n                      <div class="ui  segment">\r\n                     \r\n                        <div><a class="ui label teal pointing below">País</a></div>\r\n                        <select class="ctrl country">\r\n                           \r\n                        </select>\r\n                          \r\n                        <div class="province-holder hide"><div><a class="ui label teal pointing below">Provincia</a></div>\r\n                        <select class="ctrl province">\r\n                           \r\n                        </select></div>\r\n                          \r\n                        <div class="city-holder hide"><div><a class="ui label teal pointing below">Ciudad</a></div>\r\n                        <select class="ctrl city">\r\n                           \r\n                        </select></div>\r\n                      \r\n                      </div>\r\n                  </div>\r\n                  \r\n                   <!--Fourth Slide-->\r\n                  <div class="swiper-slide"> \r\n                    <!-- Any HTML content of the third slide goes here -->\r\n                      <div class="ui  segment">\r\n                      <div><a class="ui label teal pointing below">Rango salarial</a></div>\r\n                         \r\n                         <select class="ctrl salaryRange">\r\n                            \r\n                         </select>\r\n                        \r\n                      </div>\r\n                  </div>\r\n                  \r\n                   <!--Fifth Slide-->\r\n                  <div class="swiper-slide"> \r\n                    <!-- Any HTML content of the third slide goes here -->\r\n                      <div class="ui  segment">\r\n                      <div><a class="ui label teal pointing below">Tipo de contrato</a></div>\r\n                         \r\n                         <select class="ctrl contractType">\r\n                           \r\n                         </select>\r\n                        \r\n                      </div>\r\n                  </div>                  \r\n                  \r\n              </div>\r\n        </div>\r\n        \r\n        <div class="topcoat-button-bar">\r\n            <div class="topcoat-button-bar__item">\r\n                <button class="topcoat-button--cta save" disabled>Grabar</button>\r\n            </div>\r\n            <div class="topcoat-button-bar__item">\r\n                <button class="topcoat-button--cta edit">Editar</button>\r\n            </div>\r\n            &nbsp;\r\n            <div class="topcoat-button-bar__item">\r\n                <button class="topcoat-button--quiet cancel">Cancelar</button>\r\n            </div>\r\n        </div>\r\n        \r\n    </div>\r\n</div>';

}
return __p
};