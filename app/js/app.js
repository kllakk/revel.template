import "jquery";
import "tether";
import "bootstrap";
import "font-awesome/scss/font-awesome.scss";
import "bootstrap/dist/css/bootstrap.css";
import "./../css/site.scss";
import _ from 'lodash';

import main from './main';
main();

function component () {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = _.join(['Hello','webpack'], ' ');

    return element;
}

document.body.appendChild(component());


var $sidebar = 0;
$('#toggleSidebar').click(function() {
    if ($sidebar === 1) {
        $('#sidebar').hide();
        $('#toggleSidebar i').addClass('fa-chevron-left');
        $('#toggleSidebar i').removeClass('fa-chevron-right');
        $sidebar = 0;
    }
    else {
        $('#sidebar').show();
        $('#toggleSidebar i').addClass('fa-chevron-right');
        $('#toggleSidebar i').removeClass('fa-chevron-left');
        $sidebar = 1;
    }

    return false;
});
