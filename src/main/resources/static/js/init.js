/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


document.addEventListener('DOMContentLoaded', function () {
    var options = null;
    
    options = {throttle:100, scrollOffset:0, activeClass: "active"};
    
    var elems = document.querySelectorAll('.scrollspy');
    var instances = M.ScrollSpy.init(elems, options);
    
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, null);
    
});
