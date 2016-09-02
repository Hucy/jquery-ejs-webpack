import index from './index.ejs'
import './index.less'
var html=index({hello:"hello"})

$('#pagewrap').html(html)