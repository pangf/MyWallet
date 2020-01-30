// get current month
let month=new Date().getMonth();
const monthArr=['January','February','March','April','May','June','July','August','September','October','Novenber','December']
$(".budget__title--month").html(monthArr[month]);