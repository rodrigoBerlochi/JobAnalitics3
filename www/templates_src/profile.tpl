<div>
    <div class="profile-view">
        
        <h2 class="heading heading2">Tu perfil laboral</h2>
        
        <div class="profile-brief">
            <h3 class="heading heading3">Parámetros ingresados</h3>
            <ul>
                <li>Categoría: <%=category%></li>
                <li>Subcategoría: <%=subcategory%></li>
                    <li>Palabras clave: <%=keyword%></li>
                        <li>Ciudad: <%=city%></li>
                            <li>País: <%=country%></li>
                                <li>Rango salarial: <%=salaryRange%></li>
                                    <li>Tipo de contrato: <%=contract%></li>
                                  
            </ul>
        </div>
        <!--swiper-->
        <div class="swiper-container">
            <div class="pagination"></div>    
              <div class="swiper-wrapper">
                  <!--First Slide-->
                  <div class="swiper-slide"> 
                    <!-- Any HTML content of the first slide goes here -->
                     <div class="ui  segment">
                         <div><a class="ui label teal pointing below">Categorías</a></div>
                         <select class="category">

                         </select>
                         
                        
                         <div class="subcategory-holder hide"><a class="ui label teal pointing below">Subcategorías</a>
                         <select class="subcategory">
             
                         </select></div>
                         
                      </div>
                      
                  </div>

                  <!--Second Slide-->
                  <div class="swiper-slide">
                    <!-- Any HTML content of the second slide goes here -->
                     <div class="ui  segment">
                      <div><a class="ui label teal pointing below">Palabras Claves</a></div>
                        
                         <input id="keyword" type="text" class="ctrl topcoat-text-input" placeholder="" value="">
                        
                      </div>
                  </div>

                  <!--Third Slide-->
                  <div class="swiper-slide"> 
                    <!-- Any HTML content of the third slide goes here -->
                      <div class="">
                     
                        <div><a class="ui label teal pointing below">País</a></div>
                        <select class="country">
                           
                        </select>
                        
                          
                        <div class="province-holder hide"><div><a class="ui label teal pointing below">Provincia</a></div>
                        <select class="province">
                           
                        </select></div>
                          
                        <div class="city-holder hide"><div><a class="ui label teal pointing below">Ciudad</a></div>
                        <select class="city">
                           
                        </select></div>
                      
                      </div>
                  </div>
                  
                   <!--Fourth Slide-->
                  <div class="swiper-slide"> 
                    <!-- Any HTML content of the third slide goes here -->
                      <div class="ui  segment">
                      <div><a class="ui label teal pointing below">Rango salarial</a></div>
                         
                         <select class="salaryRange">
                            
                         </select>
                        
                      </div>
                  </div>
                  
                   <!--Fifth Slide-->
                  <div class="swiper-slide"> 
                    <!-- Any HTML content of the third slide goes here -->
                      <div class="ui  segment">
                      <div><a class="ui label teal pointing below">Tipo de contrato</a></div>
                         
                         <select class="contractType">
                           
                         </select>
                         
                      </div>
                  </div>                  
                  
              </div>
        </div>
        
        <div class="topcoat-button-bar">
            <div class="topcoat-button-bar__item">
                <button class="topcoat-button--cta save" disabled>Grabar</button>
            </div>
            <div class="topcoat-button-bar__item">
                <button class="topcoat-button--cta edit">Editar</button>
            </div>
            &nbsp;
            <div class="topcoat-button-bar__item">
                <button class="topcoat-button--quiet cancel">Cancelar</button>
            </div>
        </div>
        
    </div>
</div>